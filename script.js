document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const closeMenuBtn = document.querySelector('.close-menu-btn'); 

  mobileMenu.addEventListener('click', () => {
    dropdownMenu.classList.add('active');
  });

  closeMenuBtn.addEventListener('click', () => { 
    dropdownMenu.classList.remove('active');
  });
});

  

document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.querySelector('#openModal');
  const modal = document.querySelector('#modal_form_action');
  const closeModalBtn = document.querySelector('.close-modal-btn-form-Action');

  // Открытие модального окна
  openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Закрытие модального окна при клике на крестик
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const openModalDiscountBtn = document.querySelector('#openModalFive');
  const modalDiscount = document.querySelector('#modal_form_discount');
  const closeModalDiscountBtn = document.querySelector('.close-modal-btn-form-discount');

  // Открытие модального окна
  openModalDiscountBtn.addEventListener('click', () => {
    modalDiscount.classList.add('active');
  });

  // Закрытие модального окна при клике на крестик
  closeModalDiscountBtn.addEventListener('click', () => {
    modalDiscount.classList.remove('active');
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === modalDiscount) {
      modalDiscount.classList.remove('active');
    }
  });
});
