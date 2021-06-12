import { IBlock } from '../block/block';

export interface IInputBlock extends IBlock {
  inputElement: HTMLElement;
  getElementForErrorMessage(): HTMLElement;
}
