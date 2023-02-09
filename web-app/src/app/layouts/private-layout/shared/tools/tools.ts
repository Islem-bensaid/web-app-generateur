export function formatStrDateAsPrimavira(dateStr) {
  return dateStr.split('/').reverse().join('-');
}
