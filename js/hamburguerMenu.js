/*-------------------- Menú hamburguesa del header. --------------------*/

const menuIconContainer = document.querySelector('.menu-icon-container')
const body = document.querySelector('body')
const navbar = document.querySelector('.header_navbar')
const header = document.querySelector('.header_global')
const headerLogo = document.querySelector('.header_logo')
const headerIconsSearch = document.querySelector('.header_icons_search')
const headerIconsBag = document.querySelector('.header_icons_bag')

menuIconContainer.addEventListener('click', () =>{
    menuIconContainer.classList.toggle('active')
    body.classList.toggle('active')
    navbar.classList.toggle('active')
    header.classList.toggle('active')
    headerLogo.classList.toggle('active')
    headerIconsSearch.classList.toggle('active')
    headerIconsBag.classList.toggle('active')
})