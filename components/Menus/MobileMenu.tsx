"use client";
import React from "react";
import { useState } from "react";
import { Button } from "../Buttons/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as HeroIcons from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface MenuItem {
  name: string;
  slug?: string;
  href?: string;
  color?: string;
  icon?: string;
}

interface TabProps {
  nav?: MenuItem[];
}

function MobileMenu({ nav }: TabProps) {
  const pathName = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto  bg-white  shadow-xl z-40 border-t border-gray-200 pb-6 w-screen">
      <nav className="flex flex-1 flex-col ">
        <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
          <li>
            <ul role="list" className=" flex justify-center mx-auto  ">
              {nav?.map((item) => {
                const includesSlug = pathName
                  .toLocaleLowerCase()
                  .match(item.slug ? item.slug : "//");

                const IconComponent =
                  HeroIcons[item.icon as keyof typeof HeroIcons];
                const IconFillComponent =
                  HeroIconsSolid[item.icon as keyof typeof HeroIconsSolid];

                return (
                  <li key={item.name}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className={classNames(
                          includesSlug
                            ? " text-secondary"
                            : "text-gray-500 hover:text-secondary   ",
                          "group grid  py-1 px-3 text-[11px]  hover: transform transition-all duration-100 ease-in-out text-center font-medium"
                        )}
                      >
                        {!includesSlug ? (
                          <IconComponent
                            className={classNames(
                              includesSlug
                                ? " text-secondary   "
                                : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                              "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] "
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <IconFillComponent
                            className={classNames(
                              includesSlug
                                ? " text-secondary   "
                                : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                              "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] "
                            )}
                            aria-hidden="true"
                          />
                        )}
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
