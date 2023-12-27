"use client";
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
  title?: string | undefined;
  subtitle?: string | undefined;
  buttonTitle?: string;
  buttonLink?: string;
  nav?: MenuItem[];
  route?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  buttonTitle,
  buttonLink,
  nav,
  route,
}: TabProps) {
  const pathName = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {title && <p className={"text-gray-700 text-3xl font-bold"}>{title}</p>}
      {subtitle && (
        <p className={"text-gray-400 text-md font-medium"}>{subtitle}</p>
      )}
      <div className="relative  mb-6 ">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            {buttonTitle && buttonLink && (
              <Link href={buttonLink ? buttonLink : ""}>
                <Button>{buttonTitle}</Button>
              </Link>
            )}
          </div>
        </div>
        <div className="-ml-4 md:-ml-0 ">
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
                        HeroIconsSolid[
                          item.icon as keyof typeof HeroIconsSolid
                        ];

                      return (
                        <li key={item.name}>
                          {item.href && (
                            <Link
                              href={item.href}
                              className={classNames(
                                includesSlug
                                  ? "font-bold text-primary"
                                  : "text-gray-500 hover:text-secondary  font-bold ",
                                "group grid  p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center "
                              )}
                            >
                              {!includesSlug ? (
                                <IconComponent
                                  className={classNames(
                                    includesSlug
                                      ? " text-primary   "
                                      : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                                    "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] "
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <IconFillComponent
                                  className={classNames(
                                    includesSlug
                                      ? " text-primary   "
                                      : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                                    "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] "
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

          <div className="hidden md:block ">
            <nav className="-mb-px flex space-x-4">
              {nav?.map((tab, index) => {
                const includesSlug = pathName
                  .toLocaleLowerCase()
                  .match(tab.slug ? tab.slug : "//");

                const IconComponent =
                  HeroIcons[tab.icon as keyof typeof HeroIcons];
                const IconFillComponent =
                  HeroIconsSolid[tab.icon as keyof typeof HeroIconsSolid];

                return (
                  <Link
                    key={tab.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    href={`${route}/${tab.slug}`}
                    className={classNames(
                      includesSlug
                        ? "font-bold text-secondary"
                        : "text-gray-500 hover:text-secondary  font-bold ",
                      "group   p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center inline-flex gap-x-2 text-lg items-center"
                    )}
                  >
                    {tab.icon && (includesSlug || hoveredIndex === index) ? (
                      <IconFillComponent
                        className={classNames(
                          includesSlug
                            ? " text-secondary   "
                            : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                          "h-6 w-6 shrink-0 mx-auto justify-center    "
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      tab.icon && (
                        <IconComponent
                          className={classNames(
                            includesSlug
                              ? " text-secondary   "
                              : " hover:text-secondary  transform transition-all duration-300 ease-in-out ",
                            "h-6 w-6 shrink-0 mx-auto justify-center   "
                          )}
                          aria-hidden="true"
                        />
                      )
                    )}

                    {tab.color && (
                      <svg
                        className={`h-1.5 w-1.5 fill-${tab.color}`}
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle className="animate-pulse" cx={3} cy={3} r={3} />
                      </svg>
                    )}
                    {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
