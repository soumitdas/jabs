import { BASE_URL, handleFetchApiResponse } from "./helper";

const url = `${BASE_URL}/users/cart`;

export default {
  async getCart(authToken) {
    const r = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async addToCart(productId, quantity, authToken) {
    const r = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return handleFetchApiResponse(r);
  },
  async updateCart(items, authToken) {
    const r = await fetch(`${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ items }),
    });
    return handleFetchApiResponse(r);
  },
};
