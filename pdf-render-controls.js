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

  const allowedValues = {
    whiteSpace: new Set([
      'normal',
      'nowrap',
      'pre',
      'pre-wrap',
      'pre-line',
      'break-spaces',
    ]),
    overflowWrap: new Set(['normal', 'break-word', 'anywhere']),
    wordBreak: new Set(['normal', 'break-all', 'keep-all', 'break-word']),
  };

  const pickAllowedValue = (key, value) =>
    allowedValues[key].has(value) ? value : defaults[key];

  const sanitizeSelector = (selector) =>
    typeof selector === 'string' &&
    selector.trim() &&
    !/[{};]/.test(selector) &&
    selector.length <= 200
      ? selector
      : defaults.selector;

  const options = {
    selector: sanitizeSelector(userOptions.selector || defaults.selector),
    whiteSpace: pickAllowedValue(
      'whiteSpace',
      query.get('pdfWhiteSpace') ||
        userOptions.whiteSpace ||
        root.getAttribute('data-pdf-white-space') ||
        (body && body.getAttribute('data-pdf-white-space')) ||
        defaults.whiteSpace
    ),
    overflowWrap: pickAllowedValue(
      'overflowWrap',
      query.get('pdfOverflowWrap') ||
        userOptions.overflowWrap ||
        root.getAttribute('data-pdf-overflow-wrap') ||
        (body && body.getAttribute('data-pdf-overflow-wrap')) ||
        defaults.overflowWrap
    ),
    wordBreak: pickAllowedValue(
      'wordBreak',
      query.get('pdfWordBreak') ||
        userOptions.wordBreak ||
        root.getAttribute('data-pdf-word-break') ||
        (body && body.getAttribute('data-pdf-word-break')) ||
        defaults.wordBreak
    ),
  };

  const applyTextStyles = () => {
    let nodes;
    try {
      nodes = document.querySelectorAll(options.selector);
    } catch (_error) {
      nodes = document.querySelectorAll(defaults.selector);
    }

    nodes.forEach((node) => {
      node.style.whiteSpace = options.whiteSpace;
      node.style.overflowWrap = options.overflowWrap;
      node.style.wordBreak = options.wordBreak;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTextStyles, { once: true });
  } else {
    applyTextStyles();
  }
})();
