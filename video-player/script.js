const video = document.querySelector('.video-player__viewer');
const videoPlayer = document.querySelector('.video-player');
const playButtons = [document.querySelector('.video-player__play'),
    document.querySelector('.controls__play')]
const playerViewer = document.querySelector('.video-player__viewer')
const rangeProgress = document.querySelector('.range_progress')
const rangeVolume = document.querySelector('.range_volume')
const controlsVolume = document.querySelector('.controls__volume')
const controlsPanel = document.querySelector('.video-player__controls')
const timeDuration = document.querySelector('.time__duration')
const timeCurrent = document.querySelector('.time__current')
const timeSlash = document.querySelector('.time__slash')
const poster = document.querySelector('.poster')
let tempVolume = 10;


const playPause = () => {
    if (!playButtons[1].classList.contains('controls__pause')) {
        video.play();
        playButtons[0].style.display = 'none';
        playButtons[1].classList.toggle('controls__pause')

    } else {
        video.pause();
        playButtons[0].style.display = 'flex';
        playButtons[1].classList.toggle('controls__pause')
    }
}
const vPlay = () => {
    if (!playButtons[1].classList.contains('controls__pause')) {
        video.play();
        playButtons[0].style.display = 'none';
        playButtons[1].classList.add('controls__pause')
    }
}
const vPause = () => {
    if (playButtons[1].classList.contains('controls__pause')) {
        video.pause();
        playButtons[0].style.display = 'flex';
        playButtons[1].classList.remove('controls__pause')
    }
}

playButtons.forEach((el) => el.addEventListener('click', () => {
    playPause();
    poster.style.opacity = '0';
    setTimeout(() => poster.style.display = 'none', 500)
    timeDuration.innerText = `${String(Math.trunc(video.duration / 60)).padStart(2, '0')}:${String((video.duration % 60).toFixed(0)).padStart(2, '0')}`

}))
playerViewer.addEventListener('click', () => {
    playPause()
})
playerViewer.addEventListener('mousemove',()=>{
    controlsPanel.style.bottom = '0'
})

playerViewer.addEventListener('mouseenter', () => {
    controlsPanel.style.bottom = '0'
})
playerViewer.addEventListener('mouseleave', () => {
    if (playButtons[1].classList.contains('controls__pause')) {
        controlsPanel.style.bottom = '-60px'
    }
})
controlsPanel.addEventListener('mouseenter', () => {
    controlsPanel.style.bottom = '0'
})
controlsPanel.addEventListener('mouseleave', () => {
    if (playButtons[1].classList.contains('controls__pause')) {
        controlsPanel.style.bottom = '-60px'
    }
})

rangeProgress.addEventListener('input', () => {
    timeCurrent.innerText = `${String(Math.trunc(video.currentTime / 60)).padStart(2, '0')}:${String((video.currentTime % 60).toFixed(0)).padStart(2, '0')}`
    let temp = video.duration / 100;
    video.currentTime = rangeProgress.value * temp;
    vPause()
    playButtons[0].style.display = 'none';

    rangeProgress.style = `background:linear-gradient(to right,` +
        `#CC6666 0%,` +
        `#CC6666 ${rangeProgress.value}%,` +
        `rgb(200, 200, 200) ${rangeProgress.value}%,` +
        `rgb(200, 200, 200) 100%);`
})

rangeProgress.addEventListener('mouseup', () => {
    if (video.currentTime !== video.duration) {
        vPlay()
    }
})

video.addEventListener('timeupdate', () => {
    timeCurrent.innerText = `${String(Math.trunc(video.currentTime / 60)).padStart(2, '0')}:${String((video.currentTime % 60).toFixed(0)).padStart(2, '0')}`
    let temp = video.currentTime / (video.duration / 100);
    rangeProgress.value = temp.toFixed(1);

    rangeProgress.style = `background:linear-gradient(to right,` +
        `#CC6666 0%,` +
        `#CC6666 ${rangeProgress.value}%,` +
        `rgb(200, 200, 200) ${rangeProgress.value}%,` +
        `rgb(200, 200, 200) 100%);`
    if (rangeProgress.value === '100') {
        vPause()
        controlsPanel.style.bottom = '0'
    }

})
video.volume = rangeVolume.value / 100;
rangeVolume.addEventListener('input', () => {
    video.muted = false
    video.volume = rangeVolume.value / 100;
    rangeVolume.style = `background:linear-gradient(to right,` +
        `#CC6666 0%,` +
        `#CC6666 ${rangeVolume.value}%,` +
        `rgb(200, 200, 200) ${rangeVolume.value}%,` +
        `rgb(200, 200, 200) 100%);`
    rangeVolume.value === '0' ? controlsVolume.classList.add('muted') : controlsVolume.classList.remove('muted');
})

rangeVolume.addEventListener('mousedown', () => {
    tempVolume = rangeVolume.value;
})

rangeVolume.addEventListener('change', () => {
    if (rangeVolume.value === '0') {
        video.muted = true
    }
})

controlsVolume.addEventListener('click', () => {

    video.muted ? video.muted = false : video.muted = true
    controlsVolume.classList.toggle('muted')

    if (video.muted) {
        tempVolume = rangeVolume.value
        rangeVolume.style = `background:linear-gradient(to right,` +
            `#CC6666 0%,` +
            `#CC6666 0%,` +
            `rgb(200, 200, 200) 0%,` +
            `rgb(200, 200, 200) 100%);`
        rangeVolume.value = '0';
    } else if (!video.muted) {
        if (tempVolume === '0') {
            rangeVolume.value = '10';
            video.volume = rangeVolume.value / 100
            rangeVolume.style = `background:linear-gradient(to right,` +
                `#CC6666 0%,` +
                `#CC6666 ${rangeVolume.value}%,` +
                `rgb(200, 200, 200) ${rangeVolume.value}%,` +
                `rgb(200, 200, 200) 100%);`
        } else {
            rangeVolume.value = tempVolume;
            video.volume = rangeVolume.value / 100
            rangeVolume.style = `background:linear-gradient(to right,` +
                `#CC6666 0%,` +
                `#CC6666 ${rangeVolume.value}%,` +
                `rgb(200, 200, 200) ${rangeVolume.value}%,` +
                `rgb(200, 200, 200) 100%);`
        }
    }
})

document.addEventListener('keydown', (event) => {
    let keyCode = event.keyCode;
    if (keyCode === 32) {
        playPause()
        if (poster.style.display !== 'none') {
            document.addEventListener('keydown', volumeUpDown)
            poster.style.opacity = '0';
            setTimeout(() => poster.style.display = 'none', 500)
            timeDuration.innerText = `${String(Math.trunc(video.duration / 60)).padStart(2, '0')}:${String((video.duration % 60).toFixed(0)).padStart(2, '0')}`
        }
        if (playButtons[1].classList.contains('controls__pause')) {
            controlsPanel.style.bottom = '-60px'
        } else {
            controlsPanel.style.bottom = '0'
        }

    }
    if (keyCode === 39) {
        video.currentTime += 5;
    }
    if (keyCode === 37) {
        video.currentTime -= 5;
    }
})
const playerIsActive = (event) => {
    let temp = false;
    const x = [video,
        videoPlayer,
        ...playButtons,
        playerViewer,
        rangeProgress,
        rangeVolume,
        controlsVolume,
        controlsPanel,
        timeDuration,
        timeCurrent,
        timeSlash,
        poster]
    x.forEach((el) => {
        if (el === event.target) {
            temp = true
        }
    })
    return temp;

}

const volumeUpDown = (e) => {
    let keyCode = e.keyCode;
    if (keyCode === 38) {
        e.preventDefault();
        video.muted = false
        controlsVolume.classList.remove('muted')
        rangeVolume.value = String(Number(rangeVolume.value) + 10)
        video.volume = rangeVolume.value / 100
        rangeVolume.style = `background:linear-gradient(to right,` +
            `#CC6666 0%,` +
            `#CC6666 ${rangeVolume.value}%,` +
            `rgb(200, 200, 200) ${rangeVolume.value}%,` +
            `rgb(200, 200, 200) 100%);`
    }
    if (keyCode === 40) {
        e.preventDefault();
        rangeVolume.value = String(Number(rangeVolume.value) - 10)
        video.volume = rangeVolume.value / 100
        rangeVolume.style = `background:linear-gradient(to right,` +
            `#CC6666 0%,` +
            `#CC6666 ${rangeVolume.value}%,` +
            `rgb(200, 200, 200) ${rangeVolume.value}%,` +
            `rgb(200, 200, 200) 100%);`
        if (rangeVolume.value!=='0'){
            video.muted = false
            controlsVolume.classList.remove('muted')
        } else if (rangeVolume.value ==='0'){
            video.muted = true
            controlsVolume.classList.add('muted')
        }
    }
}

document.addEventListener('click', (event) => {
    if (playerIsActive(event)) {
        document.addEventListener('keydown', volumeUpDown)
    } else {
        document.removeEventListener('keydown', volumeUpDown)
    }
})


//---------------Log-----------------
const check = String.fromCodePoint(0x2714)
const font = 'color: #CC6666; font-family:Comic Sans MS; font-size: 18px; font-weight: 400;'

console.log(`%cВсего баллов 70/70:`, `${font}`)

console.log(`1. Вёрстка +10 ${check}
2. Кнопка Play/Pause на панели управления +10 ${check}
3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10 ${check}
4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10 ${check}
5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10 ${check}
6. Кнопка Play/Pause в центре видео +10 ${check}
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 ${check}`);

