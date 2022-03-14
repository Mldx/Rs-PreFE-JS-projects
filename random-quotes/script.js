const jTitle = document.querySelector('.quotes__title')
const jText = document.querySelector('.quotes__text')
const jButton = document.querySelector('.quotes__button')
const jLang = document.querySelectorAll('.lang__input')
const shadow = document.querySelector('.shadow')

const rand = (max) => {
    return Math.trunc(Math.random() * (max - 1) + 1)
}
const randRGB = () => {
    return `rgb(${Math.trunc(Math.random() * (255 - 1) + 1)},` +
               `${Math.trunc(Math.random() * (255 - 1) + 1)},`+
               `${Math.trunc(Math.random() * (255 - 1) + 1)})`;
}

const randomQuote = (data) => {
    let x = rand(data.length)
    jTitle.textContent = data[x]['author']
    jText.textContent = data[x]['text']
}
const isRu = () => {
    let temp;
    jLang.forEach(el => {
        if (el.id === 'ru' && el.checked) {
            temp = true;
        }
    })
    return Boolean(temp);
}

async function getData() {

    if (isRu()) {
        const quotes = 'others/quotes_ru.json';
        const res = await fetch(quotes);
        const data = await res.json();
        randomQuote(data)
    } else if (!isRu()) {
        const quotes = 'others/quotes_eng.json';
        const res = await fetch(quotes);
        const data = await res.json();
        randomQuote(data)
    }
}

getData();
shadow.style = `box-shadow: 0 0 15px ${randRGB()}`

jButton.addEventListener('click', () => {
    getData()
    shadow.style = `box-shadow: 0 0 15px ${randRGB()}`
})

