 const openMenu = document.querySelector('.openMenu');
 const menu = document.querySelector('.menu-list')
// OPEN AND CLOSE THE MENU 
openMenu.addEventListener('click', () => {
    menu.classList.toggle('show')
    openMenu.classList.toggle('fa-x')    
})
