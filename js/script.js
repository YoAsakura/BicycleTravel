"use strict";
var buttonOpen = document.querySelector('.page-header__nav-button');
var navMenu = document.querySelector('.page-header__nav-block');

buttonOpen.addEventListener("click", function () {
    navMenu.classList.toggle('close');
    buttonOpen.classList.toggle('button-open')
});