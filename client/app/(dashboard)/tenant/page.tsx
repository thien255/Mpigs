"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/dataTablePagination";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface TenantRequest {
  startDate?: string;
  endDate?: string;
  search?: string;
  status: number;
  sortDir?: string;
  sortExpr?: string;
  pageSize: number;
  pageIndex: number;
}

const formSchema = z
  .object({
    StartDate: z.string().max(10),
    EndDate: z.string().max(10),
    Scale: z.string(),
    License: z.string(),
    Status: z.number().default(-99),
    Search: z.string().max(50),
  })
  .partial();

export type Tenant = {
  id: string;
  shortName: string;
  name: string;
  type: number;
  isActive: boolean;
  isDelete: boolean;
  email: string;
};

export default function TenantManage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const columns: ColumnDef<Tenant>[] = [
    {
      accessorKey: "Id",
      header: "Id",
    },
    {
      accessorKey: "shortName",
      header: "Short Name",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        switch (Number(row.getValue("type"))) {
          case 1:
            return "Tập đoàn";
          case 2:
            return "Công ty";
          case 3:
            return "Trang trại";
          default:
            return "Chưa xác định";
        }
        return row.getValue("isActive") ? "Hoạt động" : "Ngưng hoạt động";
      },
    },
    {
      accessorKey: "isActive",
      header: "IsActive",
      cell: ({ row }) => {
        return row.getValue("isActive") ? "Hoạt động" : "Ngưng hoạt động";
      },
    },
  ];

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [data, setData] = useState<Tenant[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [payload, setPayload] = useState<TenantRequest>({
    pageIndex: 1,
    pageSize: table.getState().pagination.pageSize,
    status: -99,
  });

  useEffect(() => {
    getData();
  }, []);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const obj: TenantRequest = {
      startDate: data.StartDate,
      endDate: data.EndDate,
      search: data.Search,
      status: data.Status ?? -99,
      sortDir: "",
      sortExpr: "",
      pageSize: table.getState().pagination.pageIndex,
      pageIndex: table.getState().pagination.pageSize,
    };

    setPayload(obj);
  }

  const getData = () => {
    const requestOptions = {
      method: "GET",
    };
    var url = `/api/tenant?${new URLSearchParams(payload as any).toString()}`;
    fetch(url, requestOptions as RequestInit)
      .then(async (res) => {
        var data = await res.json();

        if (res.status == 200 && data.code == "00") {
          setData(data.data);
        } else {
          alert("Thất bại");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main className="w-full p-6 mx-auto">
      <div className="w-full max-w-full px-3 m-auto flex-0  h-full">
        <Card>
          <CardHeader>
            <div className="flex">
              <div className="flex-1 flex align-items-center">
                <CardTitle className="relative text-transparent bg-clip-text bg-gradient-cyan z-1 font-bold text-xl dark:text-white">
                  Danh sách thuê bao
                </CardTitle>
              </div>
              <div>
                <Link href="/tenant/new">
                  <Button className="bg-gradient-cyan font-medium">
                    Thêm mới
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="flex flex-col gap-2 xl:grap-3 2xl:gap-4"
              >
                <div className="grid lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="StartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời gian hết hạn</FormLabel>
                        <FormControl>
                          <div className={cn("grid gap-2", "")}>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id="date"
                                  variant={"outline"}
                                  className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date?.from ? (
                                    date.to ? (
                                      <>
                                        {format(date.from, "dd/MM/yyyy")} -{" "}
                                        {format(date.to, "dd/MM/yyyy")}
                                      </>
                                    ) : (
                                      format(date.from, "dd/MM/yyyy")
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  initialFocus
                                  mode="range"
                                  defaultMonth={date?.from}
                                  selected={date}
                                  onSelect={setDate}
                                  numberOfMonths={2}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={"-99"}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Chọn một"
                                className="placeholder:text-gray-600"
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="-99">Tất cả</SelectItem>
                              <SelectItem value="2">Sắp hết hạn</SelectItem>
                              <SelectItem value="1">Hoạt động</SelectItem>
                              <SelectItem value="0">Quá hạn</SelectItem>
                              <SelectItem value="-1">Ngưng sử dụng</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Search"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tìm kiếm</FormLabel>
                        <FormControl>
                          <Input placeholder="vd: LOCPHAT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="Scale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quy mô</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn một giá trị" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="1">Tập đoàn</SelectItem>
                              <SelectItem value="2">Công ty</SelectItem>
                              <SelectItem value="3">Trang trại</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="License"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giấy phép</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Tất cả"
                                className="placeholder:text-gray-600"
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="-99">Tất cả</SelectItem>
                              <SelectItem value="1">
                                Dùng thử <small>(thời hạn 4 tháng)</small>
                              </SelectItem>
                              <SelectItem value="2">
                                Gói 1 năm <small>(9 triệu)</small>
                              </SelectItem>
                              <SelectItem value="3">
                                Gói 2 năm <small>(15 triệu)</small>
                              </SelectItem>
                              <SelectItem value="4">
                                Gói 3 năm <small>(20 triệu)</small>
                              </SelectItem>
                              <SelectItem value="5">
                                Gói không giới hạn <small>(38 triệu)</small>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <Button className="bg-gradient-cyan font-medium">
                      Tìm kiếm
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:grap-3 2xl:gap-4"></div>
              </form>
            </Form>
            <div>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        // data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table}></DataTablePagination>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
