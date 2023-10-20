"use client";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { FaRegCircle } from "react-icons/fa6";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
interface Item {
  icon?: IconType;
  href: string | "#";
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
            className="flex w-full items-center mx-2.5 py-2.5 px-4 text-base font-normal text-dark-700 dark:opacity-80 dark:text-white   rounded-lg transition-all duration-200"
            href={menu.href}
          >
            <div className="w-8 h-8 bg-white text-black rounded-lg text-center  grid place-items-center mr-1 shadow">
              <Icon />
            </div>
            <span className="ml-3 text-sm">{menu.label}</span>
          </Link>
        </>
      ) : (
        <>
          <button
            className="flex w-full items-center text-base font-normal mx-2.5 py-2.5 px-4 text-dark-700 dark:text-white dark:opacity-80 rounded-lgtransition-all duration-200"
            onClick={() => setShowSubMenu(!showSubMenu)}
          >
            <div className="w-8 h-8 bg-white text-black rounded-lg text-center shadow grid place-items-center mr-1 ">
              <Icon />
            </div>
            <span className="ml-3 text-sm">{menu.label}</span>
            {!showSubMenu ? (
              <BiChevronDown className="w-4 h-4 ml-auto text-xs" />
            ) : (
              <BiChevronUp className="w-4 h-4 ml-auto text-xs" />
            )}
          </button>
          <ul
            onClick={() => setShowSubMenu(!showSubMenu)}
            className={`${
              showSubMenu ? "" : "hidden"
            } ease-soft-in-out transition duration-20`}
          >
            {menu.children?.map((children, j) => {
              return (
                <li key={j}>
                  <Link
                    className="text-sm text-dark-700 font-normal rounded-lg flex items-center p-2 group transition duration-75 pl-11 dark:text-white dark:opacity-80"
                    href={children.href}
                  >
                    <span className="ml-3">{children.label}</span>
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
