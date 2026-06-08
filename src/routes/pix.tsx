import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/pix")({
  component: PixPage,
  head: () => ({
    meta: [
      { title: "Pagamento PIX — Ponto Quente" },
      { name: "description", content: "Pague seu pedido via PIX." },
    ],
  }),
});

type PixData = {
  code: string;
  base64: string;
  image: string;
  amount: number;
  transactionId: string;
};

function fmt(v: number) {
  return v.toFixed(2).replace(".", ",");
}

function PixPage() {
  const [pix, setPix] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pq:pix");
      if (raw) setPix(JSON.parse(raw) as PixData);
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const copyCode = async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!loaded) return null;

  if (!pix) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-base font-bold mb-2">Nenhum pagamento PIX encontrado</p>
        <p className="text-sm text-muted-foreground mb-4">
          Finalize um pedido no checkout para gerar o código PIX.
        </p>
        <Link
          to="/checkout"
          className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-full text-sm"
        >
          Ir para o checkout
        </Link>
      </div>
    );
  }

  const qrSrc = pix.base64 || pix.image || "";

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="sticky top-0 z-40 bg-background flex items-center px-3 py-2.5 border-b border-border max-w-lg mx-auto">
        <Link to="/checkout" className="p-1" aria-label="Voltar">
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </Link>
        <h1 className="text-base font-bold text-foreground mx-auto pr-8">Pagamento PIX</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">Pedido criado com sucesso!</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Escaneie o QR Code ou copie o código PIX para pagar
          </p>
        </div>

        <div className="bg-background border border-border rounded-2xl p-5 space-y-4">
          {qrSrc ? (
            <img
              src={qrSrc}
              alt="QR Code PIX"
              className="w-60 h-60 mx-auto bg-white p-2 rounded-lg"
            />
          ) : (
            <div className="w-60 h-60 mx-auto bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
              QR Code indisponível
            </div>
          )}

          <div className="text-center">
            <div className="text-2xl font-extrabold text-foreground">R$ {fmt(pix.amount)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Pagamento via PIX · Aprovação instantânea
            </div>
          </div>

          <div className="bg-muted rounded-lg p-3">
            <p className="text-[11px] text-muted-foreground text-center mb-1.5">
              Código PIX Copia e Cola:
            </p>
            <p className="text-[11px] font-mono break-all leading-relaxed text-center">
              {pix.code}
            </p>
          </div>

          <button
            onClick={copyCode}
            className="w-full bg-foreground text-background font-bold py-3.5 rounded-full text-sm inline-flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Código copiado!" : "Copiar código PIX"}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Pague com PIX a qualquer momento
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          ID da transação: {pix.transactionId}
        </p>
      </div>
    </div>
  );
}