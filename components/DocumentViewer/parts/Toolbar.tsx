'use client';

import {
  Download,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ViewableDocument } from '../types';

export interface ToolbarProps {
  doc: ViewableDocument;
  index: number;
  total: number;
  numPages: number | null;
  isImage: boolean;
  zoom: number;
  fitMode: 'fit' | 'manual';
  zoomMin: number;
  zoomMax: number;
  sizeLabel: string | null;
  showZoom: boolean;
  showDownload: boolean;
  labels: {
    close: string;
    download: string;
    zoomIn: string;
    zoomOut: string;
    fitWidth: string;
    pageCount: (n: number) => string;
  };
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onDownload: () => void;
}

export function Toolbar({
  doc,
  index,
  total,
  numPages,
  isImage,
  zoom,
  fitMode,
  zoomMin,
  zoomMax,
  sizeLabel,
  showZoom,
  showDownload,
  labels,
  onClose,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onDownload,
}: ToolbarProps) {
  const zoomLabel = fitMode === 'fit' ? 'Ajusté' : `${Math.round(zoom * 100)} %`;

  return (
    <div className="shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-4 py-3 flex items-center gap-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm text-gray-900 truncate">
            {doc.title || doc.name}
          </h2>
          <span className="shrink-0 text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">
            {index + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
          <span className="truncate max-w-[400px]">{doc.name}</span>
          {sizeLabel && <span>· {sizeLabel}</span>}
          {!isImage && numPages && <span>· {labels.pageCount(numPages)}</span>}
        </div>
      </div>

      {showZoom && !isImage && (
        <div className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-lg p-1">
          <ToolButton
            onClick={onZoomOut}
            label={labels.zoomOut}
            disabled={fitMode === 'manual' && zoom <= zoomMin}
          >
            <ZoomOut className="w-4 h-4" />
          </ToolButton>
          <button
            type="button"
            onClick={onResetZoom}
            className="px-2 h-8 min-w-[64px] text-xs font-medium text-gray-600 hover:text-primary rounded-md hover:bg-white transition-colors"
            title={labels.fitWidth}
          >
            {zoomLabel}
          </button>
          <ToolButton
            onClick={onZoomIn}
            label={labels.zoomIn}
            disabled={fitMode === 'manual' && zoom >= zoomMax}
          >
            <ZoomIn className="w-4 h-4" />
          </ToolButton>
          <div className="w-px h-5 bg-gray-200 mx-1" />
          <ToolButton onClick={onResetZoom} label={labels.fitWidth}>
            {fitMode === 'fit' ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </ToolButton>
        </div>
      )}

      <div className="flex items-center gap-1">
        {showDownload && (
          <ToolButton onClick={onDownload} label={labels.download} disabled={!doc.url}>
            <Download className="w-4 h-4" />
          </ToolButton>
        )}
        <ToolButton onClick={onClose} label={labels.close}>
          <X className="w-4 h-4" />
        </ToolButton>
      </div>
    </div>
  );
}

function ToolButton({
  children,
  onClick,
  label,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors',
        'text-gray-600 hover:text-primary hover:bg-white',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
      )}
    >
      {children}
    </button>
  );
}
