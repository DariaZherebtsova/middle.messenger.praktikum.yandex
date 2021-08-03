import { Block } from '../block/block';

export interface IInputBlock extends Block {
  inputElement: HTMLInputElement;
  getElementForErrorMessage(): Element | null;
  hide(): void;
  show(): void;
}
