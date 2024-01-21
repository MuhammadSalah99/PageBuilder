export function clearSelection() {
  if (window.getSelection) {
    window.getSelection()?.removeAllRanges();
  } else if (document.getSelection()) {
    document.getSelection()?.empty();
  }
}
