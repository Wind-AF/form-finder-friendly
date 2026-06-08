import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Share2,
  ShoppingCart,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Heart,
  Truck,
  RotateCcw,
  Zap,
  Store,
  MessageCircle,
  MapPin,
  CheckCircle2,
  X,
} from "lucide-react";
import mainImg from "@/assets/products/product-airfryer-afon12-Dq7tqLjo.webp";
import altImg from "@/assets/products/product-airfryer-CGbRoz4x.webp";
import vAfon12 from "@/assets/products/product-airfryer-afon12bi-Dei_i9sw.webp";
import vCGbRoz4x from "@/assets/products/product-airfryer-CGbRoz4x.webp";
import vAfd01 from "@/assets/products/product-airfryer-afd01-CT5TgmNc.webp";
import vAf30i from "@/assets/products/product-airfryer-af30i-CwILFnZb.webp";
import vAfn40 from "@/assets/products/product-airfryer-afn40-DUbyBXj0.webp";
import vAfn50 from "@/assets/products/product-airfryer-afn50-CZaNQrt7.webp";
import vAfn80 from "@/assets/products/product-airfryer-afn80-PWSMgTtG.webp";
import r1 from "@/assets/products/r1.webp";
import r2 from "@/assets/products/r2.webp";
import r3 from "@/assets/products/r3.webp";
import r4 from "@/assets/products/r4.webp";
import r5 from "@/assets/products/r5.webp";
import r6 from "@/assets/products/r6.webp";
import r7 from "@/assets/products/r7.webp";
import r8 from "@/assets/products/r8.webp";
import r9 from "@/assets/products/r9.webp";
import r10 from "@/assets/products/r10.webp";
import r11 from "@/assets/products/r11.webp";
import r12 from "@/assets/products/r12.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Air Fryer Mondial AF-30-DI 3,5L Digital Touch — Ponto Quente" },
      { name: "description", content: "Fritadeira Elétrica Forno Oven Air Fryer 12L Mondial AFON-12L-BI-BC com 87% de desconto. Frete grátis e envio nacional." },
      { property: "og:title", content: "Air Fryer Mondial AF-30-DI 3,5L Digital Touch — Ponto Quente" },
      { property: "og:description", content: "Fritadeira Elétrica Forno Oven Air Fryer 12L Mondial com 87% off. Frete grátis." },
    ],
  }),
  component: Index,
});

const productImages = [mainImg, altImg, r8, r9, r10, r11, r12, altImg];

const specs: Array<[string, string]> = [
  ["Modelo", "AFON-12L-BI-BC"],
  ["Tipo", "Air Fryer Forno 2 em 1"],
  ["Capacidade", "12 litros"],
  ["Acessórios", "3 assadeiras"],
  ["Painel", "Digital Touch"],
  ["Temperatura", "Até 200°C"],
  ["Cor", "Preto/Inox"],
  ["Voltagem", "127V ou 220V"],
  ["Garantia", "12 meses"],
];

type Review = {
  initials: string;
  name: string;
  date: string;
  variant: string;
  fields?: Array<[string, string]>;
  text?: string;
  images?: string[];
  likes: number;
};

const reviews: Review[] = [
  {
    initials: "L3",
    name: "l30zkxky1u",
    date: "2026-04-21 08:51",
    variant: "Preto com Inox, 220V",
    fields: [
      ["Potência", "1500W"],
      ["Controle de temperatura", "Até 200°"],
    ],
    text: "Muito boa, a potência é forte, uma das melhores aquisições. Entrega rápida",
    images: [r1, r2],
    likes: 29,
  },
  {
    initials: "BY",
    name: "by0g5s4f5v",
    date: "2026-04-25 19:33",
    variant: "Preto com Inox, 110V",
    fields: [
      ["Potência", "Top"],
      ["Controle de Temperatura", "top"],
    ],
    text: "Linda, grande, boa, ligou certinho, só não testamos ainda, mas pesquisei muito antes de comprar e dizem ser ótima, amamos a compra...",
    images: [r3, r4],
    likes: 22,
  },
  {
    initials: "LA",
    name: "larissa123silva",
    date: "2026-05-08 13:56",
    variant: "Preto com Inox, 220V",
    text: "Produto muito bom. Entrega super rápido. 👏👏 Satisfeita com o tamanho.",
    likes: 4,
  },
  {
    initials: "DB",
    name: "dboraoliveira608",
    date: "2026-04-11 13:47",
    variant: "Preto com Inox, 110V",
    text: "Chegou antes da data prevista. Está tudo ok. Estou usando hoje para testar. Acredito que o produto é bom e de qualidade. A loja eu já conhecia.",
    images: [r5, r6],
    likes: 31,
  },
  {
    initials: "VH",
    name: "vhjx3lf0aa",
    date: "2026-05-08 16:20",
    variant: "Preto com Inox, 220V",
    text: "Produtos de qualidade chego 10 dias antes tá data da entrega muito boa já testei ela assa muito bem",
    likes: 1,
  },
  {
    initials: "JO",
    name: "jonesdossantosalvesjones",
    date: "2026-04-28 09:42",
    variant: "Preto com Inox, 220V",
    fields: [
      ["Potência", "potência excelente gostei demais"],
      ["Controle de temperatura", "com a temperatura prepara os alimentos rapidez"],
      ["Facilidade de limpeza", "fácil de limpar sem reclamação gostei demais"],
    ],
    images: [r7, r1],
    likes: 9,
  },
];

function useCountdown(initialSeconds: number) {
  const [s, setS] = useState(initialSeconds);
  useEffect(() => {
    const i = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

type Variant = {
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  colors: string[];
  voltages: string[];
};

const variants: Variant[] = [
  {
    name: "Fritadeira Elétrica Forno Oven Air Fryer 12L Mondial",
    image: vAfon12,
    price: 88.16,
    oldPrice: 674.16,
    discount: 87,
    colors: ["Preto/Inox"],
    voltages: ["127V", "220V"],
  },
  {
    name: "Fritadeira Sem Óleo Air Fryer Family 4L Mondial",
    image: vCGbRoz4x,
    price: 94.32,
    oldPrice: 612.32,
    discount: 84,
    colors: ["Preto/Inox", "Preto"],
    voltages: ["127V", "220V"],
  },
  {
    name: "Fritadeira Sem Óleo Air Fryer Pratic 3,5L Mondial",
    image: vAf30i,
    price: 79.9,
    oldPrice: 549.9,
    discount: 85,
    colors: ["Preto/Inox", "Preto"],
    voltages: ["127V", "220V"],
  },
  {
    name: "Fritadeira Sem Óleo Air Fryer Grand Family 5L Mondial",
    image: vAfn50,
    price: 99.5,
    oldPrice: 689.0,
    discount: 85,
    colors: ["Preto/Inox", "Preto"],
    voltages: ["127V", "220V"],
  },
  {
    name: "Fritadeira Sem Óleo Air Fryer 8L Mondial Mega Family",
    image: vAfn80,
    price: 110.56,
    oldPrice: 771.56,
    discount: 86,
    colors: ["Preto/Inox", "Preto"],
    voltages: ["127V", "220V"],
  },
  {
    name: "Fritadeira Air Fryer Dual Duplo Cesto Mondial",
    image: vAfd01,
    price: 120.12,
    oldPrice: 820.12,
    discount: 85,
    colors: ["Preto/Inox", "Vermelho/Inox"],
    voltages: ["127V"],
  },
];

function formatPrice(v: number) {
  return v.toFixed(2).replace(".", ",");
}

function Index() {
  const [active, setActive] = useState(0);
  const countdown = useCountdown(3575);
  const [toastVisible, setToastVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVoltage, setSelectedVoltage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const variant = variants[selectedVariant];
  useEffect(() => {
    setSelectedColor(null);
    setSelectedVoltage(null);
  }, [selectedVariant]);
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);
  useEffect(() => {
    const t = setTimeout(() => setToastVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const next = () => setActive((i) => (i + 1) % productImages.length);
  const prev = () => setActive((i) => (i - 1 + productImages.length) % productImages.length);

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-between px-3 py-2.5">
        <button className="p-1" aria-label="Voltar">
          <ArrowLeft className="w-7 h-7 text-foreground" strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-3">
          <button className="p-1" aria-label="Compartilhar">
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
          <button className="p-1" aria-label="Carrinho">
            <ShoppingCart className="w-6 h-6 text-foreground" />
          </button>
          <button className="p-1" aria-label="Menu">
            <MoreHorizontal className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-4 py-1.5 text-xs">
        <span className="text-link">Início</span>
        <span className="text-muted-foreground"> / </span>
        <span className="text-link">Eletroportáteis</span>
      </div>

      {/* Gallery */}
      <div className="relative w-full aspect-square flex items-center justify-center bg-background p-4 select-none overflow-hidden">
        <img
          src={productImages[active]}
          alt="Fritadeira Elétrica Forno Oven Air Fryer 12L Mondial AFON-12L-BI-BC"
          width={600}
          height={600}
          className="w-[85%] h-[85%] object-contain"
          draggable={false}
          fetchPriority="high"
        />
        <button
          onClick={prev}
          aria-label="Produto anterior"
          className="absolute z-10 left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/90 border border-border shadow-md flex items-center justify-center text-foreground active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Próximo produto"
          className="absolute z-10 right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition animate-pulse"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-2">
        {productImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver produto ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>

      {/* Shipping tags */}
      <div className="px-4 pb-2 pt-2 flex items-center gap-3">
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">BR</span>
        <span className="text-xs font-semibold text-foreground">ENVIO NACIONAL</span>
        <span className="text-xs text-muted-foreground">3.512 VENDIDOS</span>
      </div>

      {/* Price banner */}
      <div
        className="px-4 py-3"
        style={{ background: "linear-gradient(to right, var(--price-from), var(--price-to))" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-1.5 py-0.5 rounded-sm">-87%</span>
              <span className="text-white text-xs">R$</span>
              <span className="text-3xl font-bold text-white tabular-nums leading-none">88,52</span>
            </div>
            <div className="mt-1">
              <span className="text-white/70 text-sm line-through">R$ 674,52</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-white" /> Oferta Relâmpago
            </div>
            <p className="text-white/90 text-xs font-semibold mt-1 tabular-nums">Termina em {countdown}</p>
          </div>
        </div>
      </div>

      {/* Save tags */}
      <div>
        <div className="px-4 py-2 flex gap-2 flex-wrap">
          <span className="bg-destructive/10 text-destructive text-xs font-semibold px-2.5 py-1 rounded-sm border border-destructive/20">
            🎁 Economize R$&nbsp;586,00
          </span>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-sm border border-primary/20">
            Economize 87% com bônus
          </span>
        </div>

        <div className="px-4 py-2 flex items-start gap-3">
          <h1 className="text-base font-semibold text-foreground leading-tight flex-1">
            Fritadeira Elétrica Forno Oven Air Fryer 12L Mondial AFON-12L-BI-BC
          </h1>
          <button aria-label="Favoritar">
            <Heart className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="px-4 pb-3 flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">4.8</span>
          <span className="text-link font-medium">(3.512)</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">3.512 vendidos</span>
        </div>

        {/* Delivery */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-start gap-3 mb-3">
            <Truck className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground">
                Receba até <strong>12 de jun – 17 de jun</strong>
              </p>
              <p className="text-sm text-muted-foreground line-through">Taxa de envio: R$ 9,60</p>
              <p className="text-primary text-xs font-semibold mt-0.5">Frete Grátis neste produto 🎉</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-foreground">
                Devoluções gratuitas em <strong>30 dias</strong>
              </p>
              <p className="text-sm text-muted-foreground">Cancelamento fácil</p>
            </div>
          </div>
        </div>
      </div>

      {/* About + specs */}
      <div className="px-4 py-5 border-t-8 border-secondary">
        <h2 className="text-base font-bold text-foreground mb-3">Sobre o produto</h2>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          A Air Fryer Forno da Mondial é 2 em 1: fritadeira a ar com o espaço e a versatilidade do
          forno. Você pode assar, cozinhar e fritar sem óleo e produzir receitas muito mais
          saudáveis! A capacidade total de 12 litros permite o preparo de grandes porções e de uma
          só vez. Além disso, a Air Fryer vem com 3 assadeiras: a assadeira tipo cesto é perfeita,
          pois possui capacidade para preparar até 500g de batata frita e a assadeira fechada é
          ótima para fazer legumes e alimentos com molhos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-secondary px-3 py-2 border-b border-border">
            Especificações técnicas
          </p>
          <ul className="divide-y divide-border">
            {specs.map(([k, v]) => (
              <li key={k} className="flex items-start justify-between gap-3 px-3 py-2.5 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground font-medium text-right">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 py-4 border-t-8 border-secondary">
        <h2 className="text-lg font-semibold text-foreground mb-3">Avaliações Do Produto</h2>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-3xl font-bold text-foreground">4.8</span>
          <span className="text-lg text-muted-foreground">/5</span>
          <div className="flex gap-0.5 ml-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-5">
          {[
            ["Tudo (793)", true],
            ["5 Estrelas (701)", false],
            ["4 Estrelas (52)", false],
            ["3 Estrelas (22)", false],
            ["Com Comentários (128)", false],
            ["Com Mídia (102)", false],
          ].map(([label, active]) => (
            <span
              key={label as string}
              className={
                active
                  ? "border rounded px-2.5 py-1 text-xs border-primary text-primary bg-primary/5"
                  : "border rounded px-2.5 py-1 text-xs border-border text-muted-foreground"
              }
            >
              {label}
            </span>
          ))}
        </div>
        <div className="space-y-6">
          {reviews.map((r, idx) => (
            <div key={idx} className="border-b border-border pb-5 last:border-b-0">
              <div className="flex items-start gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-link">{r.name}</p>
                  <div className="flex gap-0.5 my-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {r.date} | Variação: {r.variant}
                  </p>
                </div>
              </div>
              {r.fields && (
                <div className="mt-2 space-y-0.5">
                  {r.fields.map(([k, v]) => (
                    <p key={k} className="text-sm">
                      <span className="text-muted-foreground">{k}: </span>
                      <span className="text-foreground">{v}</span>
                    </p>
                  ))}
                </div>
              )}
              {r.text && (
                <p className="text-sm text-foreground mt-2 whitespace-pre-line">{r.text}</p>
              )}
              {r.images && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {r.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-20 h-20 rounded overflow-hidden bg-secondary"
                    >
                      <img
                        src={img}
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                <span>👍</span>
                <span>{r.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seller */}
      <div className="px-4 py-4 border-t-8 border-secondary">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              PQ
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Ponto Quente</p>
              <p className="text-xs text-muted-foreground">132 produtos</p>
            </div>
          </div>
          <button className="border border-border rounded-sm px-5 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            Seguir
          </button>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          A Mondial é uma das maiores marcas brasileiras de eletroportáteis para cozinha, com
          décadas de história em qualidade e inovação. Suas linhas incluem air fryers,
          liquidificadores, batedeiras, sanduicheiras, cafeteiras e muito mais. No Ponto Quente
          você encontra os melhores eletroportáteis Mondial com preços imbatíveis e frete grátis
          para todo o Brasil.
        </p>
      </div>

      {/* Footer accordions */}
      <div className="bg-background">
        <div className="divide-y divide-border">
          {["Comprar", "Atendimento", "Sobre a loja"].map((label) => (
            <div key={label}>
              <button className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-foreground">
                {label}
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>🚚</span>
            <span>Frete grátis</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>🔒</span>
            <span>Compra segura</span>
          </div>
        </div>
        <div className="px-4 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Ponto Quente. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex items-center px-2 py-2 gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <button
          className="flex flex-col items-center justify-center px-3 py-1 text-muted-foreground"
          aria-label="Loja"
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Loja</span>
        </button>
        <button
          className="flex flex-col items-center justify-center px-3 py-1 text-muted-foreground"
          aria-label="Chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Chat</span>
        </button>
        <button
          onClick={() => setSheetOpen(true)}
          className="flex-1 bg-secondary text-foreground font-bold text-sm py-3 text-center rounded-full leading-tight"
        >
          Adicionar
          <br />
          ao carrinho
        </button>
        <button
          onClick={() => setSheetOpen(true)}
          className="flex-1 bg-primary text-primary-foreground font-bold text-sm py-3 text-center rounded-full leading-tight"
        >
          <span className="block">Comprar agora</span>
          <span className="block text-xs font-medium opacity-90">R$ 88,52</span>
        </button>
      </div>

      {/* Social proof toast */}
      <div
        className={`fixed left-3 bottom-24 z-40 max-w-[300px] transition-all duration-500 ${
          toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-center gap-2.5 bg-background border border-border rounded-xl shadow-lg pl-2 pr-7 py-2">
          <div className="relative shrink-0">
            <img
              alt=""
              className="w-12 h-12 rounded-lg object-cover bg-secondary"
              src={altImg}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-badge text-green-badge-foreground flex items-center justify-center shadow">
              <CheckCircle2 className="w-3 h-3" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-green-badge">
              <CheckCircle2 className="w-3 h-3" />
              <span>Acabou de comprar</span>
            </div>
            <p className="text-[12px] font-semibold text-foreground leading-tight truncate">
              Carlos R.
            </p>
            <p className="text-[11px] text-muted-foreground truncate leading-tight">
              Fritadeira Sem Óleo Air Fryer 3,5L Mondial AF-30-DI Digital Touch Preta
            </p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              <span className="truncate">Porto Alegre, RS</span>
              <span>·</span>
              <span>há 13 minutos</span>
            </p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setToastVisible(false)}
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cart bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSheetOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-background rounded-t-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            <div className="pt-2 pb-1 flex justify-center shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <button
              onClick={() => setSheetOpen(false)}
              aria-label="Fechar"
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto px-4 pt-2 pb-4 flex-1">
              {/* Header: image + price */}
              <div className="flex gap-3 items-start pr-8">
                <img
                  src={variant.image}
                  alt={variant.name}
                  className="w-20 h-20 rounded-lg object-contain bg-secondary shrink-0"
                />
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="bg-destructive/10 text-destructive text-xs font-bold px-1.5 py-0.5 rounded">
                      -{variant.discount}%
                    </span>
                    <span className="text-primary text-sm font-medium">R$</span>
                    <span className="text-2xl font-bold text-primary tabular-nums leading-none">
                      {formatPrice(variant.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-through mt-1">
                    R$ {formatPrice(variant.oldPrice)}
                  </p>
                  <span className="inline-block mt-1.5 bg-primary text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded">
                    Frete grátis
                  </span>
                </div>
              </div>

              {/* Variant carousel */}
              <div className="mt-4 -mx-4 px-4 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {variants.map((v, i) => {
                    const isActive = i === selectedVariant;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(i)}
                        className={`shrink-0 w-[88px] text-left transition ${
                          isActive ? "" : "opacity-90"
                        }`}
                      >
                        <div
                          className={`w-[88px] h-[88px] rounded-md overflow-hidden flex items-center justify-center bg-secondary ${
                            isActive ? "ring-2 ring-primary" : "ring-1 ring-border"
                          }`}
                        >
                          <img
                            src={v.image}
                            alt={v.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p
                          className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                            isActive ? "text-primary font-semibold underline" : "text-foreground"
                          }`}
                        >
                          {v.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Oferta Relâmpago bar */}
              <div className="mt-3 bg-primary rounded-md px-3 py-2.5 flex items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Oferta Relâmpago</span>
                </div>
                <span className="text-sm font-semibold">Termina em 1 dia</span>
              </div>

              {/* Color */}
              {variant.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-bold text-foreground">
                      Cor{" "}
                      <span className="text-muted-foreground font-normal">
                        ({variant.colors.length})
                      </span>
                    </p>
                    {!selectedColor && (
                      <span className="text-sm text-muted-foreground">Selecione</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {variant.colors.map((c) => {
                      const isOn = selectedColor === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`rounded-lg p-3 flex flex-col items-center gap-1.5 transition ${
                            isOn ? "border-2 border-primary" : "border border-border"
                          }`}
                        >
                          <img
                            src={variant.image}
                            alt={c}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-xs font-semibold text-foreground">{c}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Voltage */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base font-bold text-foreground">
                    Voltagem{" "}
                    <span className="text-muted-foreground font-normal">
                      ({variant.voltages.length})
                    </span>
                  </p>
                  {!selectedVoltage && (
                    <span className="text-sm text-muted-foreground">Selecione</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {variant.voltages.map((v) => {
                    const isOn = selectedVoltage === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setSelectedVoltage(v)}
                        className={`rounded-lg p-3 flex flex-col items-center gap-1.5 transition ${
                          isOn ? "border-2 border-primary" : "border border-border"
                        }`}
                      >
                        <img
                          src={variant.image}
                          alt={v}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="text-xs font-semibold text-foreground">{v}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Qty */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-base font-bold text-foreground">Quantidade</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground"
                  >
                    –
                  </button>
                  <span className="text-base font-semibold w-6 text-center tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Aumentar"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky actions */}
            <div className="shrink-0 border-t border-border px-4 py-3 space-y-2 bg-background">
              {(!selectedColor || !selectedVoltage) && (
                <p className="text-center text-xs text-destructive font-medium">
                  Selecione {(!selectedColor && !selectedVoltage) ? "cor e voltagem" : !selectedColor ? "a cor" : "a voltagem"} para continuar
                </p>
              )}
              <button
                disabled={!selectedColor || !selectedVoltage}
                onClick={() => {
                  if (!selectedColor || !selectedVoltage) return;
                  window.location.href = "/checkout";
                }}
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-full leading-tight disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="block text-base">Comprar agora</span>
                <span className="block text-xs font-medium opacity-90">
                  R$ {formatPrice(variant.price * qty)}
                </span>
              </button>
              <button
                disabled={!selectedColor || !selectedVoltage}
                onClick={() => {
                  if (!selectedColor || !selectedVoltage) return;
                  window.location.href = "/checkout";
                }}
                className="w-full border border-primary text-primary font-bold py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
