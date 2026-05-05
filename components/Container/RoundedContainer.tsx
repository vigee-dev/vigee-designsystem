/**
 * @description Conteneur centré à fond blanc avec coins arrondis, ombre légère et padding généreux pour encadrer du contenu de page.
 * @useWhen wrapper d'une section principale de page nécessitant une délimitation visuelle → utiliser RoundedContainer | contenu centré avec largeur max (7xl) → utiliser RoundedContainer
 * @dontUseFor contenu pleine largeur sans contrainte max → utiliser Container | sections imbriquées légères → utiliser LineContainer
 * @example <RoundedContainer><UserForm /></RoundedContainer>
 */
interface Props {
  children: React.ReactNode;
}

export function RoundedContainer({ children }: Props) {
  return (
    <div className="bg-white rounded-md shadow-sm p-8 max-w-7xl justify-center mx-auto">
      {children}
    </div>
  );
}
