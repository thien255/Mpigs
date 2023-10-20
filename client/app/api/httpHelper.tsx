import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/api/auth/[...nextauth]/authOptions";
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
    body: JSON.stringify(body),
  };
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
    if ([403].includes(response.status)) {
      //Forbidden response returned from api
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    } else if ([401].includes(response.status)) {
      // auto logout if 401 Unauthorized
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = text && JSON.parse(text);
    console.log(data);
    if (response.status !== 200) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return NextResponse.json(data);
  });
}
