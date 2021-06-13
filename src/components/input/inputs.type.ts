import { IBlock } from '../block/block.type';

export interface IInputBlock extends IBlock {
  inputElement: HTMLElement;
  getElementForErrorMessage?(): Element | void;
  hide(): void;
  show(): void;
}
