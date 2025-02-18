import Image from "next/image";
import { HeaderDataProps } from "./type-sidebar";
import { ChevronsUpDown } from "lucide-react";

type Props = {
  headerData: HeaderDataProps;
  logo?: string;
};

const HeaderButtonSidebar = ({ headerData, logo }: Props) => {
  const content = (
    <>
      <Image src={logo ? logo : headerData.iconUrl} alt="icon" width={120} height={120} />
      {!logo && (
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">{headerData.title}</span>
          {headerData?.subtitle && <span className="">{headerData.subtitle}</span>}
        </div>
      )}
      {headerData.type === "button" && <ChevronsUpDown className="ml-auto" />}
    </>
  );

  return <> {headerData.type === "link" ? <a href={headerData.url}>{content}</a> : content}</>;
};

export default HeaderButtonSidebar;
