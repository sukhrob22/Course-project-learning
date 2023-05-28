
function closModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
    // modal.classList.toggle("show");
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";

}

function openModal(modalSelector,modalTimerId) {
    const modal = document.querySelector(modalSelector);

    // modal.classList.toggle("show");
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if(modalTimerId){
        clearInterval(modalTimerId);

    }

}

function modal(tiggerSelector, modalSelector,modalTimerId){


    //     Modal

    const modalTrigger = document.querySelectorAll(tiggerSelector),
        modal = document.querySelector(modalSelector);


    modalTrigger.forEach((item) => {
        item.addEventListener("click", ()=>openModal(modalSelector,modalTimerId));
    });

    // modalTrigger.addEventListener("click", openModal);

    modal.addEventListener("click", (e) => {
        if (e.target == modal || e.target.getAttribute("data-close") == "") {
            closModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modal.classList.contains("show")) {
            closModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector,modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}
export default modal
export {openModal, closModal}