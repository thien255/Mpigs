"use client";
import { useSession } from "next-auth/react"
import { AiOutlineHome } from "react-icons/ai";
import MenuItem from "./menu-item";
interface MenuItem {
  icon?: any;
  href?: string | null;
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
    href: null,
    label: "Thuê bao",
    subMenu: true,
    children: [
      {
        href: "/tenant/new",
        label: "Thêm mới",
      },
    ],
  },
  {
    href: "/news",
    label: "Tin tức",
  },
  {
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
    href: "/contact",
    label: "Liên hệ",
  },
];

const Menu = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const checkRole = function (role: string | null) {
    const index = user?.role.findIndex(x => x === role);
    if (index && index > 0)
      return true;

    return false;
  }

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
