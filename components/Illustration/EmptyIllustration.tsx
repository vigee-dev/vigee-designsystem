import Image from "next/image";
import Link from "next/link";
import { Button } from "../Buttons/Button";
import { Container } from "../Container/Container";
import emptyMan from "../../img/empty/empty-man.svg";
import { cn } from "../lib/utils";

interface IllustrationProps {
  text?: string;
  buttonLink?: string;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  supportEmail?: string;
  button?: boolean;
  className?: string;
}
export default function EmptyIllustration({ text, subtitle, buttonLink, buttonText, children, button = false, className }: IllustrationProps) {
  return (
    <Container className={cn("flex flex-col items-center justify-center  border-none bg-transparent w-full px-12 p-8", className)}>
      <Image width={400} height={400} className="mx-auto w-64 h-auto" src={emptyMan} alt="Empty list" />

      <h2 className={"text-lg text-gray-600 font-medium text-center pt-6 font-display"}>{text}</h2>
      <p className="text-gray-400 text-sm">{subtitle}</p>

      {!buttonLink && button && (
        <div className="text-sm text-gray-500  items-center text-center font-display pt-2">{buttonText ? <Button className="flex gap-x-2">{buttonText}</Button> : <Button icon="add" big />}</div>
      )}

      {buttonLink && (
        <Link className="text-sm text-gray-500  items-center text-center font-display pt-2" href={`${buttonLink}`}>
          {buttonText ? <Button className="flex gap-x-2">{buttonText}</Button> : <Button icon="add" big />}
        </Link>
      )}
      {children}
    </Container>
  );
}
