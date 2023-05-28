
import {openModal, closModal} from "./modal";
import {postData} from "../server/server";

function form( formSelector,modalTimerId){

    // Form

    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
        bindPostData(form);
    });

    const msg = {
        loading: "/img/spinner.svg",
        success: "That's for submit our form",
        failure: "Somethng went wrong",
    };



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
                    // console.log(data);
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
        openModal( '.modal', modalTimerId);

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
            closModal('.modal');
        }, 3000);
    }

}
export default form