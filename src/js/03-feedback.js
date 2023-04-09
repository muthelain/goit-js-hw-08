import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';
let formData = {};

const dataInputs = localStorage.getItem(FEEDBACK_FORM_STATE);
if (dataInputs) {
  formData = JSON.parse(dataInputs);
  for (const key of Object.keys(formData)) {
    formRef.elements[key].value = formData[key];
  }
}

formRef.addEventListener('submit', onSubmitForm);
formRef.addEventListener('input', throttle(onInputFormElements, 500));

function onInputFormElements(event) {
  if (event.target.name in formRef.elements) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(formData));
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  formData = {};
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}
