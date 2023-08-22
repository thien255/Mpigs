"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function NewTanent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    fetch("/api/tenant", {
      method: "POST",
      body: JSON.stringify(data),
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
            <CardTitle className="relative text-transparent bg-clip-text bg-gradient-cyan z-1 font-bold text-2xl dark:text-white">
              Thêm mới thuê bao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="flex flex-col gap-2 xl:grap-3 2xl:gap-4"
              >
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="Type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Quy mô <span className="text-rose-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại đơn vị để xác định quy mô doanh nghiệp" />
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
                    name="Code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mã <span className="text-rose-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="vd: LOCPHAT" {...field} />
                        </FormControl>
                        <FormDescription>
                          Chỉ cho phép ký tự hoặc số, tối đa 50 ký tự.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tên <span className="text-rose-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="vd: Công ty chăn nuôi Lộc Phát"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Tối đa 150 ký tự.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ShortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nhãn <span className="text-rose-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="vd: Lộc Phát" {...field} />
                        </FormControl>
                        <FormDescription>Tối đa 60 ký tự.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="License"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Giấy phép <span className="text-rose-600">*</span>
                        </FormLabel>
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
                                      "w-[240px] pl-3 text-left font-normal",
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
                </div>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="Representative"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Người đại diện</FormLabel>
                        <FormControl>
                          <Input placeholder="vd: Nguyễn Văn A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="vd: 0987654321" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Tax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã số thuế</FormLabel>
                        <FormControl>
                          <Input placeholder="vd: xxxxxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <FormField
                    control={form.control}
                    name="Address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="vd: Quận Hoàn Kiếm, TP Hà Nội"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="IsActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isActive"
                            className="bg-sky-500"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor="isActive">
                            {field.value ? "Kích hoạt" : "Không kích hoạt"}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                  <Button className="bg-gradient-cyan font-medium">
                    <Check className="mr-2 h-4 w-4" /> Thêm mới
                  </Button>
                  <Link href="/tenant">
                    <Button className="bg-secondary text-black font-medium">
                      Quy lại
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
