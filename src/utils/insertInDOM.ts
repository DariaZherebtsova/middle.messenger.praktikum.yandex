import { Block } from '../components/block/block';

export default function insertInDOM(query: string, block: Block): void {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getWrapperElement());
  }
}
