// Server-trusted product price catalog.
// Prices here are the source of truth — never trust client-supplied amounts.
export const PRODUCT_CATALOG: Record<string, { name: string; price: number }> = {
  af30i: {
    name: "Fritadeira Sem Óleo Air Fryer 3,5L Mondial AF-30-I",
    price: 56.0,
  },
  afon12bi: {
    name: "Fritadeira Air Fryer Forno Oven 12L Mondial AFON-12L-BI Preto/Inox 2000W",
    price: 120.12,
  },
  mp05b: {
    name: "Mini Processador Mondial Preto 150W - MP-05-B",
    price: 32.52,
  },
  cesto: {
    name: "Cesto Redondo Antiaderente Air Fryer Mondial AF-30 e AF-30i",
    price: 24.68,
  },
  ce06: {
    name: "Chaleira Elétrica Pratic Mondial Preto/Inox 1200W - CE-06",
    price: 30.52,
  },
  l1000r: {
    name: "Copo Cristal Vermelho do Liquidificador Mondial (sem tampa) L-1000-R",
    price: 20.04,
  },
  pp04: {
    name: "Pipoqueira Elétrica Popflix Mondial Branco 1200W - PP-04",
    price: 38.64,
  },
};

export const SHIPPING_OPTIONS = {
  free: 0,
  sedex: 9.8,
} as const;

export type ShippingMethod = keyof typeof SHIPPING_OPTIONS;