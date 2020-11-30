import { BASE_URL, handleFetchApiResponse } from "./helper";

const userOrderUrl = `${BASE_URL}/users/orders`;
const orderUrl = `${BASE_URL}/orders`;

export default {
  async getOrder(authToken, page, limit) {
    const r = await fetch(`${userOrderUrl}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await handleFetchApiResponse(r);
  },
  async getOrderById(id, authToken) {
    const r = await fetch(`${userOrderUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async getOrderAdmin(authToken, page, limit) {
    const r = await fetch(`${orderUrl}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async getOrderByIdAdmin(id, authToken) {
    const r = await fetch(`${orderUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async initOrder(shipping, paymentMethod, authToken) {
    const r = await fetch(`${orderUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        shipping,
        payment: {
          method: paymentMethod,
        },
      }),
    });
    return await handleFetchApiResponse(r);
  },
  async orderPaymentConfirm(rpResponse, orderId, authToken) {
    const r = await fetch(`${orderUrl}/${orderId}/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(rpResponse),
    });
    return await handleFetchApiResponse(r);
  },
  async processOrder(id, action, data, authToken) {
    const r = await fetch(`${orderUrl}/${id}?action=${action}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    return handleFetchApiResponse(r);
  },
};
