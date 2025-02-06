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

var btnUpdate = document.querySelector('.btnUpdate')

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

var btnUser = document.querySelector('.user')

btnUser.addEventListener('click', () => {
    location.href = "/views/admin/users/users.html"
})

var leerDarkMode = localStorage.getItem('darkMode');
var body = document.querySelector('body');

if (leerDarkMode === 'active') {
    body.classList.add('darkMode');
}