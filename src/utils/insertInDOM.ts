import { Block } from '../components/block/block';

export default function insertInDOM(query: string, block: Block): void {
  const root = document.querySelector(query);
  console.log('insertInDOM root', root);
  console.log('---insertInDOM block', block.getWrapperElement());
  if (root) {
    root.appendChild(block.getWrapperElement());
  }
}
