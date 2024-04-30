import { StaticImageData } from "next/image";

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
  width,
  height,
}: IllustrationProps): import("react/jsx-runtime").JSX.Element;
export {};
