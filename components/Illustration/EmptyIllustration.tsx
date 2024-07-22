import Image from "next/image";
import Link from "next/link";
import { Button } from "../Buttons/Button";
import { Container } from "../Container/Container";
import emptyMan from "../../img/empty/empty-man.svg";

interface IllustrationProps {
  text?: string;
  buttonLink?: string;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  supportEmail?: string;
  button?: boolean;
}
export default function EmptyIllustration({ text, subtitle, buttonLink, buttonText, children, button = false }: IllustrationProps) {
  return (
    <Container className="flex flex-col items-center justify-center  w-full px-12 p-8">
      <Image width={400} height={400} className="mx-auto w-64 h-auto" src={emptyMan} alt="Empty list" />

      <h1 className={"text-xl text-gray-500 font-bold text-center pt-6 font-display"}>{text}</h1>
      <p className="text-gray-400">{subtitle}</p>

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
