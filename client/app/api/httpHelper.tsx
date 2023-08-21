import Router from "next/router";
import { getServerSession } from "next-auth/next";
import authOptions from "@/api/auth/[...nextauth]/authOptions";
import { Session } from "inspector";
export const httpHelper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await authHeader(url),
  };
  return fetch(url, requestOptions as RequestInit).then(handleResponse);
}

async function post(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader(url)) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  console.log(url);
  console.log(requestOptions);
  return fetch(url, requestOptions as RequestInit).then(handleResponse);
}

async function put(url: string, body: any) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(await authHeader(url)) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions as RequestInit).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await authHeader(url),
  };

  return fetch(url, requestOptions as RequestInit).then(handleResponse);
}

// helper functions

async function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = await getServerSession(authOptions);

  const isLoggedIn = user && user.token;
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      console.log(response);
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        console.log("Authen");
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
