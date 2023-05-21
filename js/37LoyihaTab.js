"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  // loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  // tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  //     Timer

  const dedline = "2023.05.20";
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
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
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
  setClock(".timer", dedline);

  //     Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function closModal() {
    // modal.classList.toggle("show");
    document.body.style.overflow = "";
    modal.classList.add("hide");
    modal.classList.remove("show");
  }

  function openModal() {
    // modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
    modal.classList.add("show");
    modal.classList.remove("hide");
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  // modalTrigger.addEventListener("click", openModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //     Class

  class MenuClass {
    constructor(src, alt, title, descr, price, parentSelectr, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
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
        this.classes.forEach((classname) => element.classList.add(classname));
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

 async function getRecourse (url){
    const req = await fetch(url)
   return await  req.json()
  }

  getRecourse('http://localhost:3000/menu').then((data)=>{
    data.forEach(({src,img,title,descr,price,})=>{
      new MenuClass(src,img,title,descr,price, '.menu .container').render()
    })
  })

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

  // Form

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    bindPostData(form);
  });

  const msg = {
    loading: "/img/spinner.svg",
    success: "That's for submit our form",
    failure: "Somethng went wrong",
  };

  async function postData(url, data) {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await req.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
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

      postData(" http://localhost:3000/request ", json)
        .then((data) => {
          console.log(data);
          showThanksModal(msg.success);
          form.reset();
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(() => {
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
    openModal();

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
      closModal();
    }, 3000);
  }
});
