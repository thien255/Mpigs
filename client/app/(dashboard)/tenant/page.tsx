"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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

interface TenantDTO {
  Code: string;
  ShortName: string;
}

const formSchema = z
  .object({
    Code: z
      .string({
        required_error: "Dữ liệu bắt buộc",
      })
      .max(50),
    ShortName: z
      .string({
        required_error: "Dữ liệu bắt buộc",
      })
      .max(60),
    Name: z
      .string({
        required_error: "Dữ liệu bắt buộc",
      })
      .max(150),
    Description: z.string().max(500),
    Type: z.string(),
    Representative: z.string(),
    Phone: z.string().max(12),
    Tax: z.string().max(20),
    Address: z.string().max(500),
    IsActive: z.boolean(),
    License: z.string().max(250),
    Expired: z.date(),
  })
  .partial()
  .required({
    Code: true,
    ShortName: true,
    Name: true,
  });
export type Tenant = {
  id: string;
  shortName: string;
  name: string;
  type: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export default function NewTanent() {
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
  ];

  const [data, setData] = useState<Tenant[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  function getData() {
    fetch("/api/tenant", {
      method: "POST",
    })
      .then((res) => {
        console.log(res.text);

        if (!res.ok) {
          alert("Thất bại");
        } else {
          alert("Thành công");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
                    name="Type"
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
                                placeholder="Chọn một"
                                className="placeholder:text-gray-600"
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full">
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

                  <FormField
                    control={form.control}
                    name="Expired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày hết hạn</FormLabel>
                        <FormControl>
                          <div className="w-full">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd/MM/yyyy")
                                    ) : (
                                      <span>Chọn một ngày</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
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
                    name="Code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tìm kiếm</FormLabel>
                        <FormControl>
                          <Input placeholder="vd: LOCPHAT" {...field} />
                        </FormControl>
                        <FormDescription>
                          <small>
                            Chỉ cho phép ký tự hoặc số, tối đa 50 ký tự.
                          </small>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:grap-3 2xl:gap-4"></div>
              </form>
            </Form>
          </CardContent>
        </Card>
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
                    data-state={row.getIsSelected() && "selected"}
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
        </div>
      </div>
    </main>
  );
}
