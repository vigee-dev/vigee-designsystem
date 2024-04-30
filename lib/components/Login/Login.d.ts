import { StaticImageData } from "next/image";
interface Props {
    logo: StaticImageData;
    clientName?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    callbackUrl?: string;
    noCopyright?: boolean;
    imageWidth?: number;
    imageHeight?: number;
}
export default function Login({ logo, clientName, variant, callbackUrl, noCopyright, imageWidth, imageHeight, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
