'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer as VaulDrawer } from 'vaul';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { cn } from '../lib/utils';
import { Toolbar } from './parts/Toolbar';
import { SideArrow } from './parts/SideArrow';
import { PdfView } from './parts/PdfView';
import { ImageView } from './parts/ImageView';
import { EmptyState } from './parts/states';
import type {
  DocumentViewerAppearance,
  DocumentViewerFeatures,
  DocumentViewerLabels,
  RotationChange,
  ViewableDocument,
} from './types';

if (
  typeof window !== 'undefined' &&
  typeof Promise.withResolvers === 'undefined'
) {
  // @ts-expect-error polyfill for older runtimes (pdf.js relies on it)
  window.Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.15;

const DEFAULT_LABELS: Required<DocumentViewerLabels> = {
  close: 'Fermer (Esc)',
  download: 'Télécharger',
  zoomIn: 'Zoom avant',
  zoomOut: 'Zoom arrière',
  fitWidth: 'Ajuster à la largeur',
  rotateLeft: 'Rotation antihoraire',
  rotateRight: 'Rotation horaire',
  nextDocument: 'Document suivant',
  previousDocument: 'Document précédent',
  loading: 'Chargement du document…',
  error: 'Impossible de charger le document',
  unavailable: 'Document indisponible',
  pageCount: (n) => `${n} page${n > 1 ? 's' : ''}`,
};

const DEFAULT_FEATURES: Required<DocumentViewerFeatures> = {
  zoom: true,
  rotate: true,
  download: true,
  keyboard: true,
  sideNavigation: true,
};

const DEFAULT_APPEARANCE: Required<DocumentViewerAppearance> = {
  maxPageWidth: 1100,
  topInset: 24,
  cornerRadius: 32,
};

export interface DocumentViewerProps {
  /** Documents to navigate through. Order is preserved. */
  documents: ViewableDocument[];
  /** Index of the document open on first render. Default: `0`. */
  initialIndex?: number;
  /** Controlled open state. */
  open: boolean;
  /** Called when the user closes the viewer (Esc, overlay click, X button). */
  onOpenChange: (open: boolean) => void;
  /**
   * Called whenever the user rotates a page. You typically persist the
   * rotations server-side and pass them back via `initialRotations`.
   */
  onRotate?: (doc: ViewableDocument, rotations: RotationChange) => void;
  /**
   * Override the default download behaviour (which fetches the URL and
   * triggers a browser download with `name` as filename).
   */
  onDownload?: (doc: ViewableDocument) => void;
  /** Called every time the active document changes. */
  onIndexChange?: (index: number, doc: ViewableDocument) => void;
  /** Toggle individual features. */
  features?: DocumentViewerFeatures;
  /** Visual customization. */
  appearance?: DocumentViewerAppearance;
  /** Override UI strings (i18n). */
  labels?: DocumentViewerLabels;
}

/**
 * Full-screen document viewer with vertical scroll, zoom, per-page rotation,
 * keyboard navigation and side arrows to jump between documents.
 *
 * Renders PDFs (via `react-pdf`) or images. Use it for any read-only
 * document preview across Vigee apps.
 *
 * @see ./README.md for full API reference, examples and integration notes.
 */
export function DocumentViewer({
  documents,
  initialIndex = 0,
  open,
  onOpenChange,
  onRotate,
  onDownload,
  onIndexChange,
  features,
  appearance,
  labels,
}: DocumentViewerProps) {
  const f = { ...DEFAULT_FEATURES, ...features };
  const a = { ...DEFAULT_APPEARANCE, ...appearance };
  const l = { ...DEFAULT_LABELS, ...labels };

  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState<'fit' | 'manual'>('fit');
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
  const [containerWidth, setContainerWidth] = useState(900);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const total = documents.length;
  const doc = documents[index];

  const isImage = useMemo(() => {
    if (!doc) return false;
    if (doc.mimeType?.startsWith('image/')) return true;
    const ext = doc.url?.split('?')[0].split('.').pop()?.toLowerCase();
    return (
      !!ext && ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext)
    );
  }, [doc]);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (doc && onIndexChange) onIndexChange(index, doc);
  }, [index, doc, onIndexChange]);

  useEffect(() => {
    setNumPages(null);
    const initial = (doc?.initialRotations ?? []).reduce<Record<number, number>>(
      (acc, item) => {
        acc[item.page] = ((item.rotation % 360) + 360) % 360;
        return acc;
      },
      {}
    );
    setPageRotations(initial);
    setZoom(1);
    setFitMode('fit');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [index, doc?.id]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  const zoomIn = useCallback(() => {
    setFitMode('manual');
    setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  }, []);

  const zoomOut = useCallback(() => {
    setFitMode('manual');
    setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setFitMode('fit');
  }, []);

  const rotatePage = useCallback(
    (page: number, direction: 1 | -1) => {
      setPageRotations((prev) => {
        const current = prev[page] ?? 0;
        const next = (((current + direction * 90) % 360) + 360) % 360;
        const updated = { ...prev, [page]: next };
        if (onRotate && doc) {
          const rotations = Object.entries(updated).map(([p, r]) => ({
            page: Number(p),
            rotation: r,
          }));
          onRotate(doc, rotations);
        }
        return updated;
      });
    },
    [onRotate, doc]
  );

  const handleDownload = useCallback(async () => {
    if (!doc?.url) return;
    if (onDownload) {
      onDownload(doc);
      return;
    }
    try {
      const res = await fetch(doc.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.title || doc.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    } catch (e) {
      console.error('[DocumentViewer] download failed', e);
    }
  }, [doc, onDownload]);

  useEffect(() => {
    if (!open || !f.keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === '+' || (e.key === '=' && !e.shiftKey)) {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, f.keyboard, goPrev, goNext, zoomIn, zoomOut, resetZoom, onOpenChange]);

  const pageWidth = useMemo(() => {
    const max = Math.min(containerWidth - 64, a.maxPageWidth);
    const base = Math.max(320, max);
    return fitMode === 'fit' ? base : base * zoom;
  }, [containerWidth, fitMode, zoom, a.maxPageWidth]);

  if (!doc) return null;

  const sizeLabel = doc.fileSize
    ? `${(doc.fileSize / 1024).toFixed(0)} Ko`
    : null;

  const showRotate = f.rotate && !!onRotate;

  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <VaulDrawer.Content
          style={{
            top: a.topInset,
            borderTopLeftRadius: a.cornerRadius,
            borderTopRightRadius: a.cornerRadius,
          }}
          className={cn(
            'fixed left-0 right-0 bottom-0 z-50 flex outline-none',
            'overflow-hidden shadow-2xl',
            'bg-gradient-to-br from-gray-50 to-gray-100'
          )}
        >
          <VaulDrawer.Title className="sr-only">
            {doc.title || doc.name}
          </VaulDrawer.Title>
          <VaulDrawer.Description className="sr-only">
            {l.loading}
          </VaulDrawer.Description>

          <div className="flex flex-col w-full h-full">
            <Toolbar
              doc={doc}
              index={index}
              total={total}
              numPages={numPages}
              isImage={isImage}
              zoom={zoom}
              fitMode={fitMode}
              zoomMin={ZOOM_MIN}
              zoomMax={ZOOM_MAX}
              sizeLabel={sizeLabel}
              showZoom={f.zoom}
              showDownload={f.download}
              labels={{
                close: l.close,
                download: l.download,
                zoomIn: l.zoomIn,
                zoomOut: l.zoomOut,
                fitWidth: l.fitWidth,
                pageCount: l.pageCount,
              }}
              onClose={() => onOpenChange(false)}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
              onDownload={handleDownload}
            />

            <div ref={measureRef} className="relative flex-1 overflow-hidden">
              {f.sideNavigation && (
                <>
                  <SideArrow
                    direction="left"
                    disabled={index === 0}
                    onClick={goPrev}
                    ariaLabel={l.previousDocument}
                    label={
                      index > 0
                        ? documents[index - 1].title ||
                          documents[index - 1].name
                        : null
                    }
                  />
                  <SideArrow
                    direction="right"
                    disabled={index === total - 1}
                    onClick={goNext}
                    ariaLabel={l.nextDocument}
                    label={
                      index < total - 1
                        ? documents[index + 1].title ||
                          documents[index + 1].name
                        : null
                    }
                  />
                </>
              )}

              <div
                ref={scrollRef}
                className="w-full h-full overflow-auto px-4 py-8 flex flex-col items-center gap-6"
              >
                {!doc.url ? (
                  <EmptyState message={l.unavailable} />
                ) : isImage ? (
                  <ImageView
                    url={doc.url}
                    alt={doc.title || doc.name}
                    width={pageWidth}
                  />
                ) : (
                  <PdfView
                    url={doc.url}
                    pageWidth={pageWidth}
                    rotations={pageRotations}
                    showRotate={showRotate}
                    loadingLabel={l.loading}
                    errorLabel={l.error}
                    rotateLeftLabel={l.rotateLeft}
                    rotateRightLabel={l.rotateRight}
                    onRotate={rotatePage}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  />
                )}
              </div>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
