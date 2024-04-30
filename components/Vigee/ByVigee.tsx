import Link from "next/link";
import Image from "next/image";
import vigee from "../../img/logos/vigee.png";

interface ByVigeeProps {
  dark: boolean;
}

const ByVigee: React.FC<ByVigeeProps> = ({ dark }) => {
  return dark ? (
    <span className="text-slate-400 flex pt-8">
      <Link
        href="https://www.vigee.fr"
        target="_blank"
        className="text-slate-400 flex"
      >
        Developed by{" "}
        <Image
          src={vigee}
          width={70}
          height={20}
          alt="Vigee"
          className="pt-1 ml-2 "
        />
      </Link>
    </span>
  ) : (
    <span className="text-primary flex">
      <Link
        href="https://www.vigee.fr"
        target="_blank"
        className="text-primary flex"
      >
        Developed by{" "}
        <Image
          src={vigee}
          width={70}
          height={20}
          alt="Vigee"
          className="pt-1 ml-2 "
        />
      </Link>
    </span>
  );
};

export default ByVigee;
