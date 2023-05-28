function clas(){

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

    axios.get("http://localhost:3000/menu").then((data) => {
        // console.log(data.data)
        data.data.forEach(({ src, altimg, title, descr, price }) => {
            new MenuClass(
                src,
                altimg,
                title,
                descr,
                price,
                ".menu .container"
            ).render();
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
export default  clas