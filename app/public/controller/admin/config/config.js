var loader = document.querySelector('.loader')

loader.classList.add('active')

const openModalAdd = document.querySelector('.security');
const modalAdd = document.querySelector('.modalAdd');
const modalContentAdd = document.querySelector('.conModalAdd');
const closeModalAdd = document.querySelector('#closeModalAdd');
const cancelModalAdd = document.querySelector('.cancelModalAdd');

openModalAdd.addEventListener('click', () => {
    modalAdd.style.display = 'flex';

    gsap.fromTo(
        modalContentAdd,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: '100%',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: 0.7,
            ease: 'expo.out',
        }
    );

    window.addEventListener('click', (event) => {
        if (event.target === modalAdd) {
            gsap.to(modalContentAdd, {
                height: '0px',
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    modalAdd.style.display = 'none';
                },
            });
        }
    });

    closeModalAdd.addEventListener('click', () => {
        gsap.to(modalContentAdd, {
            height: '0px',
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                modalAdd.style.display = 'none';
            },
        });
    });

    cancelModalAdd.addEventListener('click', () => {
        gsap.to(modalContentAdd, {
            height: '0px',
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                modalAdd.style.display = 'none';
                inputNameAdd.value = ''
                inputCategoryAdd.value = ''
                btnAdd.classList.remove('active')
                btnAdd.disabled = true
            },
        });
    })
});

var inputNameAdd = document.querySelector('.inputNameAdd');
var inputCategoryAdd = document.querySelector('.inputCategoryAdd');
var btnAdd = document.querySelector('.btnAdd');

inputNameAdd.addEventListener('input', () => {
    if (inputNameAdd.value.length !== 0 && inputCategoryAdd.value.length !== 0) {
        btnAdd.classList.add('active');
        btnAdd.disabled = false;
    } else {
        btnAdd.classList.remove('active');
        btnAdd.disabled = true;
    }
});

inputCategoryAdd.addEventListener('input', () => {
    if (inputNameAdd.value.length !== 0 && inputCategoryAdd.value.length !== 0) {
        btnAdd.classList.add('active');
        btnAdd.disabled = false;
    } else {
        btnAdd.classList.remove('active');
        btnAdd.disabled = true;
    }
});

const openModalUpdate = document.querySelector('.info');
const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.querySelectorAll('#closeModalUpdate')

openModalUpdate.addEventListener('click', () => {
    modalUpdate.style.display = 'flex'

    gsap.fromTo(modalContentUpdate,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: '100%',
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
    closeModalUpdate.forEach((closeModalUpdateBtn) => {
        closeModalUpdateBtn.addEventListener('click', () => {
            gsap.to(modalContentUpdate, {
                height: '0px',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalUpdate.style.display = 'none';
                }
            });
        })
    })
})

var inputNameUpdate = document.querySelector('.inputNameUpdate')
var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
var inputPhoneUpdate = document.querySelector('.inputPhoneUpdate')
var inputDirectionUpdate = document.querySelector('.inputDirectionUpdate')
var inputPhoto = document.querySelector('#inputPhoto')

const photoProfileUpdate = document.querySelector('.photoProfile')

inputPhoto.addEventListener('change', e => {
    if (e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
            photoProfileUpdate.src = e.target.result
        }
        reader.readAsDataURL(e.target.files[0])
    }
})

inputPhoto.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPhoneUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhoto.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputNameUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPhoneUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputCategoryUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPhoneUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputPhoneUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPhoneUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputDirectionUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPhoneUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

var leerDarkMode = localStorage.getItem('darkMode');
var body = document.querySelector('body');

if (leerDarkMode === 'active') {
    body.classList.add('darkMode');
}

const res = await fetch("http://localhost:4000/api/userData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJson = await res.json()

var btnUser = document.querySelector('.user')
var btnSecurity = document.querySelector('.security')
var imgProfile = document.querySelector('.profile')
var gmail = document.querySelector('.correo')
var nombre = document.querySelector('.name')

var photoProfile = document.querySelector('.photoProfile')
var inputNameUpdate = document.querySelector('.inputNameUpdate')
var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
var inputPhoneUpdate = document.querySelector('.inputPhoneUpdate')
var inputDirectionUpdate = document.querySelector('.inputDirectionUpdate')

nombre.textContent = resJson.data.Nombre
inputNameUpdate.value = resJson.data.Nombre
gmail.textContent = resJson.data.Email
inputCategoryUpdate.value = resJson.data.Email
inputPhoneUpdate.value = resJson.data.Phone
inputDirectionUpdate.value = resJson.data.Direccion

if (resJson.data.Photo == "") {
    imgProfile.src = "/assets/profile-5.jpg"
    photoProfile.src = "/assets/profile-5.jpg"
} else {
    imgProfile.src = resJson.data.Photo
    photoProfile.src = resJson.data.Photo
}

if (resJson.data.Rol == "SuperAdministrador") {
    btnUser.addEventListener('click', () => {
        location.href = "/admin/users"
    })
} else {
    btnUser.style.display = "none"
}

var btnUpdate = document.querySelector('.btnUpdate')

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

btnUpdate.addEventListener('click', async () => {
    const formData = new FormData();
    formData.append('Name', inputNameUpdate.value);
    formData.append('Phone', inputPhoneUpdate.value);
    formData.append('Direccion', inputDirectionUpdate.value);

    const file = inputPhoto.files[0];
    if (file) {
        formData.append('profilePic', file);
    }

    loader.classList.remove('active');

    const res = await fetch("http://localhost:4000/api/updateUser", {
        method: "PUT",
        body: formData,
    });

    const resJson = await res.json();

    if (resJson.status == "Update correct") {
        location.reload();
    } else {
        loader.classList.add('active');
        textErrorModal.textContent = resJson.message;
        modal.classList.add('active');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active');
            }
        });
    }
});

var btnUpdatePassword = document.querySelector('.btnAdd')

var password = document.querySelector('.inputNameAdd')
var confirPassword = document.querySelector('.inputCategoryAdd')

btnUpdatePassword.addEventListener('click', async () => {
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/updatePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Password: password.value,
            ConfirPassword: confirPassword.value,
        })
    })

    const resJson = await res.json()

    if (resJson.status == "Update correct") {
        location.reload()
    } else {
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

var deleteUser = document.querySelector('.delete')

var modal2 = document.querySelector('.modal2')
var closeModal2 = document.querySelector('#closeModal2')
var logOut2 = document.querySelector('.logOut2')
var tryAgain2 = document.querySelector('.tryAgain2')

deleteUser.addEventListener('click', () => {
    modal2.classList.add('active')
    closeModal2.addEventListener('click', () => {
        modal2.classList.remove('active')
    })
    logOut2.addEventListener('click', async () => {
        loader.classList.remove('active')
        const res = await fetch("http://localhost:4000/api/deleteUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resJson = await res.json()

        if (resJson.redirect) {
            document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"
            document.location.href = "/"
        } else {
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
    tryAgain2.addEventListener('click', () => {
        modal2.classList.remove('active')
    })
    window.addEventListener('click', event => {
        if (event.target == modal2) {
            modal2.classList.remove('active')
        }
    })
})