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

var inputName = document.querySelector('.nameRegister')
var inputEmail = document.querySelector('.emailRegister')
var inputPassword = document.querySelector('.passwordRegister')

var sendData = document.querySelector('#btnRegister')

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

sendData.addEventListener('click', async () => {
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: inputName.value,
            Email: inputEmail.value,
            Password: inputPassword.value
        })
    })

    const resJson = await res.json()

    if (resJson.redirect) {
        window.location.href = resJson.redirect
    } else if (resJson.status) {
        loader.classList.add('active')
        textErrorModal.textContent = resJson.message
        modal.classList.add('active')
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
    }
})

var emailLogin = document.querySelector('.emailLogin')
var passwordLogin = document.querySelector('.passwordLogin')

var sendLogin = document.querySelector('#btnLogin')

sendLogin.addEventListener('click', async () => {
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Email: emailLogin.value,
            Password: passwordLogin.value
        })
    })

    const resJson = await res.json()

    if (resJson.redirect) {
        window.location.href = resJson.redirect
    } else if (resJson.status) {
        loader.classList.add('active')
        textErrorModal.textContent = resJson.message
        modal.classList.add('active')
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
    }
})
