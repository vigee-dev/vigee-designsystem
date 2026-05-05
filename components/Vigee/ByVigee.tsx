/**
 * @description Mention "Developed by Vigee" cliquable avec logo, en version claire ou sombre, à placer en pied de page ou d'écran de connexion.
 * @useWhen bas de page d'une app Vigee → créditer l'éditeur | écran de login ou splash screen → afficher la signature Vigee en dark | footer de sidebar → intégrer la mention dans un contexte sombre ou clair
 * @dontUseFor logo principal de l'app → utiliser VariableLogo | écran de chargement → utiliser SplashScreen
 * @example <ByVigee dark={true} />
 */
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
