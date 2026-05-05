/**
 * @description Indicateur de chargement circulaire animé, à intégrer inline dans un bouton, une carte ou une zone de contenu.
 * @useWhen état de chargement local dans un bouton ou une carte → utiliser Spinner | remplacement d'un contenu en attente de données → utiliser Spinner
 * @dontUseFor chargement de page entière → utiliser LoaderPage | chargement global de l'application → utiliser Loader
 * @example <Spinner className="text-white" />
 */
export const Spinner = ({className}: { className?: string }) => {
  return <span className={`w-7 h-7 border-[5px]   animate-[spin_2s_linear_infinite]  border-t-[5px] border-t-solid border-t-primary  rounded-full transition-transform  ease-in-outout z-50 ${className}`} />;
};
