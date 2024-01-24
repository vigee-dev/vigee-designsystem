"use client";
import { useState, useEffect, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import VariableLogo from "../Logos/VariableLogo";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  logo?: StaticImageData;
  background?: string;
  dark?: boolean;
  text?: string;
  children: React.ReactNode;
  noLogo?: boolean;
  navigation: {
    name: string;
    href: string;
    icon: React.ReactNode;
    iconFill?: React.ReactNode;
    slug: string;
  }[];
  menu?: boolean;
  logoSmall?: StaticImageData;
  title?: string;
  width?: number;
  height?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  children,
  noLogo,
  dark,
  background = `white`,
  text = `black`,
  logo,
  menu = false,
  logoSmall,
  title,
  width,
  height,
}: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverMenu, setHoverMenu] = useState(false);

  const router = usePathname();
  const slug = router;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={`hidden md:flex fixed inset-y-0 lg:flex ${
          sidebarOpen ? "w-56 z-10" : "w-16 z-10 "
        } flex-col h-screen transition-all ease-in-out duration-300`}
        onMouseEnter={() => setHoverMenu(true)}
        onMouseLeave={() => setHoverMenu(false)}
      >
        <div
          className={`${"flex px-3"} grow flex-col gap-y-5 overflow-y-auto  shadow-md transform transition-all duration-300 ease-in-out ${
            dark ? "bg-[#0E0E0E]" : "bg-white"
          } text-${text}`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between pt-4 w-full ">
            <div className={`justify-between mx-auto flex w-full px-1`}>
              <Link href={"/"}>
                {sidebarOpen && !noLogo ? (
                  logo ? (
                    <Image
                      src={logo}
                      alt="Vigee"
                      width={width ? width : 100}
                      height={height ? height : 60}
                    />
                  ) : (
                    <VariableLogo title="Vigee" />
                  )
                ) : !hoverMenu && !noLogo ? (
                  <Image
                    src={logoSmall ? logoSmall : VigeeGrayLogo}
                    alt="Vigee"
                    width={30}
                    height={30}
                  />
                ) : (
                  title &&
                  sidebarOpen && (
                    <p className="text-primary text-xl font-bold">{title}</p>
                  )
                )}
              </Link>
              {hoverMenu && !sidebarOpen && (
                <ChevronRightIcon
                  onClick={() => setSidebarOpen(true)}
                  className="w-12 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"
                />
              )}

              {hoverMenu && sidebarOpen && (
                <div className="flex shrink-0 items-center justify-left  cursor-pointer text-gray-400 hover:text-gray-800 pt-1 transform transition-all duration-300 ease-in-out">
                  <ChevronLeftIcon
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"
                  />
                </div>
              )}
            </div>
          </div>
          <nav className="flex flex-1 flex-col  ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-0 items-center">
                  {navigation.map((item, index) => {
                    // Fonction pour déterminer la classe de base
                    const baseClass = `group flex gap-x-2 rounded-md p-[3px] leading-6 transform transition-all duration-100 ease-in-out items-center mx-1 my-1  ${"text-md"}`;

                    // Fonction pour déterminer la classe de texte et de fond
                    const textAndBgClass = router.includes(item.slug)
                      ? `text-md  p-2  ${
                          text === "white"
                            ? "text-gray-100 text-white bg-white/10"
                            : "text-gray-600 text-primary bg-black/5"
                        }`
                      : `p-2 ${
                          text === "white"
                            ? "text-gray-100 hover:text-white hover:bg-white/10"
                            : "text-gray-600 hover:text-primary hover:bg-black/5"
                        }`;

                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`${baseClass} ${textAndBgClass}`}
                          >
                            {router.includes(item.slug) ||
                            hoveredIndex === index ? (
                              <div
                                className={classNames(
                                  `${
                                    text === "white"
                                      ? "text-white group-hover:text-white"
                                      : "text-primary group-hover:text-primary"
                                  }   group-hover:scale-105 transform transition-all duration-300 ease-in-out `,
                                  `h-${"8"} w-${"8"} shrink-0  my-auto ml-1 rounded-full p-[4px]`
                                )}
                                aria-hidden="true"
                              >
                                {item.iconFill ? item.iconFill : item.icon}
                              </div>
                            ) : (
                              <div
                                className={classNames(
                                  `${
                                    text === "white"
                                      ? "text-gray-500 group-hover:text-gray-500"
                                      : "text-gray-600 group-hover:text-gray-600"
                                  } group-hover:scale-105 transform transition-all duration-300 ease-in-out`,
                                  `h-${"8"} w-${"8"} shrink-0  my-auto ml-1  p-[5px]`
                                )}
                                aria-hidden="true"
                              >
                                {item.icon}
                              </div>
                            )}
                            {sidebarOpen && item.name}
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main
        className={`${
          sidebarOpen ? "lg:pl-56" : "lg:pl-16"
        } pt-2 md:py-2 bg-gray-50  h-full min-h-screen `}
      >
        <div className=" md:py-6 pb-24 ">
          {!sidebarOpen && (
            <div
              className="flex shrink-0 items-center justify-start md:justify-start "
              onClick={() => setSidebarOpen(true)}
            >
              {menu && (
                <p className=" mb-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 font-bold p-2 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer ">
                  Menu
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </main>
    </>
  );
};

export default Sidebar;
