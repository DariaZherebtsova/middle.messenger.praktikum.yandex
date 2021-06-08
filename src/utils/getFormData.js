export default function getFormData({ formId, formFields }) {
  let form = document.getElementById(formId);
  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const result = {};
    formFields.forEach(item => {
      result[item] = formData.get(item);
    });
    console.log(`${formId}`, result);
  };
}