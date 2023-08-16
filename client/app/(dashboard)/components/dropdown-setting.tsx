
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BsGrid } from "react-icons/bs";
import { PiUsers } from "react-icons/pi";
const DropdownSetting = () => {
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2  mr-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100">
                    <BsGrid />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] bg-white">
                <DropdownMenuLabel>Setting</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-3 gap-3">
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                    <Link href="#" className="block p-4 text-center rounded-2xl hover:bg-gray-100">
                        <PiUsers className="mx-auto mb-1 w-7 h-7 text-gray-500" />
                        <div className="text-sm font-medium text-gray-900">Sales</div>
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
export default DropdownSetting;