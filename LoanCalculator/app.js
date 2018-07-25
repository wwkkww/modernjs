//Listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
  //hide results
  document.getElementById('results').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

//Calculate Results 
function calculateResults() {
  //UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlypayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //calculation
  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const totalMonths = parseFloat(years.value) * 12;


  //compute monthly payment
  const x = Math.pow((1 + calculatedInterest), totalMonths * -1);
  const monthly = (principle * calculatedInterest) / (1 - x);
  const total = monthly * totalMonths;

  if (isFinite(monthly)) {
    monthlypayment.value = monthly.toFixed(2);
    totalPayment.value = total.toFixed(2);
    totalInterest.value = (total - principle).toFixed(2);

    //show result
    document.getElementById('results').style.display = 'block';

    //hide loading
    document.getElementById('loading').style.display = 'none';
  } else {

    showError('Please check your numbers');
    // console.log('Please check your numbers')
  }
};


//Show Error
function showError(msgError) {
  //create div
  const errorDiv = document.createElement('div');

  //Get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  const loanForm = document.getElementById('loan-form')

  //add class
  errorDiv.className = 'alert alert-danger';

  console.log(errorDiv);

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(msgError));

  //Insert error before heading
  card.insertBefore(errorDiv, heading);

  loanForm.appendChild(errorDiv)
  document.getElementById('loading').style.display = 'none';
  //clear error after 2 second
  setTimeout(clearError, 1000);
}

//Clear Error
function clearError() {

  document.querySelector('.alert').remove();
} 