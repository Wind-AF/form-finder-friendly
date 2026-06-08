import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Share2,
  ShoppingCart,
  MoreHorizontal,
  Star,
  Zap,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Lock,
  ChevronRight,
  X,
} from "lucide-react";
import af30i from "@/assets/products/product-airfryer-af30i-CwILFnZb.webp";
import afon12 from "@/assets/products/product-airfryer-afon12bi-Dei_i9sw.webp";
import pProcessador from "@/assets/products/product-processador-mp05b-DS1d6P16.webp";
import pCesto from "@/assets/products/product-cesto-af30-lNdO3heb.webp";
import pChaleira from "@/assets/products/product-chaleira-ce06-CCyzvTeO.webp";
import pCopo from "@/assets/products/product-copo-l1000r-s8g-1duF.webp";
import pPipoqueira from "@/assets/products/product-pipoqueira-pp04-k9WSQXaw.webp";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Ponto Quente" },
      { name: "description", content: "Finalize seu pedido com segurança na Ponto Quente." },
    ],
  }),
});

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  qty: number;
};

type Related = {
  id: string;
  name: string;
  image: string;
  oldPrice: number;
  price: number;
  discount: number;
};

const initialCart: CartItem[] = [
  {
    id: "af30i",
    name: "Fritadeira Sem Óleo Air Fryer 3,5L Mondial AF-30-I",
    image: af30i,
    price: 56.0,
    oldPrice: 372.96,
    discount: 85,
    qty: 1,
  },
  {
    id: "afon12bi",
    name: "Fritadeira Air Fryer Forno Oven 12L Mondial AFON-12L-BI Preto/Inox 2000W",
    image: afon12,
    price: 120.12,
    oldPrice: 740.12,
    discount: 84,
    qty: 1,
  },
];

const related: Related[] = [
  {
    id: "mp05b",
    name: "Mini Processador Mondial Preto 150W - MP-05-B",
    image: pProcessador,
    oldPrice: 141.52,
    price: 32.52,
    discount: 77,
  },
  {
    id: "cesto",
    name: "Cesto Redondo Antiaderente Air Fryer Mondial AF-30 e AF-30i",
    image: pCesto,
    oldPrice: 69.68,
    price: 24.68,
    discount: 65,
  },
  {
    id: "ce06",
    name: "Chaleira Elétrica Pratic Mondial Preto/Inox 1200W - CE-06",
    image: pChaleira,
    oldPrice: 169.52,
    price: 30.52,
    discount: 82,
  },
  {
    id: "l1000r",
    name: "Copo Cristal Vermelho do Liquidificador Mondial (sem tampa) L-1000-R",
    image: pCopo,
    oldPrice: 49.04,
    price: 20.04,
    discount: 59,
  },
  {
    id: "pp04",
    name: "Pipoqueira Elétrica Popflix Mondial Branco 1200W - PP-04",
    image: pPipoqueira,
    oldPrice: 239.64,
    price: 38.64,
    discount: 84,
  },
];

function fmt(v: number) {
  return v.toFixed(2).replace(".", ",");
}

function Checkout() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [shipping, setShipping] = useState<"free" | "sedex">("free");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Masks
  const maskCPF = (v: string) =>
    v.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  const maskCEP = (v: string) =>
    v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

  // CPF algorithm
  const isValidCPF = (raw: string) => {
    const cpf = raw.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let d1 = (sum * 10) % 11;
    if (d1 === 10) d1 = 0;
    if (d1 !== parseInt(cpf[9])) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    let d2 = (sum * 10) % 11;
    if (d2 === 10) d2 = 0;
    return d2 === parseInt(cpf[10]);
  };

  // ViaCEP lookup
  const lookupCep = async (cepValue: string) => {
    const digits = cepValue.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    setErrors((e) => ({ ...e, cep: "" }));
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErrors((e) => ({ ...e, cep: "CEP não encontrado" }));
      } else {
        setForm((f) => ({
          ...f,
          rua: data.logradouro || f.rua,
          bairro: data.bairro || f.bairro,
          cidade: data.localidade || f.cidade,
          estado: data.uf || f.estado,
          complemento: f.complemento || data.complemento || "",
        }));
      }
    } catch {
      setErrors((e) => ({ ...e, cep: "Erro ao buscar CEP" }));
    } finally {
      setCepLoading(false);
    }
  };

  const validateAll = () => {
    const errs: Record<string, string> = {};
    const nameParts = form.name.trim().split(/\s+/).filter((p) => p.length >= 2);
    if (nameParts.length < 2) errs.name = "Informe nome e sobrenome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (!isValidCPF(form.cpf)) errs.cpf = "CPF inválido (11 dígitos)";
    if (form.cep.replace(/\D/g, "").length !== 8) errs.cep = "CEP deve ter 8 dígitos";
    if (!form.rua.trim()) errs.rua = "Obrigatório";
    if (!form.numero.trim()) errs.numero = "Obrigatório";
    if (!form.bairro.trim()) errs.bairro = "Obrigatório";
    if (!form.cidade.trim()) errs.cidade = "Obrigatório";
    if (!form.estado) errs.estado = "Obrigatório";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validateAll()) {
      alert("Pedido validado! (próximo passo: pagamento Pix)");
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart((c) =>
      c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    );
  };
  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const addRelated = (r: Related) => {
    setAdded((a) => ({ ...a, [r.id]: true }));
    setCart((c) =>
      c.some((i) => i.id === r.id)
        ? c
        : [
            ...c,
            {
              id: r.id,
              name: r.name,
              image: r.image,
              price: r.price,
              oldPrice: r.oldPrice,
              discount: r.discount,
              qty: 1,
            },
          ],
    );
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const original = cart.reduce((s, i) => s + i.oldPrice * i.qty, 0);
  const discount = original - subtotal;
  const shippingCost = shipping === "free" ? 0 : 9.8;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-muted/30 max-w-lg mx-auto pb-32">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background flex items-center justify-between px-3 py-2.5 border-b border-border">
        <Link to="/" className="p-1" aria-label="Voltar">
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </Link>
        <h1 className="text-base font-bold text-foreground">Resumo do pedido</h1>
        <div className="flex items-center gap-2">
          <button className="p-1" aria-label="Compartilhar">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-1" aria-label="Carrinho">
            <ShoppingCart className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-1" aria-label="Mais">
            <MoreHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* Store + guarantee */}
        <div className="bg-background rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
              PQ
            </div>
            <span className="text-sm font-bold">PONTO QUENTE</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" />
            Cancelamento fácil
          </div>
        </div>

        {/* Best choice badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-xs font-semibold text-amber-900">
            Melhor escolha! 12.8K vendido(s) e com nota 4.8/5,0
          </span>
        </div>

        {/* Cart items */}
        <div className="bg-background rounded-xl divide-y divide-border">
          {cart.map((item) => (
            <div key={item.id} className="p-3 flex gap-3">
              <div className="w-20 h-20 shrink-0 rounded-lg bg-muted/50 overflow-hidden flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground line-clamp-2">{item.name}</p>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    <Zap className="w-2.5 h-2.5" /> Oferta Relâmpago
                  </span>
                  <span className="inline-flex items-center text-[10px] font-medium text-emerald-700">
                    🟢 Devolução gratuita
                  </span>
                </div>
                <div className="flex items-end justify-between mt-1.5">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-primary">R$ {fmt(item.price)}</span>
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded">
                        -{item.discount}%
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground line-through">
                      R$ {fmt(item.oldPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center"
                      aria-label="Diminuir"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center"
                      aria-label="Aumentar"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-1 w-7 h-7 rounded-full text-muted-foreground hover:text-destructive flex items-center justify-center"
                      aria-label="Remover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full text-left px-3 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
            Adicionar nota
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Order summary inline */}
        <div className="bg-background rounded-xl p-3 space-y-1.5">
          <h2 className="text-sm font-bold mb-1">Resumo do pedido</h2>
          <Row label="Subtotal do produto" value={`R$ ${fmt(subtotal)}`} />
          <Row label="Preço original" value={`R$ ${fmt(original)}`} muted />
          <Row label="Desconto" value={`- R$ ${fmt(discount)}`} accent />
          <div className="border-t border-border pt-1.5 mt-1.5">
            <Row label="Total" value={`R$ ${fmt(total)}`} bold />
          </div>
        </div>

        {/* Related products */}
        <div className="bg-background rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold">Produtos relacionados</h2>
            <span className="text-[11px] text-muted-foreground">Deslize ›</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto -mx-3 px-3 pb-1 snap-x snap-mandatory">
            {related.map((r) => {
              const isAdded = added[r.id];
              return (
                <div
                  key={r.id}
                  className="shrink-0 w-36 snap-start border border-border rounded-lg p-2 flex flex-col"
                >
                  <div className="relative">
                    <span className="absolute top-1 left-1 text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded">
                      -{r.discount}%
                    </span>
                    <div className="w-full h-24 flex items-center justify-center bg-muted/30 rounded">
                      <img src={r.image} alt={r.name} className="max-h-24 object-contain" />
                    </div>
                  </div>
                  <p className="text-[11px] font-medium mt-1.5 line-clamp-2 min-h-[28px]">{r.name}</p>
                  <div className="mt-1">
                    <div className="text-[10px] text-muted-foreground line-through">R$ {fmt(r.oldPrice)}</div>
                    <div className="text-sm font-extrabold text-primary">R$ {fmt(r.price)}</div>
                    <div className="text-[10px] text-emerald-600 font-medium">Frete grátis</div>
                  </div>
                  <button
                    onClick={() => addRelated(r)}
                    disabled={isAdded}
                    className={`mt-1.5 w-full text-[11px] font-bold py-1.5 rounded-full border ${isAdded ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-primary text-primary"}`}
                  >
                    {isAdded ? "✓ Adicionado" : "+ Adicionar"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1 — Seus dados */}
        <section className="bg-background rounded-xl p-3 space-y-2.5">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Badge>1</Badge> Seus Dados
          </h2>
          <Field label="Nome completo *">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Como aparece no seu documento"
            />
            {errors.name && <p className="text-[11px] text-destructive mt-1">{errors.name}</p>}
          </Field>
          <Field label="E-mail *">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="voce@email.com"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Enviaremos comprovante e código de rastreio por e-mail.
            </p>
            {errors.email && <p className="text-[11px] text-destructive mt-1">{errors.email}</p>}
          </Field>
          <Field label="CPF *">
            <input
              inputMode="numeric"
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: maskCPF(e.target.value) })}
              className="input"
              placeholder="000.000.000-00"
              maxLength={14}
            />
            {errors.cpf && <p className="text-[11px] text-destructive mt-1">{errors.cpf}</p>}
          </Field>
        </section>

        {/* Step 2 — Endereço */}
        <section className="bg-background rounded-xl p-3 space-y-2.5">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Badge>2</Badge> Onde entregar?
          </h2>
          <Field label="CEP *">
            <input
              inputMode="numeric"
              value={form.cep}
              onChange={(e) => {
                const v = maskCEP(e.target.value);
                setForm({ ...form, cep: v });
                if (v.replace(/\D/g, "").length === 8) lookupCep(v);
              }}
              onBlur={(e) => lookupCep(e.target.value)}
              className="input"
              placeholder="00000-000"
              maxLength={9}
            />
            <div className="flex items-center gap-2 mt-1">
              {cepLoading && <span className="text-[11px] text-muted-foreground">Buscando...</span>}
              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-primary font-semibold"
              >
                Não sei meu CEP
              </a>
            </div>
            {errors.cep && <p className="text-[11px] text-destructive mt-1">{errors.cep}</p>}
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Field label="Rua *">
                <input
                  value={form.rua}
                  onChange={(e) => setForm({ ...form, rua: e.target.value })}
                  className="input"
                />
              </Field>
            </div>
            <Field label="Número *">
              <input
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
                className="input"
              />
            </Field>
          </div>
          <Field label="Complemento (opcional)">
            <input
              value={form.complemento}
              onChange={(e) => setForm({ ...form, complemento: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Bairro *">
            <input
              value={form.bairro}
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              className="input"
            />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Cidade *">
              <input
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Estado *">
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
                className="input"
              >
                <option value="">Selecione</option>
                {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf)=>(
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* Step 3 — Frete */}
        <section className="bg-background rounded-xl p-3 space-y-2">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Badge>3</Badge> Frete
          </h2>
          <ShippingOption
            selected={shipping === "free"}
            onSelect={() => setShipping("free")}
            title="Frete Grátis"
            sub="7-10 dias úteis"
            price="R$ 0,00"
          />
          <ShippingOption
            selected={shipping === "sedex"}
            onSelect={() => setShipping("sedex")}
            title="SEDEX"
            sub="2 dias úteis"
            price="R$ 9,80"
          />
        </section>

        {/* Totals */}
        <div className="bg-background rounded-xl p-3 space-y-1.5">
          <Row label="Produtos" value={`R$ ${fmt(subtotal)}`} />
          <Row label="Desconto" value={`- R$ ${fmt(discount)}`} accent />
          <Row label="Frete" value={shipping === "free" ? "Grátis" : `R$ ${fmt(shippingCost)}`} />
          <div className="border-t border-border pt-1.5 mt-1.5">
            <Row label="Total" value={`R$ ${fmt(total)}`} bold />
          </div>
          <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-[11px] text-emerald-800">
            😊 Você está economizando <strong>R$ {fmt(discount)}</strong> com impostos.
          </div>
        </div>

        {/* Trust */}
        <div className="bg-background rounded-xl p-3 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong className="text-foreground">Garantia total de 7 dias.</strong> Não gostou? Devolvemos 100% do seu dinheiro.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span><strong className="text-foreground">Pagamento 100% seguro</strong> · Dados criptografados</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Envio rastreado por e-mail</span>
          </div>
          <p className="text-[10px] leading-relaxed pt-1 border-t border-border">
            Ao fazer um pedido, você concorda com os <a className="text-primary underline">Termos de uso e venda da Ponto Quente</a> e reconhece que leu e concordou com a <a className="text-primary underline">Política de privacidade</a>.
          </p>
        </div>
      </div>

      {/* Sticky checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto bg-background border-t border-border px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[11px] text-muted-foreground">Total ({cart.reduce((s,i)=>s+i.qty,0)} {cart.reduce((s,i)=>s+i.qty,0)===1?"item":"itens"})</div>
              <div className="text-lg font-extrabold text-foreground leading-none">R$ {fmt(total)}</div>
              <div className="text-[10px] text-emerald-600 font-medium">Economizando R$ {fmt(discount)}</div>
            </div>
            <Countdown />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-full text-base"
          >
            Fazer pedido
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className={muted ? "text-muted-foreground" : "text-foreground"}>{label}</span>
      <span
        className={`${bold ? "font-extrabold text-base" : "font-semibold"} ${accent ? "text-emerald-600" : muted ? "text-muted-foreground line-through" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
      {children}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ShippingOption({
  selected,
  onSelect,
  title,
  sub,
  price,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  sub: string;
  price: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-2.5 rounded-lg border-2 ${selected ? "border-primary bg-primary/5" : "border-border"}`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`w-4 h-4 rounded-full border-2 ${selected ? "border-primary" : "border-muted-foreground"} flex items-center justify-center`}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-primary" />}
        </span>
        <div className="text-left">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-[11px] text-muted-foreground">{sub}</div>
        </div>
      </div>
      <div className="text-sm font-bold text-foreground">{price}</div>
    </button>
  );
}

function Countdown() {
  const [secs, setSecs] = useState(3 * 3600 + 58 * 60 + 54);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div className="text-right">
      <div className="text-[10px] text-muted-foreground">O cupom expira em</div>
      <div className="text-sm font-extrabold text-primary tabular-nums">{h}:{m}:{s}</div>
    </div>
  );
}