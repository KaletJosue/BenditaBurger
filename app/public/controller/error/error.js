document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"

var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

var params = getQueryParams();
var errorMessage = params.message || "Ocurrió un error inesperado."

textErrorModal.textContent = errorMessage
modal.classList.add('active')
tryAgain.addEventListener('click', () => {
    window.location.href = "signIn"
})
