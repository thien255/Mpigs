import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BsGrid } from "react-icons/bs";
import { PiUsers, PiWarehouseDuotone, PiChartPieSlice } from "react-icons/pi";
import { GrVmware } from "react-icons/gr";
const DropdownSetting = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 mr-2 rounded-2xl text-gray-900 dark:text-white dark:opacity-80 hover:text-gray-900 hover:bg-gray-100 dark:bg-slate-950">
            <BsGrid />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] mt-3 bg-white dark:bg-gray-950">
          <DropdownMenuLabel className="">Cài đặt</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="#"
              className="block py-3 text-center rounded-2xl hover:bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white dark:opacity-80"
            >
              <div className="p-1">
                <PiUsers className="mx-auto mb-1 w-7 h-7 " />
              </div>
              <div className="p-1">
                <div className="text-sm font-normal">Tài khoản</div>
              </div>
            </Link>
            <Link
              href="/tenant"
              className="block py-3 text-center rounded-2xl hover:bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white dark:opacity-80"
            >
              <div className="p-1">
                <PiWarehouseDuotone className="mx-auto mb-1 w-7 h-7 " />
              </div>
              <div className="p-1">
                <div className="text-sm font-normal">Thuê bao</div>
              </div>
            </Link>

            <Link
              href="#"
              className="block py-3 text-center rounded-2xl hover:bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white dark:opacity-80"
            >
              <div className="p-1">
                <GrVmware className="mx-auto mb-1 w-7 h-7 " />
              </div>
              <div className="p-1">
                <div className="text-xs font-normal">Danh sách chức năng</div>
              </div>
            </Link>
            <Link
              href="#"
              className="block py-3 text-center rounded-2xl hover:bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white dark:opacity-80"
            >
              <div className="p-1">
                <PiChartPieSlice className="mx-auto mb-1 w-7 h-7 " />
              </div>
              <div className="p-1">
                <div className="text-xs font-normal">Danh sách báo cáo</div>
              </div>
            </Link>
            <Link
              href="#"
              className="block py-3 text-center rounded-2xl hover:bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white dark:opacity-80"
            >
              <div className="p-1">
                <PiUsers className="mx-auto mb-1 w-7 h-7 " />
              </div>
              <div className="p-1">
                <div className="text-xs font-normal">Nhật ký truy cập</div>
              </div>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default DropdownSetting;
