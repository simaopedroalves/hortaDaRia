const openMenu = document.querySelector('.fa-bars-staggered');
const closeMenu = document.querySelector('.fa-x');
const menu = document.querySelector('.menu-list')

function showMenu() {
    menu.style.display = 'grid';
    openMenu.style.display = 'none';
    closeMenu.style.display = 'grid';
}

function desappearMenu() {
    menu.style.display = 'none';
    openMenu.style.display = 'grid';
    closeMenu.style.display = 'none';
}

// closeMenu.addEventListener('click', () => {
//     // desappearMenu()
// })
 openMenu.addEventListener('click', () => {
     // showMenu()
     menu.classList.toggle('show')
 })
