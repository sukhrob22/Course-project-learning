"use strict"

window.addEventListener("DOMContentLoaded", ()=>{
    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll(".tabcontent"),
        loader = document.querySelector('.loader');



    // loader
    setTimeout(()=>{
        loader.style.opacity = "0"
        setTimeout(()=>{
            loader.style.display = 'none'
        },500)
    },2000)




    // tabs
    function hideTabContent(){
        tabsContent.forEach((item)=>{
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })


    }
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,idx)=>{
                if(target == item){
                    hideTabContent()
                    showTabContent(idx)
                }
            })

        }

    })



//     Timer

    const dedline ='2023.04.20'
    function getTimeRemaining (endtime){
        let days, hours, minutes, seconds

        const timer = Date.parse(endtime) - Date.parse(new Date())

        if(timer<= 0){
            days =0
            hours= 0
            minutes = 0
            seconds = 0
        }else {
            days = Math.floor(timer /(1000 * 60 * 60 * 24))
            hours = Math.floor((timer/(1000 * 60 * 60))% 24)
            minutes = Math.floor((timer/ 1000 / 60) % 60)
            seconds = Math.floor((timer/1000) % 60)
        }


        return {timer,days, hours, minutes, seconds}

    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else {
            return num
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updatClock,1000)


        function updatClock (){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero( t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if(t.timer <= 0){
                clearInterval(timeInterval)
            }
        }
        updatClock()


    }
    setClock('.timer', dedline)


//     Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]')


    function closModal (){
        modal.classList.toggle('show')
        document.body.style.overflow = ''
        // modal.classList.add('hide')
        // modal.classList.remove('show')
    }

    function openModal (){
        modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
        // modal.classList.add('show')
        // modal.classList.remove('hide')
    }

    modalTrigger.forEach((item) =>{
        item.addEventListener('click', openModal)
    })


    // modalTrigger.addEventListener('click', openModal)

    modalCloseBtn.addEventListener('click', closModal)

    modal.addEventListener('click', (e)=>{
        if(e.target == modal){
          closModal()

        }
    })

    document.addEventListener("keydown", (e)=>{
        if(e.code == 'Escape' && modal.classList.contains('show')){
            closModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 3000)

    function showModalByScroll (){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal()
            window.removeEventListener("scroll", showModalByScroll)
        }
    }

    window.addEventListener("scroll", showModalByScroll)
})

