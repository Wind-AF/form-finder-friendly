import { createServerFn } from "@tanstack/react-start";

export const VIZZIONPAY_PUBLIC_KEY = "contato-wind-af_jq055rbdjh8n6tho";

export type CreatePixInput = {
  identifier: string;
  amount: number;
  shippingFee?: number;
  client: {
    name: string;
    email: string;
    phone?: string;
    document: string;
  };
  products: Array<{ id: string; name: string; quantity: number; price: number }>;
};

export const createPixPayment = createServerFn({ method: "POST" })
  .inputValidator((data: CreatePixInput) => data)
  .handler(async ({ data }) => {
    const secretKey = process.env.VIZZIONPAY_SECRET_KEY;
    if (!secretKey) {
      return { ok: false as const, error: "VIZZIONPAY_SECRET_KEY não configurada" };
    }

    const body = {
      identifier: data.identifier,
      amount: Number(data.amount.toFixed(2)),
      shippingFee: data.shippingFee ? Number(data.shippingFee.toFixed(2)) : undefined,
      client: data.client,
      products: data.products.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        price: Number(p.price.toFixed(2)),
      })),
    };

    try {
      const res = await fetch("https://app.vizzionpay.com.br/api/v1/gateway/pix/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-public-key": VIZZIONPAY_PUBLIC_KEY,
          "x-secret-key": secretKey,
        },
        body: JSON.stringify(body),
      });

      const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok) {
        return {
          ok: false as const,
          error:
            (json.message as string) ||
            (json.errorDescription as string) ||
            `Erro ${res.status} ao gerar Pix`,
          status: res.status,
        };
      }

      const pix = (json.pix ?? {}) as { code?: string; base64?: string; image?: string };
      return {
        ok: true as const,
        transactionId: json.transactionId as string,
        status: json.status as string,
        amount: data.amount,
        pix: {
          code: pix.code ?? "",
          base64: pix.base64 ?? "",
          image: pix.image ?? "",
        },
      };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Falha ao chamar VizzionPay",
      };
    }
  });