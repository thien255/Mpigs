"use client";
import { useSession } from "next-auth/react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import {
  PiUsers,
  PiWarehouseDuotone,
  PiChartPieSlice,
  PiBookmarkDuotone,
} from "react-icons/pi";
import MenuItem from "./menu-item";
interface MenuItem {
  icon?: any;
  href: string | "#";
  label: string;
  subMenu?: boolean;
  children?: MenuItem[];
}

const menuList: MenuItem[] = [
  {
    icon: AiOutlineHome,
    href: "/",
    label: "Trạng chủ",
  },
  {
    href: "/servicer",
    label: "Dịch vụ",
  },
  {
    icon: PiWarehouseDuotone,
    label: "Thuê bao",
    href: "/tenant",
  },
  {
    icon: PiBookmarkDuotone,
    href: "/news",
    label: "Tin tức",
  },
  {
    icon: PiUsers,
    href: "/user",
    label: "Tài khoản",
    children: [
      {
        href: "/products/1",
        label: "Nội địa",
      },
      {
        href: "/products/2",
        label: "Nhập khẩu",
      },
    ],
  },
  {
    icon: PiChartPieSlice,
    href: "/contact",
    label: "Báo cáo",
  },
];

const Menu = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const checkRole = function (role: string | null) {
    const index = user?.role.findIndex((x) => x === role);
    if (index && index > 0) return true;

    return false;
  };

  return (
    <ul className="pb-2 pt-1">
      {menuList.map((item, i) => {
        return (
          <li key={i}>
            <MenuItem Data={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
