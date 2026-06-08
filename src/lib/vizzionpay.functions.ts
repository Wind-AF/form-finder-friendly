import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCT_CATALOG, SHIPPING_OPTIONS, type ShippingMethod } from "./products.catalog";

export const VIZZIONPAY_PUBLIC_KEY = "contato-wind-af_jq055rbdjh8n6tho";

const CreatePixSchema = z.object({
  identifier: z.string().trim().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/),
  shippingMethod: z.enum(["free", "sedex"]).default("free"),
  client: z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(20).optional(),
    document: z.string().min(1).max(20),
  }),
  products: z
    .array(
      z.object({
        id: z.string().min(1).max(64),
        quantity: z.number().int().positive().max(20),
      }),
    )
    .min(1)
    .max(20),
});

export type CreatePixInput = z.input<typeof CreatePixSchema>;

export const createPixPayment = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => CreatePixSchema.parse(raw))
  .handler(async ({ data }) => {
    const secretKey = process.env.VIZZIONPAY_SECRET_KEY;
    if (!secretKey) {
      console.error("[vizzionpay] Missing VIZZIONPAY_SECRET_KEY env var");
      return {
        ok: false as const,
        error: "Serviço de pagamento indisponível. Tente novamente mais tarde.",
      };
    }

    // Server-side price computation — never trust client-supplied amounts.
    const products: Array<{ id: string; name: string; quantity: number; price: number }> = [];
    let subtotal = 0;
    for (const item of data.products) {
      const catalogItem = PRODUCT_CATALOG[item.id];
      if (!catalogItem) {
        return {
          ok: false as const,
          error: `Produto inválido: ${item.id}`,
        };
      }
      const lineTotal = catalogItem.price * item.quantity;
      subtotal += lineTotal;
      products.push({
        id: item.id,
        name: catalogItem.name,
        quantity: item.quantity,
        price: Number(catalogItem.price.toFixed(2)),
      });
    }

    const shippingMethod: ShippingMethod = data.shippingMethod ?? "free";
    const shippingFee = SHIPPING_OPTIONS[shippingMethod];
    const amount = Number((subtotal + shippingFee).toFixed(2));

    if (amount <= 0) {
      return { ok: false as const, error: "Valor do pedido inválido" };
    }

    const client: Record<string, string> = {
      name: data.client.name.trim(),
      email: data.client.email.trim(),
      document: data.client.document.replace(/\D/g, ""),
    };
    if (data.client.phone && data.client.phone.trim()) {
      client.phone = data.client.phone.trim();
    } else {
      client.phone = "11999999999";
    }

    const body: Record<string, unknown> = {
      identifier: data.identifier,
      amount,
      client,
      products,
    };
    if (shippingFee > 0) {
      body.shippingFee = Number(shippingFee.toFixed(2));
    }

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
        console.error("[vizzionpay] PIX create failed", res.status, json);
        return {
          ok: false as const,
          error: "Não foi possível gerar o Pix. Tente novamente em instantes.",
          status: res.status,
        };
      }

      const pix = (json.pix ?? {}) as { code?: string; base64?: string; image?: string };
      return {
        ok: true as const,
        transactionId: json.transactionId as string,
        status: json.status as string,
        amount,
        pix: {
          code: pix.code ?? "",
          base64: pix.base64 ?? "",
          image: pix.image ?? "",
        },
      };
    } catch (err) {
      console.error("[vizzionpay] PIX create exception", err);
      return {
        ok: false as const,
        error: "Falha ao processar pagamento. Tente novamente.",
      };
    }
  });