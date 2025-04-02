export interface Product {
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
}

export async function GetProductsByName(name: string): Promise<Response> {
  const response = await fetch(`http://localhost/product/search/${name}`);
  return response;
}

export async function GetAllProducts(): Promise<Response> {
  const response = await fetch('http://localhost/product');
  return response;
}

export async function GetProductByCategory(
  categoryid: string
): Promise<Response> {
  const response = await fetch(`http://localhost/product/category/${categoryid}`);
  return response;
}
