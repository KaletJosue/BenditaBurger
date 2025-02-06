var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var btnMoveContainers = document.querySelectorAll('.btnMoveContainers')
var containers = document.querySelectorAll('.container')

var title = document.querySelector('.title')

btnMoveContainers.forEach((move) => {
    move.addEventListener('click', () => {
        containers.forEach((container) => {
            container.classList.toggle('active')
            if (container.classList == "container active") {
                title.textContent = "Registrate | Bendita Burger"
            } else {
                title.textContent = "Iniciar Sesión | Bendita Burger"
            }
        })
    })
})

var eyePass = document.querySelector('#eyePass')
var eyePassRegister = document.querySelector('#eyePassRegister')

var inputContra = document.querySelector('#inputContra')
var inputContraRegis = document.querySelector('#inputContraRegis')

eyePass.addEventListener('click', () => {
    eyePass.classList.toggle('active')
    if (inputContra.type == "text") {
        inputContra.type = "password"
    } else {
        inputContra.type = "text"
    }
})

eyePassRegister.addEventListener('click', () => {
    eyePassRegister.classList.toggle('active')
    if (inputContraRegis.type == "text") {
        inputContraRegis.type = "password"
    } else {
        inputContraRegis.type = "text"
    }
})

var rememberPassword = document.querySelector('.rememberPassword')
var closeRememberPassword = document.querySelector('#closeRemember')
var btnRemember = document.querySelector('.btnRemember')

btnRemember.addEventListener('click', () => {
    rememberPassword.classList.add('active')
    closeRememberPassword.addEventListener('click', () => {
        rememberPassword.classList.remove('active')
    })
    window.addEventListener('click', event => {
        if (event.target == rememberPassword) {
            rememberPassword.classList.remove('active')
        }
    })
})

