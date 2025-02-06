var loader = document.querySelector('.loader')

loader.classList.add('active')

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

openModalUpdate.addEventListener('click', () => {
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
})

var btnEstatus = document.querySelector('.btnEstatus')

btnEstatus.addEventListener('click', () => {
    btnEstatus.classList.toggle('active')
})

var body = document.querySelector('body');

var leerDarkMode = localStorage.getItem('darkMode');

if (leerDarkMode === 'active') {
    body.classList.add('darkMode');
}
