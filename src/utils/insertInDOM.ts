export default function insertInDOM(query: string, block): void {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getWrapperElement());
  }
}
