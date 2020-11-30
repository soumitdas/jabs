import { BASE_URL, handleFetchApiResponse } from "./helper";

const url = `${BASE_URL}/users`;

export default {
  async updateUserSelf(data, authToken) {
    const r = await fetch(`${url}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    return handleFetchApiResponse(r);
  },
  async getAllAdmin(authToken) {
    const r = await fetch(`${url}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async getByIdAdmin(id, authToken) {
    const r = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
  async deleteByIdAdmin(id, authToken) {
    const r = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleFetchApiResponse(r);
  },
};
