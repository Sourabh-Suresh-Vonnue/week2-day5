export class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
    this.init();
    this.form.setAttribute('novalidate', true);
    this.isFormValid = false;
  }
  init() {
    this.form.addEventListener(
      'blur',
      (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          this.validateInputField(event.target);
        }
      },
      true
    );
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.isFormValid = this.validateAll();
    });
  }

  validateInputField(inputField) {
    const inputFieldRules = this.rules[inputField.name];

    if (!inputFieldRules) return true;

    const inputValue = inputField.value.trim();
    let errorMessage;

    for (const rule of inputFieldRules) {
      if (rule.type === 'required' && inputValue === '') {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
      if (rule.type === 'minLength' && inputValue.length < rule.value) {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
      if (rule.type === 'maxLength' && inputValue.length > rule.value) {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
      if (rule.type === 'pattern' && !rule.value.test(inputValue)) {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
      if (rule.type === 'email') {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputValue)) {
          errorMessage = rule.message;
          this.showError(inputField, errorMessage);
          return false;
        }
      }
      if (rule.type === 'match' && rule.value.value.trim() != inputValue) {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
      if (rule.type === 'custom' && !rule.value(inputValue)) {
        errorMessage = rule.message;
        this.showError(inputField, errorMessage);
        return false;
      }
    }
    this.showError(inputField, '');
    return true;
  }

  validateAll() {
    let inputFields = Array.from(this.form.getElementsByClassName('inputField'));
    let isInvalid = inputFields
      .map((inputField) => this.validateInputField(inputField))
      .some((valid) => !valid);
    if (isInvalid) {
      return false;
    }
    console.log('Form is Valid');
    return true;
  }

  showError(inputField, errorMessage = '') {
    let spanError = inputField.nextElementSibling;
    if (errorMessage === '') {
      spanError.classList.remove('is-invalid');
      spanError.classList.add('is-valid');
      spanError.textContent = '\u2705';
    } else {
      spanError.classList.remove('is-valid');
      spanError.classList.add('is-invalid');
      spanError.textContent = errorMessage;
    }
  }
}

export let rules = {
  required: { type: 'required', message: 'Please fill this field' },
  minLength(n) {
    return { type: 'minLength', value: n, message: `minimum ${n} characters is required` };
  },
  maxLength(n) {
    return { type: 'maxLength', value: n, message: `maximun ${n} characters allowed` };
  },
  pattern(regex) {
    return { type: 'pattern', value: regex, message: 'Invalid format' };
  },
  email: { type: 'email', message: 'Invalid email' },
  match(otherField) {
    return { type: 'match', value: otherField, message: `Should match with ${otherField.name}` };
  },
  custom(fn, message) {
    return { type: 'custom', value: fn, message: message };
  },
};

// const form = document.querySelector('form');
// const pass = form.querySelector('#password');

// let registerationRules = {
//   name: [rules.required],
//   email: [rules.email],
//   username: [rules.required, rules.pattern(/^[A-Za-z0-9_]{3,20}$/)],
//   password: [rules.required, rules.minLength(8), rules.maxLength(20)],
//   'confirm-password': [rules.required, rules.match(pass)],
//   age: [
//     rules.custom(
//       (num) => {
//         return num >= 15;
//       },
//       (message = 'minimum age should be 15')
//     ),
//   ],
// };
// let validator = new FormValidator(form, registerationRules);
