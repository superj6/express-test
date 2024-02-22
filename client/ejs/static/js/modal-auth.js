var loginButtons = document.getElementsByClassName('modal-popup');
var closeButtons = document.getElementsByClassName('auth-modal__close');

Array.from(loginButtons).forEach(button => {
  button.onclick = () => {
    modalId = button.id.split('-popup')[0];
    modal = document.getElementById(modalId);
    modal.classList.add('auth-modal--show');
  };
});

Array.from(closeButtons).forEach(button => {
  button.onclick = () => {
    modal = button.closest('.auth-modal');
    modal.classList.remove('auth-modal--show');
  };
});

window.onclick = e => {
  if (e.target.classList.contains('auth-modal')){
    e.target.classList.remove('auth-modal--show');
  }
};
