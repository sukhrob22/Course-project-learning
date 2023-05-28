function slider({container,
                slides,
                nextArrow,
                prevArrow,
                totalCounter,
                currentCounter,
                wrapper,
                field}){

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

    slider.forEach((slide) => {
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

    function deletNotDigits(str){
        return parseInt(str.replace(/\D/g, ''))
    }

    next.addEventListener("click", () => {
        if (
            offset == deletNotDigits(width) * (slider.length - 1)
        ) {
            offset = 0;
        } else {
            offset +=  deletNotDigits(width);
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

        dots.forEach((dot) => (dot.style.opacity = 0.5));
        dots[sliedrIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset =  deletNotDigits(width) * (slider.length - 1)
            ;
        } else {
            offset -=  deletNotDigits(width);
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

        dots.forEach((dot) => (dot.style.opacity = 0.5));
        dots[sliedrIndex - 1].style.opacity = 1;
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            sliedrIndex = slideTo;
            offset =  deletNotDigits(width)* (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;

            if (slider.length < 10) {
                current.textContent = `0${sliedrIndex}`;
            } else {
                current.textContent = sliedrIndex;
            }

            dots.forEach((dot) => (dot.style.opacity = 0.5));
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
export default slider