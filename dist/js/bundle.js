/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clas() {
  //     Class

  class MenuClass {
    constructor(src, alt, title, descr, price, parentSelectr) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
      this.classes = classes;
      this.parent = document.querySelector(parentSelectr);
      this.price = price;
      this.transfer = 11000;
      this.changedToUse();
    }
    changedToUse() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length == 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach(classname => element.classList.add(classname));
      }
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                   ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> usz/month</div>
                </div>
            `;
      this.parent.append(element);
    }
  }
  axios.get("http://localhost:3000/menu").then(data => {
    // console.log(data.data)
    data.data.forEach(_ref => {
      let {
        src,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuClass(src, altimg, title, descr, price, ".menu .container").render();
    });
  });
  // bu yerdagi kod yuqorida axios bilan yozilgan

  // async function getRecourse(url) {
  //   const req = await fetch(url);
  //   return await req.json();
  // }
  //
  // getRecourse("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ src, altimg, title, descr, price }) => {
  //     new MenuClass(
  //       src,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // new MenuClass(
  //   "img/tabs/1.png",
  //   "vegy",
  //   'Plan "Usual"',
  //   " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
  //   10,
  //   ".menu .container"
  //   // "menu__item"
  // ).render();
  // new MenuClass(
  //   "img/tabs/2.jpg",
  //   "elite",
  //   "Plan “Premium”",
  //   " Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
  //   15,
  //   ".menu .container",
  //   "menu__item"
  // ).render();
  // new MenuClass(
  //   "img/tabs/3.jpg",
  //   "post",
  //   'Plan "VIP"',
  //   "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus natus nobis minus corporis atque enim vitae, modi eligendi commodi itaque voluptatum ipsum. Nemo reiciendis, id rem dolorum rerum consequuntur eos",
  //   20,
  //   ".menu .container",
  //   "menu__item"
  // ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clas);

/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _server_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../server/server */ "./src/server/server.js");


function form(formSelector, modalTimerId) {
  // Form

  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    bindPostData(form);
  });
  const msg = {
    loading: "/img/spinner.svg",
    success: "That's for submit our form",
    failure: "Somethng went wrong"
  };
  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.append(statusMessage);
      // form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");

      // request.setRequestHeader(
      //   "Content-Type",
      //   "application/json; charset=utf-8"
      // );

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_server_server__WEBPACK_IMPORTED_MODULE_1__.postData)(" http://localhost:3000/request ", json).then(data => {
        // console.log(data);
        showThanksModal(msg.success);
        form.reset();
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(msg.failure);
      }).finally(() => {
        form.reset();
      });

      // request.addEventListener("load", () => {
      //   if (request.status == 200) {
      //     // console.log(request.response);
      //     showThanksModal(msg.success);
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 2000);
      //   } else {
      //     showThanksModal(msg.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
  <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
  </div>
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closModal)('.modal');
    }, 3000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader() {
  loader = document.querySelector(".loader");

  // loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closModal: () => (/* binding */ closModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  // modal.classList.toggle("show");
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  // modal.classList.toggle("show");
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function modal(tiggerSelector, modalSelector, modalTimerId) {
  //     Modal

  const modalTrigger = document.querySelectorAll(tiggerSelector),
    modal = document.querySelector(modalSelector);
  modalTrigger.forEach(item => {
    item.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  // modalTrigger.addEventListener("click", openModal);

  modal.addEventListener("click", e => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closModal(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(_ref) {
  let {
    container,
    slides,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  //   slider

  const slider = document.querySelectorAll(container),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    sliderWrapper = document.querySelector(wrapper),
    sliderField = document.querySelector(field),
    width = window.getComputedStyle(sliderWrapper).width,
    slide = document.querySelector(slides);
  let sliedrIndex = 1;
  let offset = 0;

  // -----*********************-------------
  //            carusel slider
  // -----*********************-------------

  if (slider.length < 10) {
    total.textContent = `0${slider.length}`;
    current.textContent = `0${sliedrIndex}`;
  } else {
    total.textContent = slider.length;
    current.textContent = sliedrIndex;
  }
  sliderField.style.width = 100 * slider.length + "%";
  sliderField.style.display = "flex";
  sliderField.style.transition = ".5s ease all";
  sliderWrapper.style.overflow = "hidden";
  slider.forEach(slide => {
    slide.style.width = width;
  });
  const indecators = document.createElement("ol");
  indecators.classList.add("carousel-indecators");
  slide.append(indecators);
  const dots = [];
  for (let i = 0; i < slider.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("carousel-dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indecators.append(dot);
    dots.push(dot);
  }
  function deletNotDigits(str) {
    return parseInt(str.replace(/\D/g, ''));
  }
  next.addEventListener("click", () => {
    if (offset == deletNotDigits(width) * (slider.length - 1)) {
      offset = 0;
    } else {
      offset += deletNotDigits(width);
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
    if (sliedrIndex == slider.length) {
      sliedrIndex = 1;
    } else {
      sliedrIndex++;
    }
    if (slider.length < 10) {
      current.textContent = `0${sliedrIndex}`;
    } else {
      current.textContent = sliedrIndex;
    }
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[sliedrIndex - 1].style.opacity = 1;
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deletNotDigits(width) * (slider.length - 1);
    } else {
      offset -= deletNotDigits(width);
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
    if (sliedrIndex == 1) {
      sliedrIndex = slider.length;
    } else {
      sliedrIndex--;
    }
    if (slider.length < 10) {
      current.textContent = `0${sliedrIndex}`;
    } else {
      current.textContent = sliedrIndex;
    }
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[sliedrIndex - 1].style.opacity = 1;
  });
  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      sliedrIndex = slideTo;
      offset = deletNotDigits(width) * (slideTo - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;
      if (slider.length < 10) {
        current.textContent = `0${sliedrIndex}`;
      } else {
        current.textContent = sliedrIndex;
      }
      dots.forEach(dot => dot.style.opacity = 0.5);
      dots[sliedrIndex - 1].style.opacity = 1;
    });
  });
  // -----*********************-------------
  //            Easy slider
  // -----*********************-------------

  // showsSlider(sliedrIndex)
  //
  // if(slider.length < 10){
  //   total.textContent =`0${slider.length}`
  // }else{
  //   total.textContent = slider.length
  // }
  //
  // function showsSlider (idx){
  //   if(idx > slider.length){
  //     sliedrIndex = 1
  //   }
  //   if(idx < 0){
  //     sliedrIndex = slider.length
  //   }
  //
  //   slider.forEach(item => item.style.display = 'none')
  //   slider[sliedrIndex -1].style.display = 'block'
  //
  //   if(slider.length < 10){
  //     current.textContent =`0${sliedrIndex}`
  //   }else{
  //     current.textContent = sliedrIndex
  //   }
  // }
  //
  // function plusSlider(idx){
  //   showsSlider(sliedrIndex +=idx)
  // }
  // next.addEventListener('click', ()=>{
  //   plusSlider(1)
  // })
  //
  // prev.addEventListener('click', ()=>{
  //   plusSlider(-1)
  // })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tab(tabsSelector, tabsConotentSelector, tabsparentSelector, activeClass) {
  const tabsParent = document.querySelector(tabsparentSelector),
    tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsConotentSelector);

  // tabs
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", event => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tab);

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, dedline) {
  //     Timer

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endtime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor(timer / (1000 * 60 * 60) % 24);
      minutes = Math.floor(timer / 1000 / 60 % 60);
      seconds = Math.floor(timer / 1000 % 60);
    }
    return {
      timer,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updatClock, 1000);
    function updatClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
    updatClock();
  }
  setClock(id, dedline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
async function postData(url, data) {
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });
  if (!req.ok) {
    throw new Error(`Could not fetch ${url}, status ${req.status}`);
  }
  return await req.json();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/class */ "./src/modules/class.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");










window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 3000);
  (0,_modules_class__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_1__["default"])('form', modalTimerId);
  (0,_modules_loader__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slide",
    slides: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  (0,_modules_tab__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023.05.31');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map