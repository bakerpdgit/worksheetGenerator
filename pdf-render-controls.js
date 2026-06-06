(() => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const body = document.body;
  const userOptions =
    typeof window !== 'undefined' && window.WorksheetPdfRenderOptions
      ? window.WorksheetPdfRenderOptions
      : {};
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  const defaults = {
    selector: '[data-pdf-text]',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordBreak: 'normal',
  };

  const options = {
    selector: userOptions.selector || defaults.selector,
    whiteSpace:
      query.get('pdfWhiteSpace') ||
      userOptions.whiteSpace ||
      root.getAttribute('data-pdf-white-space') ||
      (body && body.getAttribute('data-pdf-white-space')) ||
      defaults.whiteSpace,
    overflowWrap:
      query.get('pdfOverflowWrap') ||
      userOptions.overflowWrap ||
      root.getAttribute('data-pdf-overflow-wrap') ||
      (body && body.getAttribute('data-pdf-overflow-wrap')) ||
      defaults.overflowWrap,
    wordBreak:
      query.get('pdfWordBreak') ||
      userOptions.wordBreak ||
      root.getAttribute('data-pdf-word-break') ||
      (body && body.getAttribute('data-pdf-word-break')) ||
      defaults.wordBreak,
  };

  const style = document.createElement('style');
  style.setAttribute('data-pdf-render-controls', 'true');
  style.textContent = `
${options.selector} {
  white-space: ${options.whiteSpace};
  overflow-wrap: ${options.overflowWrap};
  word-break: ${options.wordBreak};
}
`;
  document.head.appendChild(style);
})();
