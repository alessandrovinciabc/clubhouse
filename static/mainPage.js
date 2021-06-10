let btn = document.querySelector('.btn-new-msg');
let inputCard = document.querySelector('.card--new');

btn.addEventListener('click', (e) => {
  inputCard.classList.toggle('d-none');
});
