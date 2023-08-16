"use client";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { FaRegCircle } from "react-icons/fa6";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
interface Item {
  icon?: IconType;
  href?: string | null;
  label: string;
  subMenu?: boolean;
  children?: Item[];
}
interface MenuItemProp {
  Data: Item;
}
const MenuItem = (props: MenuItemProp) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const menu = props.Data;
  const Icon = props.Data.icon ?? FaRegCircle;
  return (
    <>
      {!menu.children ? (
        <>
          <Link
            className="flex w-full items-center py-2.5 px-4 text-base font-normal text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
            href={menu.href}
          >
            <Icon className="bg-white shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center" />
            <span className="ml-3 font-normal">{menu.label}</span>
          </Link>
        </>
      ) : (
        <>
          <button
            className="flex w-full items-center py-2.5 px-4 text-base font-normal text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
            onClick={() => setShowSubMenu(!showSubMenu)}
          >
            <Icon className="bg-white shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center" />
            <span className="ml-3 font-normal">{menu.label}</span>
            {!showSubMenu ? (
              <BiChevronDown className="w-4 h-4 ml-auto text-gray-700 text-xs" />
            ) : (
              <BiChevronUp className="w-4 h-4 ml-auto text-gray-700 text-xs" />
            )}
          </button>
          <ul
            onClick={() => setShowSubMenu(!showSubMenu)}
            className={(showSubMenu ? "" : "hidden") + " duration-300"}
          >
            {menu.children?.map((children, j) => {
              return (
                <li key={j}>
                  <Link
                    className="text-sm text-black font-normal rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    href={children.href}
                  >
                    <span className="ml-3 font-normal">{children.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
export default MenuItem;
