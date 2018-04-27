// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide reults
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calcuate function
function calculateResults() {
  console.log('worked!');
  const loanAmount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const yearsToPay = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

    // Calculations
  const principal = parseFloat(loanAmount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(yearsToPay.value) * 12;

  // Compute monthly payments
  const x =  Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal*x*calcInterest)/(x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = ((monthly * calcPayments)-principal).toFixed(2);
    // Show results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  };
}

// showError function
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'alert alert-danger';

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Create text node and append div
  errorDiv.appendChild(document.createTextNode(error));

  // Inert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 secs
  setTimeout(clearError, 3000);
  // Hide loader
  document.getElementById('loading').style.display = 'none';
  // Hide results
  document.getElementById('results').style.display = 'none';
}

// clearError

function clearError() {
  document.querySelector('.alert').remove();
}