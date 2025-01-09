var loader = document.querySelector('.loader')
var logo = document.querySelector('.nav img')
var li = document.querySelectorAll('.nav ul li')
var textHero = document.querySelector('.textHero')
var ham = document.querySelector('.hero img')
var down = document.querySelector('#down')

window.addEventListener('load', function () {
    loader.classList.add('active')
    logo.classList.add('active')
    li.forEach((option) => {
        option.classList.add('active')
    })
    textHero.classList.add('active')
    ham.classList.add('active')
    down.classList.add('active')
});

var openMenu = document.getElementById('openMenu')
var closeMenu = document.getElementById('closeMenu')
var menu = document.querySelector('.nav ul')
var optionsMenu = document.querySelectorAll('.nav ul li')

var our = document.querySelector('.our')
var footer = document.querySelector('footer')

window.addEventListener('click', event => {
    if (event.target == menu) {
        closeMenu.classList.remove('active')
        openMenu.classList.remove('active')
        menu.classList.remove('active')
        our.style.zIndex = "0"
        footer.style.zIndex = "0"
    }
})

optionsMenu.forEach((optionMenu) => {
    optionMenu.addEventListener('click', () => {
        closeMenu.classList.remove('active')
        openMenu.classList.remove('active')
        menu.classList.remove('active')
        our.style.zIndex = "0"
        footer.style.zIndex = "0"
    })
})

openMenu.addEventListener('click', () => {
    closeMenu.classList.add('active')
    openMenu.classList.add('active')
    menu.classList.add('active')
    our.style.zIndex = "-1"
    footer.style.zIndex = "-1"
})

closeMenu.addEventListener('click', () => {
    closeMenu.classList.remove('active')
    openMenu.classList.remove('active')
    menu.classList.remove('active')
    our.style.zIndex = "0"
    footer.style.zIndex = "0"
})

var video = document.querySelector('#video')
const playPauseBtn = document.getElementById('playPauseBtn');

playPauseBtn.addEventListener('click', () => {
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            if (video.paused) {
                video.play();
                playPauseBtn.classList.add('active')
            } else {
                video.pause();
                playPauseBtn.classList.remove('active')
            }
        }
    });
    if (video.paused) {
        video.play();
        playPauseBtn.classList.add('active')
    } else {
        video.pause();
        playPauseBtn.classList.remove('active')
    }
});

video.addEventListener('click', () => {
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            if (video.paused) {
                video.play();
                playPauseBtn.classList.add('active')
            } else {
                video.pause();
                playPauseBtn.classList.remove('active')
            }
        }
    });
    if (video.paused) {
        video.play();
        playPauseBtn.classList.add('active')
    } else {
        video.pause();
        playPauseBtn.classList.remove('active')
    }
});

video.addEventListener('ended', () => {
    playPauseBtn.classList.remove('active')
    video.currentTime = 0;
});

var contac = document.querySelector('.contac')

contac.addEventListener('click', () => {
    window.open('https://wa.me/573229645600', '_blanck')
})