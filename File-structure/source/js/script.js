'use strict';
var buttonOpen = document.querySelector('.page-header__nav-button');
var navMenu = document.querySelector('.page-header__nav-block');
var linkPrivacy = document.querySelector('.page-footer__privacy')
var modalBlock = document.querySelector('.modal')
var closePopupBtn = document.querySelector('.modal-box__button')

buttonOpen.addEventListener('click', function () {
    navMenu.classList.toggle('close');
    buttonOpen.classList.toggle('button-open')
});

linkPrivacy.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!modalBlock.classList.contains('content-show')) {
        modalBlock.classList.add('content-show');
    };
}, false);


closePopupBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (modalBlock.classList.contains('content-show')) {
        modalBlock.classList.remove('content-show');
    };
}, false);

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (modalBlock.classList.contains('content-show')) {
            modalBlock.classList.remove('content-show');
        }
    }
});
