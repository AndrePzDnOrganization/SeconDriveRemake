export interface ProductApi {
  id: string;
  categoryid: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
  unitSold: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
}

export default async function createProduct(): Promise<Response> {
  const response = await fetch('/api/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

export async function getAllProducts(): Promise<Response> {
  const response = await fetch('/api/product');
  return response;
}
export async function getUniqueProduct(id: string): Promise<Response> {
  const response = await fetch(`/api/product/${id}`);
  return response;
}
