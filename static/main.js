let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmpassword');

function validatePassword() {
  if (password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.addEventListener('change', validatePassword);
confirmPassword.addEventListener('keyup', validatePassword);
