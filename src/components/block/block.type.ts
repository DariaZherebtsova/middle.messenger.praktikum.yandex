export interface IBlock {
  props: TProps;
  getElementForEvent(): HTMLElement;
  getWrapperElement(): HTMLElement;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TProps = Record<string, any>;
