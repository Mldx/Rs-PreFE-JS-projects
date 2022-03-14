import i18Obj from './translate.js';
import preloadImg from './preload.js';


let language = 'en';
let theme = 'dark';
let toggleLang = localStorage.getItem('language') ? localStorage.getItem('language') : language
let toggleImg = 'winter';


const preload = document.querySelector('.preload');
let prel = localStorage.getItem('theme') === 'dark' ? 'black' : 'white'
preload.style.background = localStorage.getItem('theme') ? prel : 'dark'
window.addEventListener('load', () => preload.style.display = 'none')
setTimeout(() => preload.style.display = 'none', 200)


window.addEventListener('load', getLocalStorage)

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation');
const site = document.querySelector('.site');
const body = document.body;
const navList = document.querySelectorAll('.navigation__link');
const modal = document.querySelector('.modal');
const langInput = document.querySelectorAll('.lang__input');
const portfolioButtons = document.querySelectorAll('.button_portfolio');
const portfolioImg = document.querySelectorAll('.portfolio__img');
const toggleTheme = document.querySelector('.toggleTheme');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const colorText = document.querySelectorAll('.colorText')
const background = document.querySelectorAll('.background')
const sectionTitle = document.querySelectorAll('.section-title')
const sectionTitleText = document.querySelectorAll('.section-title__text')
const langAll = document.querySelectorAll('[data-i18]')


/*-----------------Modal window-----------------*/
function toggleOp(element) {
    if (window.innerWidth <= 768) {
        element.classList.toggle('op')
    }
}

const langAnim = () => {
    langAll.forEach((el) => {
        el.style.animation = 'langChange 1s ease';
        setTimeout(() => el.style.animation = '', 500);
    })
}

/*----------------Switch language----------------*/
const switchL = (event) => {
    if (event.target.id === 'en' && event.target.id !== toggleLang) {
        document.querySelectorAll('[data-i18]').forEach((elem) => {
            setTimeout(() => elem.textContent = i18Obj.en[elem.dataset.i18], 250)
            langAnim()
            if (elem.placeholder) {
                elem.textContent = '';
                elem.placeholder = i18Obj.en[elem.dataset.i18];
            }
        })
        toggleLang = 'en'
    } else if (event.target.id === 'ru' && event.target.id !== toggleLang) {
        document.querySelectorAll('[data-i18]').forEach((elem) => {
            setTimeout(() => elem.textContent = i18Obj.ru[elem.dataset.i18], 250)
            langAnim()
            if (elem.placeholder) {
                elem.textContent = '';
                elem.placeholder = i18Obj.ru[elem.dataset.i18];
            }
        })
        toggleLang = 'ru'
    }
}

/*----------------Toggle burger menu----------------*/
function toggleMenu() {
    hamburger.classList.toggle('open');
    menu.classList.toggle('openMenu');
    body.classList.toggle('over');
    site.classList.toggle('over');
    toggleTheme.classList.toggle('lang__padding');
    toggleOp(modal);
}

/*----------------Preload seasons images----------------*/
function preloadSeasonsImages() {
    for (let i = 0; i < seasons.length; i++) {
        for (let j = 1; j <= 6; j++) {
            const img = new Image();
            img.src = `images/portfolio/${seasons[i]}/${j}.jpg`;
        }
    }
}

/*----------------Change img----------------*/
const changeImg = (elem) => {
    elem.addEventListener('click', () => {
            if (!elem.classList.contains('button_gold') && event.target.dataset.i18 !== toggleImg) {
                portfolioImg.forEach((img, index) => {
                    setTimeout(() => img.src = `images/portfolio/${elem.dataset.i18}/${index + 1}.jpg`, 500);
                    img.style.animation = 'portfolio__anim 1s ease'
                    setTimeout(() => img.style.animation = '', 1000);
                    toggleImg = event.target.dataset.i18;
                })
            }
        }
    )
}
/*----------------Switch button----------------*/
const switchButton = (elem) => {

    elem.addEventListener('click', () => {

        if (!elem.classList.contains('button_gold')) {
            portfolioButtons.forEach((x) => x.classList.remove('button_active'));
            portfolioButtons.forEach((x) => x.classList.add('button_inherit'));
            elem.classList.remove('button_inherit');
            elem.classList.add('button_active');

        }
    })
}
/*----------------Is dark theme----------------*/
const isDark = () => {
    let backColor = getComputedStyle(body)
    return backColor.background.includes('rgb(0, 0, 0)')
}
/*----------------Change Color Active Button and Hamburger---------------*/
const changeActiveColorButton = () => {
    if (isDark()) {
        document.documentElement.style.setProperty('--color-active-button', '#000000');
        document.documentElement.style.setProperty('--color-active-hamburger', '#FFFFFF');
    } else if (!isDark()) {
        document.documentElement.style.setProperty('--color-active-button', '#FFFFFF');
        document.documentElement.style.setProperty('--color-active-hamburger', '#000000');

    }
}
/*----------------Change Theme---------------*/
const chTh = () => {
    toggleTheme.classList.toggle('sun')
    toggleTheme.classList.toggle('moon')
    colorText.forEach((el) => el.classList.toggle('colorTextDark'))
    background.forEach((el) => el.classList.toggle('backgroundLight'))
    portfolioButtons.forEach((el) => el.classList.toggle('buttonHov'))
    sectionTitle.forEach((el) => el.classList.toggle('section-title_black'))
    menu.classList.toggle('navLightBackground')
    navList.forEach((el) => el.classList.toggle('navDarkText'))
    changeActiveColorButton();

}


/*----------------Switch Lang Storage---------------*/
const switchLangStorage = (strLang) => {
    if (strLang === 'ru') {
        langInput.forEach((el) => {
            if (el.id === strLang) {
                el.checked = true;
            }
        })
        document.querySelectorAll('[data-i18]').forEach((elem) => {
            elem.textContent = i18Obj.ru[elem.dataset.i18]
            if (elem.placeholder) {
                elem.textContent = '';
                elem.placeholder = i18Obj.ru[elem.dataset.i18];
            }
        })
    } else {
        langInput.forEach((el) => {
            if (el.id === strLang) {
                el.checked = true;
            }
        })
        document.querySelectorAll('[data-i18]').forEach((elem) => {
            elem.textContent = i18Obj.en[elem.dataset.i18]
            if (elem.placeholder) {
                elem.textContent = '';
                elem.placeholder = i18Obj.en[elem.dataset.i18];
            }
        })
    }
}

/*----------------Set Local Storage---------------*/
function setLocalStorage() {
    let x = '';
    langInput.forEach((el) => {
        if (el.checked) {
            x = el.id
        }
    })
    localStorage.setItem('language', x);
    localStorage.setItem('theme', isDark() ? 'dark' : 'light');
}

/*----------------Get Local Storage---------------*/
function getLocalStorage() {
    language = (localStorage.getItem('language')) ? (localStorage.getItem('language')) : language;
    theme = (localStorage.getItem('language')) ? (localStorage.getItem('theme')) : theme;
    switchLangStorage(language)
    if (theme !== 'dark') {
        chTh()
    }


}

const changeThemeAnimation = () => {
    body.style.animation = 'changeBackground .5s linear'
    sectionTitleText.forEach(el => el.style.animation = 'changeBackground1 .5s linear')
    setTimeout(() => {
        body.style.animation = '';
        sectionTitleText.forEach(elem => elem.style.animation = '')
    }, 500);
}


/*----------------CALL FUNCTIONS---------------*/
modal.addEventListener('click', () => {
    toggleMenu();
});
hamburger.addEventListener('click', () => {
    toggleMenu();
});
navList.forEach((elem) => {
    elem.addEventListener('click', () => {
        toggleMenu();
        modal.style.transition = 'background-color .1s'
        setTimeout(() => modal.style.transition = '', 100)
    });
})


langInput.forEach((elem) => {
    elem.addEventListener('click', switchL)

});

portfolioButtons.forEach((element) => {
    changeImg(element);
    switchButton(element);
});

preloadSeasonsImages();
preloadImg();
toggleTheme.addEventListener('click', () => {
    chTh();
    changeThemeAnimation();
})

window.addEventListener('beforeunload', setLocalStorage)

const buttonGold = document.querySelectorAll('.button_gold')
buttonGold.forEach((elem) => elem.addEventListener('click', (e) => {
    setTimeout(() => e.target.style = 'overflow: hidden;', 0)
}))
let cl = false;
buttonGold.forEach((elem) => elem.addEventListener('click', function (e) {
    if (!cl) {
        const x = e.layerX
        const y = e.layerY

        const xInside = x;
        const yInside = y;

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)
        setTimeout(() => circle.remove(), 500)
        buttonGold.forEach((elem) => elem.addEventListener('mouseleave', (e) => {
            setTimeout(() => e.target.style = 'overflow: hidden;', 0)
            setTimeout(() => e.target.style = '', 0)
            circle.remove()
        }))
        cl = true
        setTimeout(() => cl = false, 300)
    }
}))

