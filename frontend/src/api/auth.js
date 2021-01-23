import { BASE_URL, handleFetchApiResponse } from "./helper";

const url = `${BASE_URL}/auth`;
//const authToken = JSON.parse(localStorage.getItem("__auth_token"));

export default {
  async signin(email, password, remember) {
    const r = await fetch(`${url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, remember }),
    });
    return await handleFetchApiResponse(r);
  },
  async googleSignin(token) {
    const r = await fetch(`${url}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return await handleFetchApiResponse(r);
  },
  async signup(name, email, password) {
    const r = await fetch(`${url}/signup?getToken=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await handleFetchApiResponse(r);
  },
  async changePassword(oldPassword, newPassword, authToken) {
    const r = await fetch(`${url}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return await handleFetchApiResponse(r);
  },
  async forgotPassword(email) {
    const r = await fetch(`${url}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return handleFetchApiResponse(r);
  },
  async verifyEmail(uid, key) {
    const r = await fetch(`${url}/verify?type=email&uid=${uid}&key=${key}`);
    return handleFetchApiResponse(r);
  },
  async resetPassword(id, key, newPassword) {
    const r = await fetch(`${url}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, key, newPassword }),
    });
    return handleFetchApiResponse(r);
  },
};
