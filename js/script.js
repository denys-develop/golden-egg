// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this)
        };
    };
};


// Кастомный select для формы заказа 
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropButton = dropDownWrapper.querySelector('.dropdown__button');
    const dropList = dropDownWrapper.querySelector('.dropdown__list');
    const dropListItem = dropDownWrapper.querySelectorAll('.dropdown__list-item');
    const dropInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
    
    // Клик по кнопке открыть закрыть select
    dropButton.addEventListener('click', function () {
        dropList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
    })
    
    
    // Выбор элемента списка. Запомнить выбраное значение. Закрыть дропдаун
    dropListItem.forEach(function(listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation(); // клик только внутри документа 
            dropButton.innerText = this.innerText; // подставляет значения из списка в кнопку
            dropButton.focus();
            dropInput.value = this.dataset.value; // передает параметру в инпут для формы
            dropList.classList.remove('dropdown__list--visible'); 
        })
    })
    
    
    // Клик снаружи дропдаун. Закрыть дропдаун. 
    document.addEventListener('click', function(e) {
        if (e.target !== dropButton) {
            dropButton.classList.remove('dropdown__button--active');
            dropList.classList.remove('dropdown__list--visible');
        } 
    });
    
    
    // Нажатие на Tab и Escape. Закрыть дропдаун. 
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropButton.classList.remove('dropdown__button--active');
            dropList.classList.remove('dropdown__list--visible');
        }
    });
});



// Tabs menu
const tabHeaders = document.querySelectorAll('[data-tab]');
const contentBoxes = document.querySelectorAll('[data-tab-content]');

tabHeaders.forEach(function(item) {
    item.addEventListener('click', function() {

        // 1.  Cкрыть все contentBox
        contentBoxes.forEach(function (item) {
            item.classList.add('hide');
        })

        // 2. Выбрать нужный contentBox и показать его 
        const contentBox = document.querySelector('#' + this.dataset.tab);
        contentBox.classList.remove('hide');

    });
});

// Активный Tab
$(function() {
    $(".tab__menu").on("click", ".tab__menu-item", function(event) {
    
        $(".tab__menu-item", event.delegateTarget).removeClass("tab--active ")
        
        $(this).addClass("tab--active ")
    
    })
});
    

// Sliders
$(document).ready(function(){
    $(".slide-one").owlCarousel({
        loop:true,
        items: 1,
        margin: 250,
        stagePadding: 125,
        smartSpeed: 500
    });
  
    $(".slide-two").owlCarousel({
        loop:true,
        items: 1
    });
});


// Anchors
const anchor = document.querySelectorAll(".header-nav__menu-link");
console.log(anchor);

anchor.forEach(anc => {
    anc.addEventListener("click", function(event){
        event.preventDefault();

        const id = anc.getAttribute("href");
        const elem = document.querySelector(id);

        window.scroll({
            top: elem.offsetTop,
            behavior: 'smooth'
        });
    });
});  
