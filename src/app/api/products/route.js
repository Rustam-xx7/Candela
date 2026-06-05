import { products } from "../../../data/products";

export async function GET() {
  return Response.json(products, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
