import { products } from "../../../data/products";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(products, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
