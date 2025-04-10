const scriptURL = 'https://script.google.com/macros/s/AKfycbx1EXXnONPVZWjmJ_5jFR1wWZix6Z6Tr_NE0DNdcPAsPrZMefhm501SCC6k-fJoKYjM/exec';

const form = document.getElementById('mentee-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Custom checkbox validations
  if (![...document.querySelectorAll('input[name="ethnicity"]:checked')].length) {
    alert('Please select at least one Ethnicity option.');
    return;
  }

  if (![...document.querySelectorAll('input[name="schools"]:checked')].length) {
    alert('Please select at least one School you are considering.');
    return;
  }

  if (![...document.querySelectorAll('input[name="corevalues"]:checked')].length) {
    alert('Please select your top 5 core values.');
    return;
  }

  // Collect form data including conditional 'Other' fields
  const formData = new FormData(form);

  // Handle "Other" textboxes manually to ensure inclusion
  ['ethnicity', 'special', 'schools'].forEach(category => {
    const otherCheckbox = document.querySelector(`input[name="${category}"][value="Other"]`);
    const otherInput = document.getElementById(`${category}-other`);
    if (otherCheckbox && otherCheckbox.checked && otherInput.value.trim()) {
      formData.append(`${category}-other`, otherInput.value.trim());
    }
  });

  // Submit data to Google Sheets
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      if (response.ok) {
        alert('Form submitted successfully!');
        form.reset();
        hideAllOtherInputs();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => alert(`Error submitting form: ${error.message}`));
});

// Dynamic show/hide for "Other" fields
const otherFields = [
  { checkbox: 'input[name="ethnicity"][value="Other"]', input: 'ethnicity-other' },
  { checkbox: 'input[name="special"][value="Other"]', input: 'special-other' },
  { checkbox: 'input[name="schools"][value="Other"]', input: 'schools-other' }
];

otherFields.forEach(({ checkbox, input }) => {
  const checkboxEl = document.querySelector(checkbox);
  const inputEl = document.getElementById(input);

  checkboxEl.addEventListener('change', () => {
    inputEl.style.display = checkboxEl.checked ? 'block' : 'none';
    inputEl.required = checkboxEl.checked;
    if (!checkboxEl.checked) inputEl.value = '';
  });
});

// Ensure "Other" inputs are hidden on reset
function hideAllOtherInputs() {
  otherFields.forEach(({ input }) => {
    const inputEl = document.getElementById(input);
    inputEl.style.display = 'none';
    inputEl.required = false;
    inputEl.value = '';
  });
}

// Hide "Other" inputs initially on page load
hideAllOtherInputs();
