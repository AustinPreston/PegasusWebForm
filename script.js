const scriptURL = 'https://script.google.com/macros/s/AKfycbx1EXXnONPVZWjmJ_5jFR1wWZix6Z6Tr_NE0DNdcPAsPrZMefhm501SCC6k-fJoKYjM/exec';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  let valid = true;

  if (![...document.querySelectorAll('input[name="ethnicity"]:checked')].length) {
    alert('Please select at least one Ethnicity option.');
    valid = false;
  }

  if (![...document.querySelectorAll('input[name="special"]:checked')].length) {
    alert('Please select at least one Special Consideration.');
    valid = false;
  }

  if (![...document.querySelectorAll('input[name="schools"]:checked')].length) {
    alert('Please select at least one School.');
    valid = false;
  }

  if (![...document.querySelectorAll('input[name="corevalues"]:checked')].length) {
    alert('Please select at least one Core Value.');
    valid = false;
  }

  if (!valid) return;

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert('Form submitted successfully!');
      form.reset();
      hideAllOtherInputs();
    } else {
      alert('Error submitting form. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('Error submitting form. Please try again.');
  });
});

// Show/Hide "Other" Fields
const otherFields = [
  { checkbox: 'input[name="ethnicity"][value="Other"]', input: 'ethnicity-other' },
  { checkbox: 'input[name="special"][value="Other"]', input: 'special-other' },
  { checkbox: 'input[name="schools"][value="Other"]', input: 'schools-other' }
];

otherFields.forEach(({ checkbox, input }) => {
  const checkboxEl = document.querySelector(checkbox);
  const inputEl = document.getElementById(input);

  checkboxEl.addEventListener('change', function () {
    if (this.checked) {
      inputEl.style.display = 'block';
      inputEl.required = true;
    } else {
      inputEl.style.display = 'none';
      inputEl.required = false;
      inputEl.value = '';
    }
  });
});

function hideAllOtherInputs() {
  otherFields.forEach(({ input }) => {
    const inputEl = document.getElementById(input);
    inputEl.style.display = 'none';
    inputEl.required = false;
    inputEl.value = '';
  });
}
