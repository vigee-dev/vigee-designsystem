import Image, { StaticImageData } from "next/image";

interface IllustrationProps {
  title?: string;
  title2?: string;
  subtitle?: string;
  img?: StaticImageData;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}
export default function Illustration({
  title,
  title2,
  subtitle,
  img,
  children,
  width = 500,
  height = 500,
}: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-primary h-screen w-full px-12 ">
      {img && (
        <Image
          width={width}
          height={height}
          className={`mx-auto`}
          src={img}
          alt="LoginForm image"
        />
      )}
      <h1
        className={
          "text-5xl text-gray-300 font-black text-center pt-6 font-display"
        }
      >
        {title} <span className="text-white">{title2}</span>
      </h1>
      {subtitle && (
        <p className="text-xl text-slate-500   text-center font-display">
          {" "}
          {subtitle}{" "}
        </p>
      )}

      {children}
    </div>
  );
}
