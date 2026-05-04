/**
 * Single document descriptor accepted by the viewer.
 *
 * Map your domain model (e.g. `AdherentDocument`, `SubscriptionDocument`,
 * `BrokerDocument`, ...) to this shape before passing it to the viewer.
 */
export interface ViewableDocument {
  /** Unique id used for keying and rotation callbacks. */
  id: string | number;
  /** Direct (signed) URL to the file. PDF or image. */
  url: string;
  /** Filename (used as the download name and as a fallback title). */
  name: string;
  /** Human-friendly title shown in the toolbar. Falls back to `name`. */
  title?: string | null;
  /**
   * MIME type. When starting with `image/`, the viewer renders an image
   * instead of a PDF. Optional — extension-based detection runs as fallback.
   */
  mimeType?: string | null;
  /** Size in bytes — displayed as `XX Ko` in the toolbar. */
  fileSize?: number | null;
  /**
   * Pre-existing rotations to restore (e.g. persisted server-side after a
   * previous edit). Each entry rotates a single page by `rotation` degrees.
   */
  initialRotations?: PageRotation[];
}

export interface PageRotation {
  /** 1-based page index. */
  page: number;
  /** Degrees: `0`, `90`, `180`, `270`. */
  rotation: number;
}

/** Full set of rotations for the active document, emitted by `onRotate`. */
export type RotationChange = PageRotation[];

/**
 * Toggle individual viewer features. Pass only the keys you want to override.
 * All features default to `true`.
 */
export interface DocumentViewerFeatures {
  /** Show zoom in/out buttons and respond to `+`/`-`/`0` keys. */
  zoom?: boolean;
  /** Show per-page rotation buttons (only effective when `onRotate` is provided). */
  rotate?: boolean;
  /** Show the download button. */
  download?: boolean;
  /** Enable global keyboard shortcuts (←, →, +, -, 0, Esc). */
  keyboard?: boolean;
  /** Show large left/right arrows to navigate between documents. */
  sideNavigation?: boolean;
}

/**
 * Visual customization. All values have sensible defaults; override only when
 * you need to align with a specific brand or layout constraint.
 */
export interface DocumentViewerAppearance {
  /** Maximum rendered page width in pixels. Default: `1100`. */
  maxPageWidth?: number;
  /** Pixels reserved above the drawer (visible overlay). Default: `24`. */
  topInset?: number;
  /** Top corner radius in pixels. Default: `32`. */
  cornerRadius?: number;
}

/**
 * UI strings — override for i18n. All keys are optional; missing keys fall
 * back to the French defaults bundled with the component.
 */
export interface DocumentViewerLabels {
  close?: string;
  download?: string;
  zoomIn?: string;
  zoomOut?: string;
  fitWidth?: string;
  rotateLeft?: string;
  rotateRight?: string;
  nextDocument?: string;
  previousDocument?: string;
  loading?: string;
  error?: string;
  unavailable?: string;
  /** Function returning the page count label, e.g. `(n) => `${n} pages``. */
  pageCount?: (numPages: number) => string;
}
