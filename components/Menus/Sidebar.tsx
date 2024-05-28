"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import VariableLogo from "../Logos/VariableLogo";
import { Badge } from "../ui/badge";
import { Select } from "../Select/Select";
import { cn } from "../lib/utils";
import { Button } from "../Buttons/Button";

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
    highlight?: boolean;
    notifications?: number;
  }[];
  menu?: boolean;
  logoSmall?: StaticImageData;
  title?: string;
  width?: number;
  height?: number;
  withSelect?: boolean;
  selectOptions?: { value: string; label: string }[];
  onChangeSelect?: (selected: string) => void;
  classNameSelect?: string;
  selectPlaceHolder?: string;
  defaultValueSelect?: string;
  bgColor?: string;
  className?: string;
  logout?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  children,
  noLogo,
  text = `black`,
  logo,
  menu = false,
  logoSmall,
  title,
  width,
  height,
  withSelect,
  selectOptions,
  onChangeSelect,
  classNameSelect,
  selectPlaceHolder,
  defaultValueSelect,
  className,
  logout = false,
}: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverMenu, setHoverMenu] = useState(false);
  const router = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const options = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
  ];

  return (
    <>
      <div
        className={`hidden md:flex fixed inset-y-0 lg:flex ${
          sidebarOpen ? "w-56 " : "w-16  "
        } flex-col h-screen transition-all ease-in-out duration-300`}
        onMouseEnter={() => setHoverMenu(true)}
        onMouseLeave={() => setHoverMenu(false)}
      >
        <div
          className={cn(
            `${"flex px-3"} grow flex-col gap-y-5 overflow-y-auto  shadow-md transform transition-all duration-300 ease-in-out bg-white`,
            className
          )}
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
                  logoSmall && (
                    <Image src={logoSmall} alt="Vigee" width={30} height={30} />
                  )
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
                {withSelect &&
                  selectOptions &&
                  onChangeSelect &&
                  selectOptions.length > 0 &&
                  sidebarOpen && (
                    <div className="flex w-full py-2 ">
                      <Select
                        options={selectOptions}
                        onChange={e => {
                          if (e === undefined) return;
                          onChangeSelect(e);
                        }}
                        placeholder={selectPlaceHolder}
                        className={classNameSelect}
                        defaultValue={
                          defaultValueSelect ?? selectOptions[0]?.value ?? ""
                        }
                      />
                    </div>
                  )}

                <ul role="list" className="-mx-2 space-y-0 items-center">
                  {navigation.map((item, index) => {
                    // Fonction pour déterminer la classe de base
                    const baseClass = item.highlight
                      ? `group flex gap-x-2 rounded-md p-[3px] text-primary  leading-6 transform transition-all bg-white border border-gray-200  duration-100 ease-in-out items-center mx-1 my-1  shadow-sm hover:scale-105 ${"text-md"} `
                      : `group flex gap-x-2 rounded-md p-[3px] leading-6 transform transition-all duration-100 ease-in-out items-center mx-1 my-1  ${"text-md"}`;

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
                            prefetch
                            href={item.href}
                            className={`${baseClass} ${textAndBgClass}`}
                          >
                            <div className="flex justify-between w-full pr-2">
                              <div className="flex items-center gap-x-2">
                                {router.includes(item.slug) ||
                                hoveredIndex === index ||
                                item.highlight ? (
                                  <div
                                    className={classNames(
                                      `${
                                        text === "white"
                                          ? "text-secondary group-hover:text-secondary"
                                          : "text-primary group-hover:text-primary"
                                      }   group-hover:scale-105  transform transition-all duration-300 ease-in-out `,
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
                                      } group-hover:scale-105  transform transition-all duration-300 ease-in-out `,
                                      `h-${"8"} w-${"8"} shrink-0  my-auto ml-1  p-[5px] `
                                    )}
                                    aria-hidden="true"
                                  >
                                    {item.icon}
                                  </div>
                                )}
                                {sidebarOpen && item.name}
                              </div>
                              {item?.notifications && (
                                <div className="flex items-center">
                                  <Badge className="bg-red-400 text-white opacity-90 p-1 w-[20px] h-[20px] items-center flex justify-center hover:text-white">
                                    {item?.notifications}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </li>
            </ul>

            {logout && (
              <div className="my-2 flex justify-start">
                <Button iconLeft="logout" className="font-medium">
                  Déconnexion
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>

      <main
        className={`${
          sidebarOpen ? "lg:pl-56" : "lg:pl-16"
        } pt-2 md:py-2 bg-gray-50  h-full min-h-screen `}
      >
        <div className=" md:py-2 pb-24 ">
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
