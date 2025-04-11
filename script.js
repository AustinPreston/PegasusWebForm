const scriptURL = 'https://script.google.com/macros/s/AKfycbxYtm0DtvDEASRRiCAP5ei5KCrXQtBYDWosL1jXvkgEzdhQIrD659cGvXvufh5KU4ts/exec';

const form = document.querySelector('#mentee-form');
const container = document.querySelector('#form-container');  // your wrapping div

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

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(() => {
      form.reset();
      hideAllOtherInputs();
      showSuccessScreen();
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

function showSuccessScreen() {
  container.innerHTML = `
    <div style="text-align:center; padding: 40px;">
      <h1 style="color: #0066ff;">Thank You!</h1>
      <p>Your form has been submitted successfully. We'll reach out to you shortly.</p>
    </div>
  `;
}
