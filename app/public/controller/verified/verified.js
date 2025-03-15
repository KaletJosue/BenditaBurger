var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

var modal2 = document.querySelector('.modal2')
var closeModal2 = document.querySelector('#closeModal2')
var tryAgain2 = document.querySelector('.tryAgain2')
var textErrorModal2 = document.querySelector('.textErrorModal2')

const inputs = document.querySelectorAll('.code input');

inputs.forEach((input, index) => {
    input.setAttribute("maxLength", 1);

    input.addEventListener('input', (e) => {
        input.value = input.value.slice(0, 1);

        if (index < inputs.length - 1 && input.value !== '') {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === '' && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

const btnSend = document.querySelector('.sendVerified')

btnSend.addEventListener('click', async () => {
    let code = '';

    inputs.forEach(input => {
        code += input.value;
    });
    
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/verified", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Code: code
        })
    })

    const resJson = await res.json()

    if (resJson.redirect) {
        loader.classList.add('active')
        textErrorModal2.textContent = resJson.message
        modal2.classList.add('active')
        closeModal2.addEventListener('click', () => {
            modal2.classList.remove('active')
        })
        tryAgain2.addEventListener('click', () => {
            window.location.href = resJson.redirect
        })
        window.addEventListener('click', event => {
            if (event.target == modal2) {
                modal2.classList.remove('active')
            }
        })
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
});
