export interface IBlock {
  props: TProps;
  getElementForEvent(): HTMLElement;
  getWrapperElement(): HTMLElement;
}

// не нашла подходящего варианта для типа props
// тут несколько вариантов, которые я перепробовала

// --------------
export type TProps = Record<string, string>;
// --------------
// export type TProps = Record<string, string | Record<string, (event)=>void>>;
// этот вариант мне не понравился тем, что надо много где уточнять, что в данном случае это <string>
// --------------
// почему-то пересечение(&) у меня не сработало
// type TSrtingProps = Record<string, string>;
// type TEventProps = Record<string, Record<string, (event)=>void>>;
// type TEventProps = {
//   events: {
//     focus: (event: Event) => void,
//     blur: (event: Event) => void,
//     click: (event: Event) => void,
//   }
// };
// type TEventProps = {
//   focus: (event: Event) => void,
//   blur: (event: Event) => void,
//   click: (event: Event) => void,
// };
// export type TProps = TSrtingProps & TEventProps;
// --------------
// это мой первый вариант, но потом я поняла что придется описать все что может быть в props
// и этот вариант мне не понравился
// export type TProps = {
//   events: Record<string, ()=>void>,
//   wrapperClass?: string,
//   extraClass?: string,
//   dataset?: string,
// };
