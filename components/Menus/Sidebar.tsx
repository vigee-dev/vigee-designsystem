"use client";
import { useState, useEffect } from "react";
import img from "@/img/logos/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as HeroIcons from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PowerIcon,
  ArrowBigLeft,
  ArrowLeftIcon,
  ArrowLeftFromLine,
} from "lucide-react";
import VariableLogo from "../Logos/VariableLogo";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";
// import { signout } from "@/app/lib/auth/signout";
import { Button } from "../ui/button";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  children: React.ReactNode;
  noLogo?: boolean;
  navigation: {
    name: string;
    href: string;
    icon?: string;
  }[];
  navigationDown: {
    name: string;
    href: string;
    icon?: string;
  }[];
  mobileNavigation?: {
    name: string;
    href: string;
    icon?: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  navigationDown,
  mobileNavigation,
  children,
  noLogo,
}: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);

  const router = usePathname();
  const slug = router.split("/")[2];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSidebarOpen(false);
        setIsSmallScreen(true);
        setHoverMenu(true);
      } else {
        setIsSmallScreen(false);
        setSidebarOpen(true); // Ajoutez cette ligne pour réouvrir le menu
      }
    };

    // Check initial size
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Static sidebar for desktop */}
      <div
        className={`flex fixed inset-y-0 lg:flex ${
          isSmallScreen && sidebarOpen
            ? "w-screen z-50"
            : sidebarOpen
            ? "w-56 z-10"
            : isSmallScreen
            ? "w-0 z-10"
            : "w-16 z-10"
        } flex-col h-screen transition-all ease-in-out duration-300`}
        onMouseEnter={() => setHoverMenu(true)}
        onMouseLeave={() => setHoverMenu(false)}
      >
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div
          className={`${
            !isSmallScreen
              ? "flex pl-4 px-2"
              : sidebarOpen
              ? "flex pl-4"
              : "flex"
          } grow flex-col gap-y-5 overflow-y-auto  bg-white   pb-4 shadow-md transform transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between pt-4 w-full">
            <div
              className={`justify-between mx-auto flex w-full ${
                isSmallScreen ? "px-4" : "px-1"
              }`}
            >
              <Link href={"/"}>
                {sidebarOpen ? (
                  <VariableLogo title="Vigee" />
                ) : !hoverMenu ? (
                  <Image
                    src={VigeeGrayLogo}
                    alt="Vigee"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    src={VigeeGrayLogo}
                    alt="Vigee"
                    width={0}
                    height={0}
                    className="hidden"
                  />
                )}
              </Link>
              {hoverMenu && !isSmallScreen && !sidebarOpen && (
                <ChevronRightIcon
                  onClick={() => setSidebarOpen(true)}
                  className="w-12 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"
                />
              )}
              {hoverMenu && !isSmallScreen && !sidebarOpen && (
                <ChevronRightIcon
                  onClick={() => setSidebarOpen(true)}
                  className="w-12 mb-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"
                />
              )}
              {isSmallScreen && (
                <div className="flex shrink-0 items-center justify-left  cursor-pointer text-gray-400 hover:text-gray-800 pt-1 transform transition-all duration-300 ease-in-out">
                  <ChevronLeftIcon
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"
                  />
                </div>
              )}
            </div>
          </div>
          <nav className="flex flex-1 flex-col w-full">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-0 items-center">
                  {navigation.map((item, index) => {
                    const IconComponent =
                      HeroIcons[item.icon as keyof typeof HeroIcons];
                    const IconFillComponent =
                      HeroIconsSolid[item.icon as keyof typeof HeroIconsSolid];

                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <li key={item.name}>
                          <Link
                            onClick={() =>
                              isSmallScreen ? setSidebarOpen(false) : {}
                            }
                            href={item.href}
                            className={classNames(
                              item.href.toLocaleLowerCase().includes(slug)
                                ? `text-primary  ${
                                    isSmallScreen
                                      ? "text-3xl font-bold"
                                      : "text-md text-gray-600 font-bold"
                                  }`
                                : "text-gray-600 hover:font-bold hover:text-primary",
                              `group flex gap-x-2 rounded-md p-[4px] leading-6  transform transition-all duration-100 ease-in-out items-center ${
                                isSmallScreen
                                  ? "text-lg  "
                                  : "text-md text-gray-600"
                              }`
                            )}
                          >
                            {item.href.toLocaleLowerCase().includes(slug) ||
                            hoveredIndex === index ? (
                              <IconFillComponent
                                className={classNames(
                                  "text-primary group-hover:text-primary  group-hover:scale-105 transform transition-all duration-500 ease-in-out ",
                                  `h-${isSmallScreen ? "10" : "8"} w-${
                                    isSmallScreen ? "8" : "8"
                                  } shrink-0  my-auto ml-1 rounded-full p-[4px]`
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <IconComponent
                                className={classNames(
                                  " group-hover:text-primary group-hover:scale-105 transform transition-all duration-500 ease-in-out",
                                  `h-${isSmallScreen ? "9" : "8"} w-${
                                    isSmallScreen ? "8" : "8"
                                  } shrink-0  my-auto ml-1  p-[5px]`
                                )}
                                aria-hidden="true"
                              />
                            )}
                            {sidebarOpen && item.name}
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </li>

              {/* <form action={signout} className="absolute bottom-4 ">
                <Button className="group bg-transparent text-md font-display text-gray-600 hover:font-bold hover:text-primary hover:bg-transparent flex gap-x-2 rounded-md p-[4px] leading-6  transform transition-all duration-100 ease-in-out items-center  ">
                  <PowerIcon
                    className={classNames(
                      " group-hover:text-primary group-hover:scale-105 transform transition-all duration-500 ease-in-out",
                      `h-${isSmallScreen ? "10" : "8"} w-${
                        isSmallScreen ? "10" : "8"
                      } shrink-0  my-auto ml-1  p-[5px]`
                    )}
                    aria-hidden="true"
                  />
                  <div className="hidden md:block font-display">
                    Déconnexion
                  </div>
                </Button>
              </form> */}
            </ul>
          </nav>
        </div>
      </div>

      <main
        className={`${
          sidebarOpen ? "lg:pl-56" : "lg:pl-16"
        } pt-2 md:py-2 bg-backgroundGray  h-full min-h-screen `}
      >
        <div className="   px-4 md:px-8 md:py-6 pb-24 ">
          {!sidebarOpen && (
            <div
              className="flex shrink-0 items-center justify-start md:justify-start "
              onClick={() => setSidebarOpen(true)}
            >
              {isSmallScreen && (
                <ArrowLeftFromLine className="h-8 w-8 mb-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 font-bold p-2 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer " />
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
