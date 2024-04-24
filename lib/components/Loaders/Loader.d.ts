import React from "react";
import { StaticImageData } from "next/image";
interface Props {
    text?: String;
    logo?: StaticImageData;
    borderColor?: String;
}
export declare const Loader: ({ text, logo, borderColor }: Props) => React.JSX.Element;
export {};
