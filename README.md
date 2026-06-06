# worksheetGenerator

Use `/tmp/workspace/bakerpdgit/worksheetGenerator/pdf-render-controls.js` in AI-generated worksheet HTML to allow user control of whitespace and line-break behavior before PDF rendering.

Example:

```html
<html data-pdf-white-space="pre-wrap" data-pdf-overflow-wrap="break-word" data-pdf-word-break="normal">
  <head>
    <script src="./pdf-render-controls.js"></script>
  </head>
  <body>
    <div data-pdf-text>Question text with user-provided spacing.</div>
  </body>
</html>
```

Users can override defaults with:
- root attributes (`data-pdf-white-space`, `data-pdf-overflow-wrap`, `data-pdf-word-break`)
- URL query params (`?pdfWhiteSpace=...&pdfOverflowWrap=...&pdfWordBreak=...`)
- `window.WorksheetPdfRenderOptions` before loading the script.