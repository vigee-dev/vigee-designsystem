'use client';

export interface ImageViewProps {
  url: string;
  alt: string;
  width: number;
}

export function ImageView({ url, alt, width }: ImageViewProps) {
  return (
    <div className="bg-white rounded-md shadow-xl shadow-gray-300/50 ring-1 ring-gray-200 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        style={{ maxWidth: width }}
        className="block w-full h-auto"
      />
    </div>
  );
}
