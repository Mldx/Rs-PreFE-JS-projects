const ticItem = document.querySelectorAll('.tic__item');
const info = document.querySelector('.info')
const infoWinner = document.querySelector('.info__winner')
const infoNumMoves = document.querySelector('.info__numMoves')
const infoMode = document.querySelector('.info__mode')
const gameMode = document.querySelectorAll('.mode__item')
const recordTable = document.querySelector('.recordTable')
const recordButton = document.querySelector('.recordButton')
let rec = [];
rec = localStorage.getItem('recordsZ')?localStorage.getItem('recordsZ').split('\n'):[];
let gMode;
const rand = () => {
    return Math.floor(Math.random() * (8 - 0 + 1)) + 0;
}
let cross = true;
let numMov = 0;
const pvp = (elem) => {
    if (!elem.target.innerText && cross && !win(ticItem)) {
        elem.target.style.animation = '0.2s linear baseAnim';
        setTimeout(() => elem.target.style.animation = '', 200)
        elem.target.innerText = '✕';
        numMov++;
        cross = false;
        win(ticItem)
        if (win(ticItem) || numMov === 9) {
            info.style.visibility = 'visible'
            win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw';
            infoNumMoves.innerText = `Number of moves: ${numMov}`;
            infoWinner.style.display = 'flex';
            infoNumMoves.style.display = 'flex';
            letRec(win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw',`number of moves: ${numMov}`)
            numMov = 0;
            cross = true;

        }

    } else if (!elem.target.innerText && !cross && !win(ticItem)) {
        elem.target.style.animation = '0.2s linear baseAnim';
        setTimeout(() => elem.target.style.animation = '', 200)
        elem.target.innerText = '⭘';
        numMov++;
        cross = true;
        win(ticItem)
        if (win(ticItem) || numMov === 9) {
            info.style.visibility = 'visible'
            win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw';
            infoNumMoves.innerText = `Number of moves: ${numMov}`;
            infoWinner.style.display = 'flex';
            infoNumMoves.style.display = 'flex';
            letRec(win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw',`number of moves: ${numMov}`)
            numMov = 0;
            cross = true;
        }
    }
}
const pve = (elem) => {
    if (!elem.target.innerText && !win(ticItem)) {
        elem.target.style.animation = '0.2s linear baseAnim';
        setTimeout(() => elem.target.style.animation = '', 200)
        ticItem.forEach(e=>e.style.pointerEvents = 'none')
        setTimeout(() => ticItem.forEach(e=>e.style.pointerEvents = 'auto'), 300)
        elem.target.innerText = '✕';
        numMov++;
        if (numMov < 8) {
            setTimeout(()=>{
                for (let i = 0; i < 1; i) {
                    r = rand();
                    if (ticItem[r].innerText === '') {
                        numMov++
                        ticItem[r].style.animation = '0.2s linear baseAnim';
                        setTimeout(() => ticItem[r].style.animation = '', 200)
                        ticItem[r].innerText = '⭘';
                        i = 1
                        if (win(ticItem)) {
                            info.style.visibility = 'visible'
                            win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw';
                            infoNumMoves.innerText = `Number of moves: ${numMov}`;
                            infoWinner.style.display = 'flex';
                            infoNumMoves.style.display = 'flex';
                            letRec(win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw',`number of moves: ${numMov}`)
                        }
                    }
                }
            },300)
        }
        if (numMov >= 9) {
            info.style.visibility = 'visible'
            win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw';
            infoNumMoves.innerText = `Number of moves: ${numMov}`;
            infoWinner.style.display = 'flex';
            infoNumMoves.style.display = 'flex';
            letRec(win(ticItem) ? infoWinner.innerText = win(ticItem) : infoWinner.innerText = 'Draw',`number of moves: ${numMov}`)
        }

    }
}
gameMode.forEach((el, index) => el.addEventListener('click', (elem) => {
    index === 0 ? gMode = 'pve' : gMode = 'pvp';
    info.style.visibility = 'hidden';
    ticItem.forEach(el => el.innerText = '')

    if (gMode === 'pvp') {
        numMov = 0;
        ticItem.forEach((el) => el.removeEventListener('click', pve))
        ticItem.forEach((el) => el.addEventListener('click', pvp))
    }
    if (gMode === 'pve') {
        numMov = 0;
        ticItem.forEach((el) => el.removeEventListener('click', pvp))
        ticItem.forEach((el) => el.addEventListener('click', pve))
    }
}))

const win = (tic) => {
    if (ticItem[0].innerText === '✕' && ticItem[1].innerText === '✕' && ticItem[2].innerText === '✕' ||
        ticItem[3].innerText === '✕' && ticItem[4].innerText === '✕' && ticItem[5].innerText === '✕' ||
        ticItem[6].innerText === '✕' && ticItem[7].innerText === '✕' && ticItem[8].innerText === '✕' ||
        ticItem[0].innerText === '✕' && ticItem[3].innerText === '✕' && ticItem[6].innerText === '✕' ||
        ticItem[1].innerText === '✕' && ticItem[4].innerText === '✕' && ticItem[7].innerText === '✕' ||
        ticItem[2].innerText === '✕' && ticItem[5].innerText === '✕' && ticItem[8].innerText === '✕' ||
        ticItem[0].innerText === '✕' && ticItem[4].innerText === '✕' && ticItem[8].innerText === '✕' ||
        ticItem[2].innerText === '✕' && ticItem[4].innerText === '✕' && ticItem[6].innerText === '✕') {
        return 'Winner: ✕'
    } else if (ticItem[0].innerText === '⭘' && ticItem[1].innerText === '⭘' && ticItem[2].innerText === '⭘' ||
        ticItem[3].innerText === '⭘' && ticItem[4].innerText === '⭘' && ticItem[5].innerText === '⭘' ||
        ticItem[6].innerText === '⭘' && ticItem[7].innerText === '⭘' && ticItem[8].innerText === '⭘' ||
        ticItem[0].innerText === '⭘' && ticItem[3].innerText === '⭘' && ticItem[6].innerText === '⭘' ||
        ticItem[1].innerText === '⭘' && ticItem[4].innerText === '⭘' && ticItem[7].innerText === '⭘' ||
        ticItem[2].innerText === '⭘' && ticItem[5].innerText === '⭘' && ticItem[8].innerText === '⭘' ||
        ticItem[0].innerText === '⭘' && ticItem[4].innerText === '⭘' && ticItem[8].innerText === '⭘' ||
        ticItem[2].innerText === '⭘' && ticItem[4].innerText === '⭘' && ticItem[6].innerText === '⭘') {
        return 'Winner: ⭘'
    }
}


recordButton.addEventListener('click',()=>{
    if (recordTable.style.left===''){
    recordTable.style.left = '0';
    } else if (recordTable.style.left==='0px'){
        recordTable.style.left = '';
    }
})

const letRec = (winner, moves) => {
    let recCopy = [];
    if (rec.length<10){
        rec.push(`${rec.length+1}. ${winner}, ${moves}`)

    } else {
        rec.shift();
        rec.push(`${rec.length+1}. ${winner}, ${moves}`)

    }
    recCopy = rec.map((el,index)=>{
        return `${el.split('.')[0]=index+1}. ${el.split('.')[1]}`
    })

    recordTable.innerText = recCopy.join('\n');
    localStorage.setItem('recordsZ', `${recCopy.join('\n')}`);
}

rec.length===0?recordTable.innerText='No records':recordTable.innerText=rec.join('\n')


