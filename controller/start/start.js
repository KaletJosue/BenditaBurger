var openMenu = document.getElementById('openMenu')
var closeMenu = document.getElementById('closeMenu')
var menu = document.querySelector('.nav ul')
var optionsMenu = document.querySelectorAll('.nav ul li')

window.addEventListener('click', event => {
    if (event.target == menu) {
        closeMenu.classList.remove('active')
        openMenu.classList.remove('active')
        menu.classList.remove('active')
    }
})

optionsMenu.forEach((optionMenu) => {
    optionMenu.addEventListener('click', () => {
        closeMenu.classList.remove('active')
        openMenu.classList.remove('active')
        menu.classList.remove('active')
    })
})

openMenu.addEventListener('click', () => {
    closeMenu.classList.add('active')
    openMenu.classList.add('active')
    menu.classList.add('active')
})

closeMenu.addEventListener('click', () => {
    closeMenu.classList.remove('active')
    openMenu.classList.remove('active')
    menu.classList.remove('active')
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