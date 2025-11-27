"use client";

import Image from "next/image";
import { HeaderDataProps } from "./type-sidebar";
import { ChevronsUpDown } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
type Props = {
  headerData: HeaderDataProps;
  logo?: string;
  logoSmall?: string;
};

const HeaderButtonSidebar = ({ headerData, logo, logoSmall }: Props) => {
  const { open } = useSidebar();

  const content = (
    <>
      <Image
        src={
          logo && logoSmall
            ? open
              ? logo
              : logoSmall
            : headerData.iconUrl || ""
        }
        alt="icon"
        width={120}
        height={120}
      />
      {!logo && (
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">{headerData.title}</span>
          {headerData?.subtitle && (
            <span className="">{headerData.subtitle}</span>
          )}
        </div>
      )}
      {headerData.type === "button" && <ChevronsUpDown className="ml-auto" />}
    </>
  );

  return (
    <>
      {" "}
      {headerData.type === "link" ? (
        <Link href={headerData.url}>{content}</Link>
      ) : (
        content
      )}
    </>
  );
};

export default HeaderButtonSidebar;
