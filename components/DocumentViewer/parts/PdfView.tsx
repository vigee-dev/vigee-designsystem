'use client';

import { useState } from 'react';
import { Document } from 'react-pdf';
import { LoadingState, EmptyState } from './states';
import { PdfPage } from './PdfPage';

export interface PdfViewProps {
  url: string;
  pageWidth: number;
  rotations: Record<number, number>;
  showRotate: boolean;
  loadingLabel: string;
  errorLabel: string;
  rotateLeftLabel: string;
  rotateRightLabel: string;
  onRotate: (page: number, direction: 1 | -1) => void;
  onLoadSuccess: (info: { numPages: number }) => void;
}

export function PdfView({
  url,
  pageWidth,
  rotations,
  showRotate,
  loadingLabel,
  errorLabel,
  rotateLeftLabel,
  rotateRightLabel,
  onRotate,
  onLoadSuccess,
}: PdfViewProps) {
  const [pages, setPages] = useState<number>(0);

  return (
    <Document
      file={url}
      onLoadSuccess={(info) => {
        setPages(info.numPages);
        onLoadSuccess(info);
      }}
      loading={<LoadingState label={loadingLabel} />}
      error={<EmptyState message={errorLabel} />}
      className="flex flex-col items-center gap-6"
    >
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <PdfPage
          key={`${url}-${p}`}
          pageNumber={p}
          width={pageWidth}
          rotation={rotations[p] ?? 0}
          showRotate={showRotate}
          rotateLeftLabel={rotateLeftLabel}
          rotateRightLabel={rotateRightLabel}
          onRotateLeft={() => onRotate(p, -1)}
          onRotateRight={() => onRotate(p, 1)}
        />
      ))}
    </Document>
  );
}
