import Link from "next/link";
import React from "react";
import { useState } from "react";

const menuList = [
  {
    href: "/",
    label: "Trạng chủ",
  },
  {
    href: "/servicer",
    label: "Dịch vụ",
  },
  {
    href: "/products",
    label: "Sản phẩm",
    subMenu: true,
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
    href: "/news",
    label: "Tin tức",
  },
  {
    href: "/user",
    label: "Tài khoản",
  },
  {
    href: "/contact",
    label: "Liên hệ",
  },
];

interface NavbarTopProp {
  showCatMenu: boolean;
  setShowCatMenu: Function;
}

const NavbarTop = (props: NavbarTopProp) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <ul
      className={
        (props.showCatMenu
          ? "fixed top-0 left-0 bottom-0 flex-col min-w-[240px] w-[70%] bg-slate-100"
          : "") + "hidden md:flex md:flex-row md:gap-4 font-medium"
      }
    >
      {menuList.map((item, i) => {
        {
          return (
            <React.Fragment key={i}>
              {!item.subMenu ? (
                <li>
                  <Link className="py-3 px-5 block" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li className="relative">
                  <Link
                    className="py-3 px-5 block"
                    href={item.href}
                    onMouseEnter={() => setShowSubMenu(true)}
                    onMouseLeave={() => setShowSubMenu(false)}
                  >
                    {item.label}
                  </Link>
                  <ul
                    onMouseEnter={() => setShowSubMenu(true)}
                    onMouseLeave={() => setShowSubMenu(false)}
                    className={
                      (showSubMenu ? "" : "hidden") +
                      " flex flex-col absolute top-10 left-0 min-w-[180px] py-3 shadow-md duration-300"
                    }
                  >
                    {item.children?.map((children, j) => {
                      return (
                        <li key={j} className="py-3 px-5">
                          <Link href={children.href} className="block">
                            {children.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
            </React.Fragment>
          );
        }
      })}
    </ul>
  );
};

export default NavbarTop;
