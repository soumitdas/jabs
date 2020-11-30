export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function handleFetchApiResponse(resp) {
  const response = await resp.json();
  if (response.status === "ERROR") {
    throw new Error(response.message);
  }
  return response;
}

// export function handleApiError(resp) {
//   if (resp.status === "ERROR") {
//     throw new Error(resp.message);
//   }
//   return resp;
// }
