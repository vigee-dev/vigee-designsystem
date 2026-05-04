'use client';

import { Page } from 'react-pdf';
import { RotateCcw, RotateCw } from 'lucide-react';
import { PageSkeleton } from './states';

export interface PdfPageProps {
  pageNumber: number;
  width: number;
  rotation: number;
  showRotate: boolean;
  rotateLeftLabel: string;
  rotateRightLabel: string;
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

export function PdfPage({
  pageNumber,
  width,
  rotation,
  showRotate,
  rotateLeftLabel,
  rotateRightLabel,
  onRotateLeft,
  onRotateRight,
}: PdfPageProps) {
  return (
    <div className="group relative">
      {showRotate && (
        <div className="absolute -top-3 -right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white rounded-full shadow-lg border border-gray-200 p-1">
          <button
            type="button"
            onClick={onRotateLeft}
            aria-label={rotateLeftLabel}
            title={rotateLeftLabel}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRotateRight}
            aria-label={rotateRightLabel}
            title={rotateRightLabel}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-50"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="absolute -left-10 top-3 hidden lg:flex items-center justify-center w-7 h-7 rounded-full bg-gray-900/80 text-white text-xs font-medium">
        {pageNumber}
      </div>
      <div className="bg-white rounded-md shadow-xl shadow-gray-300/50 overflow-hidden ring-1 ring-gray-200">
        <Page
          pageNumber={pageNumber}
          width={width}
          rotate={rotation}
          loading={<PageSkeleton width={width} />}
          renderAnnotationLayer
          renderTextLayer
        />
      </div>
    </div>
  );
}
