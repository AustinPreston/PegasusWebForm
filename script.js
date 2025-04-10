const scriptURL = 'https://script.google.com/macros/s/AKfycbxYtm0DtvDEASRRiCAP5ei5KCrXQtBYDWosL1jXvkgEzdhQIrD659cGvXvufh5KU4ts/exec';

const form = document.querySelector('#mentee-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        alert('Form submitted successfully!');
        form.reset();
        hideAllOtherInputs();
      } else {
        alert('Error submitting form.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting form: ' + error.message);
    });
});

const otherFields = [
  { checkbox: 'input[name="ethnicity"][value="Other"]', input: 'ethnicity-other' },
  { checkbox: 'input[name="special"][value="Other"]', input: 'special-other' },
  { checkbox: 'input[name="schools"][value="Other"]', input: 'schools-other' }
];

otherFields.forEach(({ checkbox, input }) => {
  const checkboxEl = document.querySelector(checkbox);
  const inputEl = document.getElementById(input);

  checkboxEl.addEventListener('change', function () {
    inputEl.style.display = this.checked ? 'block' : 'none';
    inputEl.required = this.checked;
    if (!this.checked) inputEl.value = '';
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
