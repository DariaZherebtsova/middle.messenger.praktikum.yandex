import { IBlock } from '../block/block.type';

export interface IInputBlock extends IBlock {
  inputElement: HTMLElement;
  getElementForErrorMessage?(): Element | null;
  hide(): void;
  show(): void;
}
