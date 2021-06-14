type T = { formId: string; formFields: string[] };
export default function getFormData({ formId, formFields }: T): Record<string, string> {
  const form: HTMLFormElement | null = <HTMLFormElement>document.getElementById(formId);
  const result = {};
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formFields.forEach((item) => {
        result[item] = formData.get(item);
      });
      console.log(`${formId}`, result);
    };
  }
  return result;
}
