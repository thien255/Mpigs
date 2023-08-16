"use client";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { signOut } from "next-auth/react";
import { FaBarsStaggered } from "react-icons/fa6";
import Menu from "@/(dashboard)/components/menu";
import DropdownSetting from "@/(dashboard)/components/dropdown-setting";
import DropdownUser from "@/(dashboard)/components/dropdown-user";
import DropdownNoti from "@/(dashboard)/components/dropdown-noti";
import DropdownTheme from "@/(dashboard)/components/dropdown-theme";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="fixed z-30 w-full ">
        <div className="py-3 px-3 lg:px-5 lg:pl-3">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex flex-1 justify-end gap-2">
                <button className="p-3 rounded-l">
                  <FaBarsStaggered />
                </button>
              </div>
              <div className="logo">
                <Image
                  className={`dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert `}
                  src="/next.svg"
                  width={130}
                  height={39}
                  alt="Next.js Logo"
                />
              </div>
            </div>
            <div className="flex items-center ">
              <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
                <DropdownTheme />
                <DropdownNoti />
                <DropdownSetting />
                <DropdownUser />
                <button
                  className="hidden  md:inline-flex ml-5 text-white bg-gradient-cyan font-medium rounded-lg text-sm px-5 py-2.5 mr-3 shadow-md  hover:scale-[1.02] transition-transform"
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: `/sign-in`,
                    })
                  }
                >
                  Log out
                </button>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900 c pt-16">
        <div className="flex fixed top-0 dark:bg-black left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width lg:w-64">
          <div className="flex relative flex-col flex-1 pt-0 min-h-0">
            <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
              <div className="flex-1 px-3">
                <Menu />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full min-h-[90vh] w-full relative overflow-y-auto lg:ml-64">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
