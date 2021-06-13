export interface IBlock {
  props: {
    wrapperClass?: string,
  };
  getElementForEvent(): HTMLElement;
  getWrapperElement(): HTMLElement;
}

export type TProps = Record<string, string>;

// export type TProps = Record<string, string | Record<string, ()=>void>>;

// export type TProps = {
//   events: Record<string, ()=>void>,
//   wrapperClass?: string,
//   extraClass?: string,
//   dataset?: string,
// };
