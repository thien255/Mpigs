import Link from "next/link";
import { BsBell } from "react-icons/bs";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const DropdownNoti = () => {
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 mr-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100">
                    <BsBell />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                    <Link href="#" className="flex py-3 px-4 border-b hover:bg-gray-100">
                        <div className="flex-shrink-0">
                            <div className="w-11 h-11 rounded-full shadow-md text-center">
                                <span className="text-sm">Avatar</span>
                            </div>
                            <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-fuchsia-600 rounded-full border border-white">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5">New message from <span className="font-semibold text-gray-900">Bonnie Green</span>: Hey, whats up? All set for the presentation?</div>
                            <div className="text-xs font-medium text-fuchsia-500">a few moments ago</div>
                        </div>
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
export default DropdownNoti;