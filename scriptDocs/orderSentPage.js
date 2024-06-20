// GET CLIENT NAME FROM LOCALSTORAGE TO DISPLAY IN THANK YOU PAGE

document.addEventListener('DOMContentLoaded', () => {
    let lSName = JSON.parse(localStorage.getItem('clientName'))
    let name = document.querySelector('.client-Name');
    name.textContent = lSName
})

