"use client";
import React from "react";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormDescription } from "@/components/ui/form";


export default function NewTanent() {
  const [date, setDate] = React.useState<Date>()
  return (
    <main className="w-full p-6 mx-auto">
      <div className="w-full max-w-full px-3 m-auto flex-0  h-full">
        <Card>
          <CardHeader>
            <CardTitle className="relative text-transparent bg-clip-text bg-gradient-cyan z-1 font-bold text-2xl dark:text-white">Thêm mới thuê bao</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2 xl:grap-3 2xl:gap-4">
              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                <div>
                  <Label className="text-gray-800">
                    Quy mô <span className="text-rose-600">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại đơn vị để xác định quy mô doanh nghiệp" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="1">Tập đoàn</SelectItem>
                      <SelectItem value="2">Công ty</SelectItem>
                      <SelectItem value="3">Trang trại</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-800">
                    Mã <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded "
                    placeholder="vd: LOCPHAT"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                <div>
                  <Label className="text-gray-800">
                    Tên <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded "
                    placeholder="vd: Công ty chăn nuôi Lộc Phát"
                  />
                </div>

                <div>
                  <Label className="text-gray-800">
                    Nhãn <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded  "
                    placeholder="vd: Lộc Phát"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                <div>
                  <Label className="text-gray-800">
                    Giấy phép <span className="text-rose-600">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn một" className="placeholder:text-gray-600" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="1">Dùng thử</SelectItem>
                      <SelectItem value="2">Mua theo gói</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-800 w-full">Ngày hết hạn</Label>
                  <div className="w-full">
                    <Popover >
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd/MM/yyyy") : <span>Chọn một ngày</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                <div>
                  <Label className="text-gray-800">
                    Người đại diện <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded  "
                    placeholder="vd: Nguyễn Văn A"
                  />
                </div>
                <div>
                  <Label className="text-gray-800">
                    Số điện thoại <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded  "
                    placeholder="vd: Nguyễn Văn A"
                  />
                </div>
                <div>
                  <Label className="text-gray-800">
                    Mã số thuế
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="rounded  "
                    placeholder="vd: 129009238999"
                  />
                </div>

              </div>


              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 xl:grap-3 2xl:gap-4">
                <div>
                  <Label className="text-gray-800">Địa chỉ</Label>
                  <Textarea className="rounded " />
                </div>
              </div>

              <div>
                <Label className="text-gray-800">
                  Trạng thái <span className="text-rose-600">*</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch id="isActive" className="bg-sky-500" />
                  <Label htmlFor="isActive">Kích hoạt</Label>
                </div>
              </div>

            </form>
          </CardContent>
          <CardFooter>
            <Button className="bg-gradient-cyan font-medium">
              <Check className="mr-2 h-4 w-4" /> Thêm mới
            </Button>
          </CardFooter>
        </Card>

      </div>
    </main>
  );
}
