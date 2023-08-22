import { NextResponse } from "next/server";
import { httpHelper } from "@/api/httpHelper";
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
  startDate: string | undefined;
  endDate: string | undefined;
  search: string | undefined;
  status?: number;
  sortDir: string | undefined;
  sortExpr?: string | undefined;
  pageSize?: number;
  pageIndex: number;
}

export async function GET(req: Request, { params }: { params: TenantRequest }) {
  try {
    const body = await req.json();
    var res = httpHelper.post(process.env.AUTH_API + "/Tenant/Manage", body);
    return res;
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: any }) {
  try {
    const body = await req.json();
    const res = await httpHelper.post(
      process.env.AUTH_API + "/Tenant/Add",
      body
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: TenantForm }) {
  try {
    const body = await req.json();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    };
    const res = await fetch(process.env.AUTH_API + "/Tenant/Edit", options);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
