# DocumentViewer

Full-screen document viewer for Vigee apps. Renders **PDFs** (all pages stacked vertically) and **images**, with zoom, per-page rotation, side-by-side navigation between documents and full keyboard support.

Use it for any read-only document preview: contracts, attestations, justificatifs, generated PDFs, scans, photos…

---

## Installation

The viewer lives in the design-system submodule. Once the submodule is up to date in your project, you can import it directly:

```tsx
import { DocumentViewer } from 'vigee-designsystem/components/DocumentViewer';
```

### Required peer dependencies

These must already be installed in the consuming app (none of them are bundled by the design system):

| Package | Why |
|---|---|
| `react` ≥ 18 | Component runtime |
| `react-pdf` ≥ 9 | PDF rendering |
| `vaul` ≥ 0.9 | Drawer primitive |
| `lucide-react` | Icons |
| `tailwindcss` | All styling is Tailwind classes |

The viewer references the Tailwind tokens `bg-primary`, `text-primary`, `bg-primary/10`, `border-primary`. Make sure your `tailwind.config` defines a `primary` color (the design-system preset already does).

---

## Quick start

```tsx
'use client';

import { useState } from 'react';
import { DocumentViewer } from 'vigee-designsystem/components/DocumentViewer';

const docs = [
  { id: 1, url: '/files/contract.pdf', name: 'contract.pdf', title: 'Contract 2025' },
  { id: 2, url: '/files/id-card.jpg',  name: 'id.jpg',       title: 'Identity card', mimeType: 'image/jpeg' },
];

export function MyPreview() {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <button onClick={() => { setIndex(0); setOpen(true); }}>
        Open viewer
      </button>

      <DocumentViewer
        documents={docs}
        initialIndex={index}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
```

That's it. Press `←` / `→` to switch documents, `+` / `-` to zoom, `0` to reset, `Esc` to close.

---

## API reference

### `<DocumentViewer />` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `documents` | `ViewableDocument[]` | **required** | Documents to navigate through. Order is preserved. |
| `initialIndex` | `number` | `0` | Index of the document to open first. |
| `open` | `boolean` | **required** | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | **required** | Called when the user closes the viewer. |
| `onRotate` | `(doc, rotations) => void` | — | Called when the user rotates a page. Persist server-side and replay via `initialRotations`. **When omitted, rotation buttons are hidden.** |
| `onDownload` | `(doc) => void` | built-in `fetch + blob` download | Override download behaviour (logging, signed URLs, etc.). |
| `onIndexChange` | `(index, doc) => void` | — | Fires whenever the active document changes. |
| `features` | `DocumentViewerFeatures` | all `true` | Toggle individual features — see below. |
| `appearance` | `DocumentViewerAppearance` | sensible defaults | Visual customization — see below. |
| `labels` | `DocumentViewerLabels` | French | Override UI strings (i18n) — see below. |

### `ViewableDocument`

Map your domain model to this shape before passing it in.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string \| number` | ✅ | Unique id (used for keying and rotation callbacks). |
| `url` | `string` | ✅ | Direct (signed) URL to the file. PDF or image. |
| `name` | `string` | ✅ | Filename (used for download and as title fallback). |
| `title` | `string \| null` | — | Display name in the toolbar. Falls back to `name`. |
| `mimeType` | `string \| null` | — | When starting with `image/`, image renderer is used. Extension fallback if omitted. |
| `fileSize` | `number \| null` | — | Bytes — shown as `XX Ko` in the toolbar. |
| `initialRotations` | `{ page, rotation }[]` | — | Pre-applied rotations (e.g. previously persisted edits). |

### `DocumentViewerFeatures`

```ts
{
  zoom?: boolean;             // default true
  rotate?: boolean;           // default true (only effective with onRotate)
  download?: boolean;         // default true
  keyboard?: boolean;         // default true
  sideNavigation?: boolean;   // default true
}
```

### `DocumentViewerAppearance`

```ts
{
  maxPageWidth?: number;   // default 1100  — max rendered page width in px
  topInset?: number;       // default 24    — gap above the drawer (overlay click area)
  cornerRadius?: number;   // default 32    — top corner radius in px
}
```

### `DocumentViewerLabels`

All keys optional — missing keys fall back to the French defaults.

```ts
{
  close, download, zoomIn, zoomOut, fitWidth,
  rotateLeft, rotateRight, nextDocument, previousDocument,
  loading, error, unavailable,
  pageCount: (numPages) => string,
}
```

---

## Examples

### Single document

```tsx
<DocumentViewer
  documents={[{ id: 'one', url, name: 'attestation.pdf' }]}
  initialIndex={0}
  open={open}
  onOpenChange={setOpen}
/>
```

The side arrows automatically hide when there is nothing to navigate to.

### Persisted rotations

The viewer is stateless about rotations between sessions: it emits the new full rotation set every time the user clicks a rotate button. Persist them, then replay via `initialRotations` next time the viewer opens.

```tsx
<DocumentViewer
  documents={docs.map((d) => ({ ...d, initialRotations: d.rotations ?? [] }))}
  open={open}
  onOpenChange={setOpen}
  onRotate={(doc, rotations) =>
    api.rotateDocument({ id: doc.id, rotations })
  }
/>
```

### Open viewer on a specific document from a list

```tsx
const handlePreview = (clickedId) => {
  const idx = docs.findIndex((d) => d.id === clickedId);
  setIndex(idx);
  setOpen(true);
};
```

### Mapping a domain type

```ts
import type { ViewableDocument } from 'vigee-designsystem/components/DocumentViewer';
import type { AdherentDocument } from '@/types';

export const toViewable = (d: AdherentDocument): ViewableDocument => ({
  id: d.id,
  url: d.url,
  name: d.name,
  title: d.title,
  mimeType: d.mime_type,
  fileSize: d.file_size,
});
```

### Disable features

```tsx
<DocumentViewer
  documents={docs}
  open={open}
  onOpenChange={setOpen}
  features={{ rotate: false, download: false }}
/>
```

### English labels

```tsx
<DocumentViewer
  documents={docs}
  open={open}
  onOpenChange={setOpen}
  labels={{
    close: 'Close (Esc)',
    download: 'Download',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    fitWidth: 'Fit to width',
    nextDocument: 'Next document',
    previousDocument: 'Previous document',
    loading: 'Loading…',
    error: 'Failed to load document',
    unavailable: 'Document unavailable',
    pageCount: (n) => `${n} page${n > 1 ? 's' : ''}`,
  }}
/>
```

### Custom download (with logging or signed URL refresh)

```tsx
<DocumentViewer
  documents={docs}
  open={open}
  onOpenChange={setOpen}
  onDownload={async (doc) => {
    track('document_downloaded', { id: doc.id });
    const fresh = await api.refreshSignedUrl(doc.id);
    window.location.href = fresh;
  }}
/>
```

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `←` | Previous document |
| `→` | Next document |
| `+` / `=` | Zoom in |
| `-` | Zoom out |
| `0` | Reset to fit-width |
| `Esc` | Close |

Shortcuts are ignored when focus is in an `<input>` or `<textarea>`. Disable them entirely with `features={{ keyboard: false }}`.

---

## Behavior notes

- **PDF detection** — anything with `mimeType` starting with `image/` is rendered as an image. Otherwise, the URL extension is checked (`png/jpg/jpeg/gif/webp/bmp/svg`). The default is PDF.
- **All pages at once** — PDFs are rendered with all pages stacked vertically. There is no per-page navigation; you scroll.
- **Rotation visibility** — per-page rotate buttons appear on hover, only when `onRotate` is provided AND `features.rotate` is `true`.
- **Side arrows** — automatically hidden at the boundaries (no previous/next document).
- **Drawer dismiss** — click the dimmed overlay above the drawer or press Esc. The X button in the toolbar also works.

---

## Limitations / FAQ

**Q: The PDF worker tries to load from a CDN. Can I self-host it?**
Yes. Override `pdfjs.GlobalWorkerOptions.workerSrc` before mounting the viewer. The component sets a default UNPKG URL but does not lock you in.

**Q: Why not virtualize pages for very large PDFs?**
Right now all pages render eagerly. For 100+ page documents you may see a brief load. If this becomes a problem, we'll add windowed rendering — open an issue.

**Q: Can I show thumbnails like Acrobat?**
No — by design. We chose continuous vertical scroll for simplicity and modern feel. Thumbnails could be added behind a `features.thumbnails` flag if needed.

**Q: Does it work with non-PDF/image files (DOCX, XLSX)?**
No. Convert server-side first (e.g. via libreoffice/headless PDF) and pass the resulting PDF URL.

---

## Versioning

Breaking changes will bump the design-system minor version. Stable since `vigee-designsystem@1.5.0`.
