import { IInputBlock } from '../components/pureInput/inputs.type';

export default function prepareDataToRequest(
  inputs: Record<string,
  IInputBlock>,
): Record<string, string> {
  const result: Record<string, string> = {};
  const arrInputs = Object.values(inputs);
  arrInputs.forEach(item => {
    result[<string>item.props.name] = item.inputElement.value;
  });
  return result;
}
