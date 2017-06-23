let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__toggle");
let reviewsArrowRight = document.querySelector(".reviews__slider-control-desktop--right");
let reviewsArrowLeft = document.querySelector(".reviews__slider-control-desktop--left");
let reviewsBtnOne = document.getElementById("reviews-btn-1");
let reviewsBtnTwo = document.getElementById("reviews-btn-2");
let reviewsBtnThree = document.getElementById("reviews-btn-3");
let formSubmit = document.querySelector(".journey-form__submit-btn");
let acqInput = document.querySelectorAll(".journey-form__acquaintance-input--necessarily");
let popFailure = document.querySelector(".popup-failure");
let popSuccess = document.querySelector(".popup-success");
let popOverlay = document.querySelector(".popup-overlay");
let popSuccessBtn = document.querySelector (".popup-success__btn");
let popFailureBtn = document.querySelector (".popup-failure__btn");

navMain.classList.remove("main-nav--nojs");

if (navToggle !== null) {
  navToggle.addEventListener("click", function() {
    if (navMain.classList.contains("main-nav--closed")) {
      navMain.classList.remove("main-nav--closed");
      navMain.classList.add("main-nav--opened");
    } else {
      navMain.classList.add("main-nav--closed");
      navMain.classList.remove("main-nav--opened");
    }
  });
}

// Слайдер с отзывами на десктопной версии
if (reviewsArrowRight !== null) {
  reviewsArrowRight.addEventListener("click", function(event) {
    event.preventDefault();
    if (reviewsBtnOne.checked === true) {
      reviewsBtnOne.checked = false;
      reviewsBtnTwo.checked = true;
    } else if (reviewsBtnTwo.checked === true) {
      reviewsBtnTwo.checked = false;
      reviewsBtnThree.checked = true;
    } else if (reviewsBtnThree.checked === true) {
      reviewsBtnThree.checked = false;
      reviewsBtnOne.checked = true;
    }
  });
}

if (reviewsArrowLeft !== null) {
  reviewsArrowLeft.addEventListener("click", function(event) {
    event.preventDefault();
    if (reviewsBtnOne.checked === true) {
      reviewsBtnOne.checked = false;
      reviewsBtnThree.checked = true;
    } else if (reviewsBtnTwo.checked === true) {
      reviewsBtnTwo.checked = false;
      reviewsBtnOne.checked = true;
    } else if (reviewsBtnThree.checked === true) {
      reviewsBtnThree.checked = false;
      reviewsBtnTwo.checked = true;
    }
  });
}

//Запуск модальных окон
if (formSubmit !== null) {
  formSubmit.addEventListener("click", function() {

    let triggerCount = acqInput.length; //Заводим переменную, которая равна количеству обязательных полей.

    acqInput.forEach(reqInput => { //Когда находим непустое поле, уменьшаем значение этой переменной на единицу.
      if (reqInput.value !== "") {
        triggerCount--;
      }
    });

    if (triggerCount > 0) { //Если переменная больше нуля, выводим окно о провале.
      popFailure.classList.remove("popup-failure--closed");
      popFailure.classList.add("popup-failure--show");
      popOverlay.classList.add("popup-overlay--show");
    } else {
      popSuccess.classList.remove("popup-success--closed");
      popSuccess.classList.add("popup-success--show");
      popOverlay.classList.add("popup-overlay--show");
    }
  });
}

if (popSuccessBtn !== null) {
  popSuccessBtn.addEventListener("click", function() {
    if (popSuccess.classList.contains("popup-success--show")) {
      popSuccess.classList.remove("popup-success--show");
      popSuccess.classList.add("popup-success--closed");
      popOverlay.classList.remove("popup-overlay--show");
    }
  });
}

if (popFailureBtn !== null) {
  popFailureBtn.addEventListener("click", function() {
    if (popFailure.classList.contains("popup-failure--show")) {
      popFailure.classList.remove("popup-failure--show");
      popFailure.classList.add("popup-failure--closed");
      popOverlay.classList.remove("popup-overlay--show");
    }
  });
}
