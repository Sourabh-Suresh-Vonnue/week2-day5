import { FormValidator, rules } from './form-validator.js';
import { showToast } from './utils.js';

const form = document.querySelector('form');

let contactRules = {
  fname: [rules.required, rules.minLength(2)],
  lname: [rules.required],
  email: [rules.required, rules.email],
  phno: [rules.pattern(/^(\+\d{1,3})?\s?\d{10}$/)],
  message: [rules.required, rules.minLength(20)],
};
let validator = new FormValidator(form, contactRules);

form.addEventListener('submit', () => {
  showToast('info', 'Form submitting...', 1500);
  setTimeout(() => {
    if (validator.isFormValid) {
      showToast('success', 'Form Successfully submitted', 1500);
      form.reset();
      const inputFields = Array.from(form.getElementsByClassName('inputField'));
      inputFields.forEach((inputField) => {
        const spanError = inputField.nextElementSibling;
        if (spanError) {
          spanError.classList.remove('is-valid');
          spanError.textContent = '';
        }
      });
    } else {
      showToast('error', 'Form Error', 1500);
    }
  }, 1500);
});
