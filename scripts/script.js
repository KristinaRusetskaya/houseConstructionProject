// $(document).ready(function() {
$(".slider").slick({
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    prevArrow: "<img src='../images/prev.png' class='prev' alt='1'>",
    nextArrow: "<img src='../images/next.png' class='next' alt='2'>",
    initialSlide: 1,
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                arrows: false
            },
        },
    ],
});

const menu = $('#menu');
const sidebar = $('#sidebar');
const closeSidebar = $('#close');
let sidebarItem = $('.sidebar__item');
menu.click(function () {
    sidebar.css('display', 'flex');
});
closeSidebar.click(function () {
    sidebar.css('display', 'none');
});
sidebarItem.on("click", function () {
    sidebarItem.removeClass('sidebar__item-active');
    $(this).addClass('sidebar__item-active');
});

let buttonsConsultation = $('.scroll-consultation');
const consultation = $('#consultation');
buttonsConsultation.click(function () {
    $('html, body').animate({
        scrollTop: consultation.offset().top
    }, 1000);
});

$('.card__images').magnificPopup({
    delegate: 'a',
    type: 'image'
});

const projectsButton = $('.projects__button');
let cardAdd = $('.card-add');
const projectsButtonClose = $('.projects__button.close');
projectsButton.click(function () {
    projectsButton.css('display', 'none');
    cardAdd.css('display', 'flex');
    projectsButtonClose.css('display', 'flex');
})
projectsButtonClose.click(function () {
    projectsButton.css('display', 'flex');
    cardAdd.css('display', 'none');
    projectsButtonClose.css('display', 'none');
})

let name = $('#name');
let phone = $('#phone');
let agree = $('#agree');
let errorAgree = $('#form-error-agree');
let loader = $('.loader');
let submit = $('#submit');
let hasError = false;
submit.click(function () {
    let style = document.createElement('style');
    $('.form-error').hide();
    name.css('border-color', 'white');
    phone.css('border-color', 'white');
    agree.css('border-color', 'white');
    style.innerHTML = `
                #label-agree::before {
                border-color: #FFFFFF;
                }`;
    document.head.appendChild(style);
    hasError = false;
    if (!name.val()) {
        name.css('border-color', '#B90000');
        name.next().show();
        hasError = true;
    }
    if (!phone.val()) {
        phone.css('border-color', '#B90000');
        phone.next().show();
        hasError = true;
    }
    if (!agree.prop('checked')) {
        style.innerHTML = `
                #label-agree::before {
                border-color: #B90000;
                }`;
        document.head.appendChild(style);
        errorAgree.show();
        hasError = true;
    }
    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: name.val(), phone: phone.val(), agree: true}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success === 0) {
                    let formItem = $('#form__item').hide();
                    let formSuccess = $('#form__success').css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа')
                }
            });
    }
})

const mapsButton = $('#maps__button');
const popup = $('#popup');
const popupClose = $('#popup-close');
mapsButton.click(function () {
    popup.css('display', 'flex');
});
popupClose.click(function () {
    popup.css('display', 'none');
});

let namePopup = $('#name-popup');
let phonePopup = $('#phone-popup');
let agreePopup = $('#agree-popup');
let errorAgreePopup = $('#form-error-agree-popup');
let submitPopup = $('#submit-popup');
let hasErrorPopup = false;
submitPopup.click(function () {
    let style = document.createElement('style');
    $('.form-error').hide();
    namePopup.css('border-color', 'white');
    phonePopup.css('border-color', 'white');
    agreePopup.css('border-color', 'white');
    style.innerHTML = `
                #label-agree-popup::before {
                border-color: #FFFFFF;
                }`;
    document.head.appendChild(style);
    hasErrorPopup = false;
    if (!namePopup.val()) {
        namePopup.css('border-color', '#B90000');
        namePopup.next().show();
        hasErrorPopup = true;
    }
    if (!phonePopup.val()) {
        phonePopup.css('border-color', '#B90000');
        phonePopup.next().show();
        hasErrorPopup = true;
    }
    if (!agreePopup.prop('checked')) {
        style.innerHTML = `
                #label-agree-popup::before {
                border-color: #B90000;
                }`;
        document.head.appendChild(style);
        errorAgreePopup.show();
        hasErrorPopup = true;
    }
    if(errorAgreePopup.css('text-align') === "center"){
        popupClose.css('top', '5px');
        popupClose.css('right', '5px');
    }
    if (!hasErrorPopup) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: namePopup.val(), phone: phonePopup.val(), agree: true}
        })
            .done(function (msg) {
                loader.hide();
                let popupContent = $('#popup-content');
                let popupSuccess = $('#popup-success');
                if (msg.success === 1) {
                    popupContent.hide();
                    popupSuccess.css('display', 'block');
                } else {
                    alert('Возникла ошибка при оформлении заказа')
                }
            });
    }
})

new WOW({
    animateClass: 'animate__animated'
}).init();

const pointerEclipseFirst = $('.pointer__eclipse-first');
const pointerEclipseSecond = $('.pointer__eclipse-second');
const pointerEclipseThird = $('.pointer__eclipse-third');
const pointerEclipseFourth = $('.pointer__eclipse-fourth');
const pointerEclipseFifth = $('.pointer__eclipse-fifth');
const technologiesContainer = $('.technologies__all');

function adaptiveButtons() {
    pointerEclipseFirst.click(function () {
        let checkForAvailability = $.contains($("div.technologies__container")[0], $("div.technologies__block-adaptive")[0]);
        if (checkForAvailability === false) {
            pointerEclipseFirst.css('background-color', 'white');
            pointerEclipseFirst.parent().css('border-color', 'white');
            technologiesContainer.append("<div class='technologies__block-adaptive'></div>");
            let technologiesBlockAdaptive = $('.technologies__block-adaptive');
            technologiesBlockAdaptive.append("<h4 class='technologies__block-adaptive-title'>Неразрывний каркас</h4>");
            technologiesBlockAdaptive.append("<div class='technologies__block-adaptive-text'>Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.</div>");
        } else {
            pointerEclipseFirst.css('background-color', 'white');
            pointerEclipseFirst.parent().css('border-color', 'white');
            pointerEclipseSecond.css('background-color', '#ECC66B');
            pointerEclipseSecond.parent().css('border-color', '#ECC66B');
            pointerEclipseThird.css('background-color', '#ECC66B');
            pointerEclipseThird.parent().css('border-color', '#ECC66B');
            pointerEclipseFourth.css('background-color', '#ECC66B');
            pointerEclipseFourth.parent().css('border-color', '#ECC66B');
            pointerEclipseFifth.css('background-color', '#ECC66B');
            pointerEclipseFifth.parent().css('border-color', '#ECC66B');
            let technologiesBlockAdaptiveTitle = $('.technologies__block-adaptive-title');
            let technologiesBlockAdaptiveText = $('.technologies__block-adaptive-text');
            technologiesBlockAdaptiveTitle.html('Неразрывний каркас');
            technologiesBlockAdaptiveText.html('Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.');
        }
    });
    pointerEclipseSecond.click(function () {
        let checkForAvailability = $.contains($("div.technologies__container")[0], $("div.technologies__block-adaptive")[0]);
        if (checkForAvailability === false) {
            pointerEclipseSecond.css('background-color', 'white');
            pointerEclipseSecond.parent().css('border-color', 'white');
            technologiesContainer.append("<div class='technologies__block-adaptive'></div>");
            let technologiesBlockAdaptive = $('.technologies__block-adaptive');
            technologiesBlockAdaptive.append("<h4 class='technologies__block-adaptive-title'>Диагональный раскос</h4>");
            technologiesBlockAdaptive.append("<div class='technologies__block-adaptive-text'>Система диагональных раскосов позволяет создать оптимальный вентеляционный зазор для капитальных стен и наружной отделки.</div>");
        } else {
            pointerEclipseFirst.css('background-color', '#ECC66B');
            pointerEclipseFirst.parent().css('border-color', '#ECC66B');
            pointerEclipseSecond.css('background-color', 'white');
            pointerEclipseSecond.parent().css('border-color', 'white');
            pointerEclipseThird.css('background-color', '#ECC66B');
            pointerEclipseThird.parent().css('border-color', '#ECC66B');
            pointerEclipseFourth.css('background-color', '#ECC66B');
            pointerEclipseFourth.parent().css('border-color', '#ECC66B');
            pointerEclipseFifth.css('background-color', '#ECC66B');
            pointerEclipseFifth.parent().css('border-color', '#ECC66B');
            let technologiesBlockAdaptiveTitle = $('.technologies__block-adaptive-title');
            let technologiesBlockAdaptiveText = $('.technologies__block-adaptive-text');
            technologiesBlockAdaptiveTitle.html('Диагональный раскос');
            technologiesBlockAdaptiveText.html('Система диагональных раскосов позволяет создать оптимальный вентеляционный зазор для капитальных стен и наружной отделки.');
        }
    });
    pointerEclipseThird.click(function () {
        let checkForAvailability = $.contains($("div.technologies__container")[0], $("div.technologies__block-adaptive")[0]);
        if (checkForAvailability === false) {
            pointerEclipseThird.css('background-color', 'white');
            pointerEclipseThird.parent().css('border-color', 'white');
            technologiesContainer.append("<div class='technologies__block-adaptive'></div>");
            let technologiesBlockAdaptive = $('.technologies__block-adaptive');
            technologiesBlockAdaptive.append("<h4 class='technologies__block-adaptive-title'>Сборка силовых узлов</h4>");
            technologiesBlockAdaptive.append("<div class='technologies__block-adaptive-text'>Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции.</div>");
        } else {
            pointerEclipseFirst.css('background-color', '#ECC66B');
            pointerEclipseFirst.parent().css('border-color', '#ECC66B');
            pointerEclipseSecond.css('background-color', '#ECC66B');
            pointerEclipseSecond.parent().css('border-color', '#ECC66B');
            pointerEclipseThird.css('background-color', 'white');
            pointerEclipseThird.parent().css('border-color', 'white');
            pointerEclipseFourth.css('background-color', '#ECC66B');
            pointerEclipseFourth.parent().css('border-color', '#ECC66B');
            pointerEclipseFifth.css('background-color', '#ECC66B');
            pointerEclipseFifth.parent().css('border-color', '#ECC66B');
            let technologiesBlockAdaptiveTitle = $('.technologies__block-adaptive-title');
            let technologiesBlockAdaptiveText = $('.technologies__block-adaptive-text');
            technologiesBlockAdaptiveTitle.html('Сборка силовых узлов');
            technologiesBlockAdaptiveText.html('Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции.');
        }
    });
    pointerEclipseFourth.click(function () {
        let checkForAvailability = $.contains($("div.technologies__container")[0], $("div.technologies__block-adaptive")[0]);
        if (checkForAvailability === false) {
            pointerEclipseFourth.css('background-color', 'white');
            pointerEclipseFourth.parent().css('border-color', 'white');
            technologiesContainer.append("<div class='technologies__block-adaptive'></div>");
            let technologiesBlockAdaptive = $('.technologies__block-adaptive');
            technologiesBlockAdaptive.append("<h4 class='technologies__block-adaptive-title'>Плитная ветрозащита</h4>");
            technologiesBlockAdaptive.append("<div class='technologies__block-adaptive-text'>Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен.</div>");
        } else {
            pointerEclipseFirst.css('background-color', '#ECC66B');
            pointerEclipseFirst.parent().css('border-color', '#ECC66B');
            pointerEclipseSecond.css('background-color', '#ECC66B');
            pointerEclipseSecond.parent().css('border-color', '#ECC66B');
            pointerEclipseThird.css('background-color', '#ECC66B');
            pointerEclipseThird.parent().css('border-color', '#ECC66B');
            pointerEclipseFourth.css('background-color', 'white');
            pointerEclipseFourth.parent().css('border-color', 'white');
            pointerEclipseFifth.css('background-color', '#ECC66B');
            pointerEclipseFifth.parent().css('border-color', '#ECC66B');
            let technologiesBlockAdaptiveTitle = $('.technologies__block-adaptive-title');
            let technologiesBlockAdaptiveText = $('.technologies__block-adaptive-text');
            technologiesBlockAdaptiveTitle.html('Плитная ветрозащита');
            technologiesBlockAdaptiveText.html('Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен.');
        }
    });
    pointerEclipseFifth.click(function () {
        let checkForAvailability = $.contains($("div.technologies__container")[0], $("div.technologies__block-adaptive")[0]);
        if (checkForAvailability === false) {
            pointerEclipseFifth.css('background-color', 'white');
            pointerEclipseFifth.parent().css('border-color', 'white');
            technologiesContainer.append("<div class='technologies__block-adaptive'></div>");
            let technologiesBlockAdaptive = $('.technologies__block-adaptive');
            technologiesBlockAdaptive.append("<h4 class='technologies__block-adaptive-title'>5 камерные окна</h4>");
            technologiesBlockAdaptive.append("<div class='technologies__block-adaptive-text'>Обеспечивает исключительную сохранность тепла в доме.</div>");
        } else {
            pointerEclipseFirst.css('background-color', '#ECC66B');
            pointerEclipseFirst.parent().css('border-color', '#ECC66B');
            pointerEclipseSecond.css('background-color', '#ECC66B');
            pointerEclipseSecond.parent().css('border-color', '#ECC66B');
            pointerEclipseThird.css('background-color', '#ECC66B');
            pointerEclipseThird.parent().css('border-color', '#ECC66B');
            pointerEclipseFourth.css('background-color', '#ECC66B');
            pointerEclipseFourth.parent().css('border-color', '#ECC66B');
            pointerEclipseFifth.css('background-color', 'white');
            pointerEclipseFifth.parent().css('border-color', 'white');
            let technologiesBlockAdaptiveTitle = $('.technologies__block-adaptive-title');
            let technologiesBlockAdaptiveText = $('.technologies__block-adaptive-text');
            technologiesBlockAdaptiveTitle.html('5 камерные окна');
            technologiesBlockAdaptiveText.html('Обеспечивает исключительную сохранность тепла в доме.');
        }
    });
}

if (window.matchMedia('(max-width: 1230px)').matches) {
    adaptiveButtons();
}
window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 1230px)').matches) {
        adaptiveButtons();
        $('.technologies__block-adaptive').css('display', 'block');

    } else if (window.matchMedia('(min-width: 1231px)').matches) {
        pointerEclipseFirst.css('background-color', '#ECC66B');
        pointerEclipseFirst.parent().css('border-color', '#ECC66B');
        pointerEclipseSecond.css('background-color', '#ECC66B');
        pointerEclipseSecond.parent().css('border-color', '#ECC66B');
        pointerEclipseThird.css('background-color', '#ECC66B');
        pointerEclipseThird.parent().css('border-color', '#ECC66B');
        pointerEclipseFourth.css('background-color', '#ECC66B');
        pointerEclipseFourth.parent().css('border-color', '#ECC66B');
        pointerEclipseFifth.css('background-color', '#ECC66B');
        pointerEclipseFifth.parent().css('border-color', '#ECC66B');
        $('.technologies__block-adaptive').css('display', 'none');
        pointerEclipseFirst.click(function () {
            pointerEclipseFirst.css('background-color', '#ECC66B');
            pointerEclipseFirst.parent().css('border-color', '#ECC66B');
        });
        pointerEclipseSecond.click(function () {
            pointerEclipseSecond.css('background-color', '#ECC66B');
            pointerEclipseSecond.parent().css('border-color', '#ECC66B');
        });
        pointerEclipseThird.click(function () {
            pointerEclipseThird.css('background-color', '#ECC66B');
            pointerEclipseThird.parent().css('border-color', '#ECC66B');
        });
        pointerEclipseFourth.click(function () {
            pointerEclipseFourth.css('background-color', '#ECC66B');
            pointerEclipseFourth.parent().css('border-color', '#ECC66B');
        });
        pointerEclipseFifth.click(function () {
            pointerEclipseFifth.css('background-color', '#ECC66B');
            pointerEclipseFifth.parent().css('border-color', '#ECC66B');
        });
    }
});

let contactHeader = $('.section .header .header__container .contact');
let sidebarContainer = $(".section .sidebar .sidebar__container");
let headerContainer = $('.section .header .header__container');
if (window.matchMedia('(max-width: 620px)').matches) {
    contactHeader.appendTo(sidebarContainer);
}
window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 620px)').matches) {
        contactHeader.appendTo(sidebarContainer);
    } else if (window.matchMedia('(min-width: 621px)').matches) {
        let contactSidebar = $('.section .sidebar .sidebar__container .contact')
        contactSidebar.appendTo(headerContainer);
    }
});


