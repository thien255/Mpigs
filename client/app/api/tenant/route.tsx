import { NextResponse } from "next/server";
import { httpHelper } from "@/api/httpHelper";
import { NextApiRequest } from "next";
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
  sortDir?: string | undefined;
  sortExpr?: string | undefined;
  pageSize?: number;
  pageIndex: number;
}

export async function GET(req: Request) {
  try {
    const urlObj = new URL(req.url);
    const body = {
      startDate: urlObj.searchParams.get("startDate"),
      endDate: urlObj.searchParams.get("endDate"),
      search: urlObj.searchParams.get("search"),
      status: Number(urlObj.searchParams.get("status")),
      sortDir: urlObj.searchParams.get("sortDir"),
      sortExpr: urlObj.searchParams.get("sortExpr"),
      pageSize: Number(urlObj.searchParams.get("pageSize")),
      pageIndex: Number(urlObj.searchParams.get("pageIndex")),
    };
    console.log(body);
    return httpHelper.post(process.env.AUTH_API + "/Tenant/Manage", body);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await httpHelper.post(
      process.env.AUTH_API + "/Tenant/Add",
      body
    );
    return res;
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(process.env.AUTH_API + "/Tenant/Edit", options);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
