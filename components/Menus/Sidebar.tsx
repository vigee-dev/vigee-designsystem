"use client";
import { useState, useEffect } from "react";
import img from "@/img/logos/logo.png";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as HeroIcons from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import VariableLogo from "../Logos/VariableLogo";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";
import SheetTriggered from "../Sheets/Sheet";

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
    icon?: string;
  }[];
  menu?: boolean;
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
          } grow flex-col gap-y-5 overflow-y-auto  pb-4 shadow-md transform transition-all duration-300 ease-in-out ${
            dark ? "bg-[#0E0E0E]" : "bg-white"
          } text-${text}`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between pt-4 w-full ">
            <div
              className={`justify-between mx-auto flex w-full ${
                isSmallScreen ? "px-4" : "px-1"
              }`}
            >
              <Link href={"/"}>
                {sidebarOpen ? (
                  logo ? (
                    <Image src={logo} alt="Vigee" width={60} height={50} />
                  ) : (
                    <VariableLogo title="Vigee" />
                  )
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
          <nav className="flex flex-1 flex-col w-full ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-0 items-center">
                  {navigation.map((item, index) => {
                    const IconComponent =
                      HeroIcons[item.icon as keyof typeof HeroIcons];
                    const IconFillComponent =
                      HeroIconsSolid[item.icon as keyof typeof HeroIconsSolid];

                    // Fonction pour déterminer la classe de base
                    const baseClass = `group flex gap-x-2 rounded-md p-[4px] leading-6 transform transition-all duration-100 ease-in-out items-center mx-1 my-1 mr-2 ${
                      isSmallScreen ? "text-lg" : "text-md"
                    }`;

                    // Fonction pour déterminer la classe de texte et de fond
                    const textAndBgClass = item.href
                      .toLocaleLowerCase()
                      .includes(slug)
                      ? isSmallScreen
                        ? "text-3xl p-2"
                        : "text-md bg-white/10 p-2"
                      : `px-2 ${
                          text === "white"
                            ? "text-gray-100 hover:text-white hover:bg-white/10"
                            : "text-gray-600 hover:text-primary hover:bg-black/10"
                        }`;

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
                            className={`${baseClass} ${textAndBgClass}`}
                          >
                            {item.href.toLocaleLowerCase().includes(slug) ||
                            hoveredIndex === index ? (
                              <IconFillComponent
                                className={classNames(
                                  `${
                                    text === "white"
                                      ? "text-white group-hover:text-white"
                                      : "text-primary group-hover:text-primary"
                                  }   group-hover:scale-105 transform transition-all duration-500 ease-in-out `,
                                  `h-${isSmallScreen ? "10" : "8"} w-${
                                    isSmallScreen ? "8" : "8"
                                  } shrink-0  my-auto ml-1 rounded-full p-[4px]`
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <IconComponent
                                className={classNames(
                                  `${
                                    text === "white"
                                      ? "text-white group-hover:text-white"
                                      : "text-primary group-hover:text-primary"
                                  } group-hover:scale-105 transform transition-all duration-500 ease-in-out`,
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
        } pt-2 md:py-2 bg-gray-50  h-full min-h-screen `}
      >
        <div className="   px-4 md:px-8 md:py-6 pb-24 ">
          {!sidebarOpen && (
            <div
              className="flex shrink-0 items-center justify-start md:justify-start "
              onClick={() => setSidebarOpen(true)}
            >
              {isSmallScreen && menu && (
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
