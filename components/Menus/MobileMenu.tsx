/**
 * @description Barre de navigation mobile fixée en bas d'écran (max 4 items + 1 bouton central), avec highlight automatique selon l'URL active.
 * @useWhen navigation principale sur mobile avec 2 à 4 sections → utiliser MobileMenu | ajout d'un bouton d'action central (ex: créer) entre les items de nav → passer `buttonComponent` | remplacement du Sidebar sur petits écrans → utiliser MobileMenu en complément de AppSidebar.
 * @dontUseFor navigation desktop → utiliser AppSidebar | plus de 4 items de navigation → utiliser Sidebar | menus contextuels ou actions secondaires → utiliser DropdownMenu.
 * @example <MobileMenu nav={[{ name: "Accueil", href: "/", slug: "accueil", icon: <HomeIcon />, iconFill: <HomeIconFill /> }]} buttonComponent={<ButtonAdd onClick={handleCreate} />} />
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface MenuItem {
  name: string;
  slug?: string;
  href?: string;
  color?: string;
  icon?: React.ReactNode;
  iconFill?: React.ReactNode;
}

interface TabProps {
  nav?: MenuItem[];
  buttonComponent?: React.ReactNode;
}

function MobileMenu({ nav, buttonComponent }: TabProps) {
  const pathName = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto bg-white shadow-xl z-40 border-t border-slate-200 pb-6 w-screen">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul
              role="list"
              className={`grid  gap-x-4 ${buttonComponent ? "grid-cols-5" : "grid-cols-4"}`}
            >
              {nav?.slice(0, 2).map((item) => {
                const includesSlug = pathName
                  .toLocaleLowerCase()
                  .match(item.slug ? item.slug : "//");
                return (
                  <li key={item.name}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className={classNames(
                          includesSlug
                            ? "text-primary"
                            : "text-gray-500 hover:text-primary",
                          "group grid py-1 px-3 text-[11px] hover:transform transition-all duration-100 ease-in-out text-center font-medium"
                        )}
                      >
                        {!includesSlug ? (
                          <div
                            className={classNames(
                              includesSlug
                                ? "text-primary"
                                : "hover:text-primary transform transition-all duration-300 ease-in-out",
                              "h-8 w-8 shrink-0 mx-auto justify-center p-[5px]"
                            )}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                        ) : (
                          <div
                            className={classNames(
                              includesSlug
                                ? "text-primary"
                                : "hover:text-primary transform transition-all duration-300 ease-in-out",
                              "h-8 w-8 shrink-0 mx-auto justify-center p-[5px]"
                            )}
                            aria-hidden="true"
                          >
                            {item.iconFill}
                          </div>
                        )}
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
              {buttonComponent && (
                <li className="col-span-1 mx-auto">{buttonComponent}</li>
              )}
              {nav?.slice(2, 4).map((item) => {
                const includesSlug = pathName
                  .toLocaleLowerCase()
                  .match(item.slug ? item.slug : "//");
                return (
                  <li key={item.name}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className={classNames(
                          includesSlug
                            ? "text-primary"
                            : "text-gray-500 hover:text-primary",
                          "group grid py-1 px-3 text-[11px] hover:transform transition-all duration-100 ease-in-out text-center font-medium"
                        )}
                      >
                        {!includesSlug ? (
                          <div
                            className={classNames(
                              includesSlug
                                ? "text-primary"
                                : "hover:text-primary transform transition-all duration-300 ease-in-out",
                              "h-8 w-8 shrink-0 mx-auto justify-center p-[5px]"
                            )}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                        ) : (
                          <div
                            className={classNames(
                              includesSlug
                                ? "text-primary"
                                : "hover:text-primary transform transition-all duration-300 ease-in-out",
                              "h-8 w-8 shrink-0 mx-auto justify-center p-[5px]"
                            )}
                            aria-hidden="true"
                          >
                            {item.iconFill}
                          </div>
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
