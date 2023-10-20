"use client";
// import { httpHelper } from "@/api/httpHelper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ResultBaseOfTenant {
  code: string;
  message: string;
  data?: Tenant | undefined;
  dataMessage: string;
}

export interface Tenant {
  id: number;
  code: string;
  shortName: string;
  name: string;
  description?: string | undefined;
  type: string;
  logo?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  representative?: string | undefined;
  license?: string | undefined;
  expired?: Date | undefined;
  email?: string | undefined;
  scale?: string | undefined;
  isActive?: boolean | undefined;
  isDelete: boolean;
  createdOn: Date;
  createdBy?: string | undefined;
  latestUpdatedOn?: Date | undefined;
  updatedBy?: string | undefined;
}

export interface TenantForm {
  id: number;
  code: string;
  shortName: string;
  name: string;
  description?: string | undefined;
  type: string;
  logo?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  representative?: string | undefined;
  expired?: Date | undefined;
  email?: string | undefined;
  scale?: string | undefined;
  isActive?: boolean | undefined;
}

export interface TenantRequest {
  startDate?: string | undefined;
  endDate?: string | undefined;
  search?: string | undefined;
  status?: number;
  sortDir: string | undefined;
  sortExpr?: string | undefined;
  pageSize?: number;
  pageIndex: number;
}
const cookieStore = cookies();

const token = cookieStore.get("token");

const TenantServices = {
  Manage: (payload: any) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
    return fetch(
      process.env.AUTH_API + "/Tenant/Manage",
      requestOptions as RequestInit
    ).then(handleResponse);
  },
  Add: (payload: TenantForm) => {
    // return httpHelper.post(process.env.AUTH_API + "/Tenant/Add", payload);
  },

  Edit: (payload: TenantForm) => {
    // return httpHelper.post(process.env.AUTH_API + "/Tenant/Edit", payload);
  },
};

export default TenantServices;

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (response.status !== 200) {
      if ([403].includes(response.status)) {
        redirect("/page-forbidden");
      } else if ([401].includes(response.status)) {
        redirect("/sign-in");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
