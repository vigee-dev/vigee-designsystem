/**
 * @description Affiche une image dans un conteneur stylisé (fond blanc, ombre, bordure) avec largeur max contrôlée.
 * @useWhen prévisualisation d'une image dans un DocumentViewer → utiliser ImageView | affichage d'un document image (PNG, JPG) avec contrainte de largeur → utiliser ImageView
 * @dontUseFor affichage d'avatar → utiliser Avatar | galerie ou liste d'images interactives → utiliser DataTable
 * @example <ImageView url="/docs/contrat.png" alt="Contrat signé" width={800} />
 */
'use client';

export interface ImageViewProps {
  url: string;
  alt: string;
  width: number;
}

export function ImageView({ url, alt, width }: ImageViewProps) {
  return (
    <div
      style={{ width }}
      className="bg-white rounded-md shadow-xl shadow-gray-300/50 ring-1 ring-gray-200 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        className="block w-full h-auto"
      />
    </div>
  );
}
