import VigeeLoaderTransparent from "../../img/logos/VigeeGrayLogo.png";
import Image, { StaticImageData } from "next/image";

interface Props {
  text?: String;
  logo?: StaticImageData;
  borderColor?: String;
}

export const Loader = ({ text, logo, borderColor }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 p-12">
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute h-28 w-28 border-2 ${
            borderColor ? borderColor : "border-gray-300"
          } rounded-full animate-spin border-t-transparent`}
        />

        <Image
          src={logo ? logo : VigeeLoaderTransparent}
          alt="logo"
          width={50}
          height={40}
          className="animate-pulse"
        />
      </div>
      <p className="text-primary-foreground text-sm">{text}</p>
    </div>
  );
};
