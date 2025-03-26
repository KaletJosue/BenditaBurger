var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const res = await fetch("http://localhost:4000/api/userDataControl", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJson = await res.json()

if (resJson.status == "Data Users") {
    var tbody = document.querySelector('.tbody')

    const usersData = resJson.data;

    usersData.forEach((doc) => {
        var tr = document.createElement('tr')
        var thImg = document.createElement('th')
        var divUser = document.createElement('div')
        var img = document.createElement('img')
        var nameUser = document.createElement('p')
        var gmail = document.createElement('th')
        var direccion = document.createElement('th')
        var telefono = document.createElement('th')
        var rol = document.createElement('th')
        var thStatus = document.createElement('th')
        var divStatus = document.createElement('div')
        var active = document.createElement('p')
        var inactive = document.createElement('p')
        var thActions = document.createElement('th')
        var divActions = document.createElement('div')
        var editAction = document.createElement('button')

        img.src = doc.Foto
        nameUser.textContent = doc.Nombre
        gmail.textContent = doc.Correo
        direccion.textContent = doc.Direccion
        telefono.textContent = doc.Telefono
        rol.textContent = doc.Rol
        active.textContent = "Activo"
        inactive.textContent = "Inactivo"
        editAction.textContent = "Editar"

        divUser.className = "img"
        divStatus.className = "btnEstatus"
        divActions.className = "actions"

        if (doc.Estado == true) {
            divStatus.classList.remove('active')
        } else {
            divStatus.classList.add('active')
        }

        tbody.appendChild(tr)
        tr.appendChild(thImg)
        thImg.appendChild(divUser)
        divUser.appendChild(img)
        divUser.appendChild(nameUser)
        tr.appendChild(gmail)
        tr.appendChild(direccion)
        tr.appendChild(telefono)
        tr.appendChild(rol)
        tr.appendChild(thStatus)
        thStatus.appendChild(divStatus)
        divStatus.appendChild(active)
        divStatus.appendChild(inactive)
        tr.appendChild(thActions)
        thActions.appendChild(divActions)
        divActions.appendChild(editAction)

        divStatus.addEventListener('click', async () => {
            divStatus.classList.toggle('active')

            if (divStatus.classList == "btnEstatus") {
                const resStatus = await fetch("http://localhost:4000/api/userDataControl/updateStatus", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Estatus: true,
                        Gmail: doc.Correo
                    })
                })
                
                const resJsonStatus = await resStatus.json()
    
                if (resJsonStatus.status = "Update Correct") {
                    location.reload()
                } else {
                    textErrorModal.textContent = resJsonStatus.message
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
            } else {
                const resStatus = await fetch("http://localhost:4000/api/userDataControl/updateStatus", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Estatus: false,
                        Gmail: doc.Correo
                    })
                })
                
                const resJsonStatus = await resStatus.json()
    
                if (resJsonStatus.status = "Update Correct") {
                    location.reload()
                } else {
                    textErrorModal.textContent = resJsonStatus.message
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
            }
        })

        editAction.addEventListener('click', () => {
            modalUpdate.style.display = 'flex'
        
            gsap.fromTo(modalContentUpdate,
                { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                {
                    height: 'auto',
                    opacity: 1,
                    backdropFilter: 'blur(90px)',
                    duration: .7,
                    ease: 'expo.out',
                }
            )
            window.addEventListener('click', event => {
                if (event.target == modalUpdate) {
                    gsap.to(modalContentUpdate, {
                        height: '0px',
                        duration: .2,
                        ease: 'power1.in',
                        onComplete: () => {
                            modalUpdate.style.display = 'none';
                        }
                    });
                }
            })
            closeModalUpdate.addEventListener('click', () => {
                gsap.to(modalContentUpdate, {
                    height: '0px',
                    duration: .2,
                    ease: 'power1.in',
                    onComplete: () => {
                        modalUpdate.style.display = 'none';
                    }
                });
            })

            let inputNameUpdate = document.querySelector('.inputNameUpdate')
            let btnUpdate = document.querySelector('.btnUpdate')

            inputNameUpdate.value = doc.Rol

            btnUpdate.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resUpdate = await fetch("http://localhost:4000/api/userUpdate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Gmail: doc.Correo,
                        Rol: inputNameUpdate.value
                    })
                })
                
                const resJsonUpdate = await resUpdate.json()

                if (resJsonUpdate.status == "Update Correct") {
                    location.reload()
                } else {
                    loader.classList.add('active')
                    textErrorModal.textContent = resJsonUpdate.message
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
        })
    })

} else {
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

const openModalUpdate = document.querySelector('.openModalUpdate');
const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.getElementById('closeModalUpdate')

var inputNameUpdate = document.querySelector('.inputNameUpdate')

var btnUpdate = document.querySelector('.btnUpdate')

inputNameUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

var body = document.querySelector('body');

var leerDarkMode = localStorage.getItem('darkMode');

if (leerDarkMode === 'active') {
    body.classList.add('darkMode');
}
