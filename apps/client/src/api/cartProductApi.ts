export interface CartProduct {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    price: number;
    discount: number;
  };
}

export async function getAllByCartId(cartId: string): Promise<Response> {
  const response = await fetch(`/api/cartProduct/${cartId}`);
  return response;
}

export async function getAllCartProductsByCartId(
  cartId: string
): Promise<Response> {
  const response = await fetch(`/api/cartProduct/${Number(cartId)}`);
  return response;
}

export async function getCartTotalPriceByCartId(
  cartId: string
): Promise<Response> {
  const response = await fetch(`/api/cartproduct/total/${Number(cartId)}`);
  return response;
}
