const openMenu = document.querySelector('.fa-bars-staggered');
const closeMenu = document.querySelector('.fa-x');
const menu = document.querySelector('.menu-list')

function showMenu() {
    menu.style.display = 'grid';
    openMenu.style.display = 'none';
    closeMenu.style.display = 'flex';
}

function desappearMenu() {
    menu.style.display = 'none';
    openMenu.style.display = 'flex';
    closeMenu.style.display = 'none';
}

openMenu.addEventListener('click', () => {
    showMenu()
})

closeMenu.addEventListener('click', () => {
    desappearMenu()
})