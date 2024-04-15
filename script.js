const form = document.getElementById('taxForm');
const modal = document.getElementById('modal');
const taxResult = document.getElementById('taxResult');
const errorIcons = document.getElementById('errorIcons');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let age = form.age.value;
    let income = parseFloat(form.income.value);
    let extraIncome = parseFloat(form.extraIncome.value);
    let deductions = parseFloat(form.deductions.value);

    if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
        showErrorIcon('income');
        showErrorIcon('extraIncome');
        showErrorIcon('deductions');
        return;
    }

    hideErrorIcons();

    let taxableIncome = income + extraIncome - deductions;
    let tax = 0;

    if (taxableIncome > 800000) {
        if (age === '<40') {
            tax = 0.3 * (taxableIncome - 800000);
        } else if (age === '>=40&<60') {
            tax = 0.4 * (taxableIncome - 800000);
        } else if (age === '>=60') {
            tax = 0.1 * (taxableIncome - 800000);
        }
    }

    taxResult.textContent = `THE TOTAL TAX TO BE PAID IS: ${tax}`;
    modal.style.display = 'block';
});

function showErrorIcon(field) {
    document.getElementById(`${field}Error`).style.display = 'inline';
}

function hideErrorIcons() {
    errorIcons.querySelectorAll('.errorIcon').forEach(icon => {
        icon.style.display = 'none';
    });
}

// Close the modal when the close button is clicked
document.querySelector('.closebtn').addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()