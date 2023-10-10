/*-------------------- Botón light/dark theme. --------------------*/

const buttonThemeChanger = document.getElementById('buttonThemeChanger')
const body = document.querySelector('body')

localStorage.theme == undefined && localStorage.setItem('theme', 'light')

buttonThemeChanger.onclick = () => {
    buttonThemeChanger.classList.toggle('active')
    body.classList.toggle('dark')

    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
}

if (localStorage.theme === 'dark') {
    buttonThemeChanger.classList.add('active')
    body.classList.add('dark')
} else if (localStorage.theme === 'light') {
    buttonThemeChanger.classList.remove('active')
    body.classList.remove('dark')
}

/*-------------------- Notificación para el Carrito. --------------------*/

function notificacionCarrito() {
    let carrito = recuperarCarrito()
    let totalUnidades = 0

    carrito.forEach(producto => {
        totalUnidades += producto.unidades
    })

    const bagNotification = document.getElementById('headerIconsBagNotification')
    if (totalUnidades > 0) {
        bagNotification.textContent = totalUnidades
        bagNotification.classList.add('active')
    } else {
        bagNotification.textContent = ''
        bagNotification.classList.remove('active')
    }
}
notificacionCarrito()

/*-------------------- Botón Search & Menú Hamburguesa. --------------------*/

const menuIconContainer = document.querySelector('.menu-icon-container')
const navbar = document.querySelector('.header_navbar')
const header = document.querySelector('.header_global')
const headerLogo = document.querySelector('.header_logo')
const headerIconsSearch = document.querySelector('.header_icons_search')
const headerIconsBag = document.querySelector('.header_icons_bag')
const headerSearchBlur = document.querySelector('.header_search_blur')
const headerSearchContainerTotal = document.querySelector('.header_search_container_total')
const headerSearchContainer = document.querySelector('.header_search_container')
const searchForm = document.querySelector('.header_search_container form')
const searchInput = document.querySelector('.header_search_container_input')

let isNavbarOpen = false
let isSearchOpen = false

function toggleNavbar() {
    isSearchOpen ? closeSearch() : (isNavbarOpen ? closeNavbar() : openNavbar())
}

function openNavbar() {
    menuIconContainer.classList.toggle('active')
    body.classList.toggle('active')
    navbar.classList.toggle('active')
    header.classList.toggle('active')
    headerLogo.classList.toggle('active')
    headerIconsSearch.classList.toggle('active')
    headerIconsBag.classList.toggle('active')
    isNavbarOpen = true
    isSearchOpen = false
}

function closeNavbar() {
    menuIconContainer.classList.remove('active')
    body.classList.remove('active')
    navbar.classList.remove('active')
    header.classList.remove('active')
    headerLogo.classList.remove('active')
    headerIconsSearch.classList.remove('active')
    headerIconsBag.classList.remove('active')
    isNavbarOpen = false
}

function toggleSearch() {
    isNavbarOpen ? closeNavbar() : (isSearchOpen ? closeSearch() : openSearch())
}

headerSearchBlur.style.zIndex = '-1'

function openSearch() {
    if (window.innerWidth > 768) {
        headerSearchBlur.style.zIndex = '1'
        headerSearchBlur.classList.toggle('active')
    }
    body.classList.toggle('active')
    header.classList.toggle('active')
    menuIconContainer.classList.toggle('active')
    headerLogo.classList.toggle('active')
    headerIconsSearch.classList.toggle('active')
    headerIconsBag.classList.toggle('active')
    headerSearchContainer.classList.toggle('active')
    searchForm.addEventListener('transitionend', focusSearchInput)
    isSearchOpen = true
    isNavbarOpen = false
}

function closeSearch() {
    if (window.innerWidth > 768) {
        headerSearchBlur.classList.remove('active')
        setTimeout(() => {
            headerSearchBlur.style.zIndex = '-1'
        }, 250)
    }
    searchForm.removeEventListener('transitionend', focusSearchInput)
    body.classList.remove('active')
    header.classList.remove('active')
    menuIconContainer.classList.remove('active')
    headerLogo.classList.remove('active')
    headerIconsSearch.classList.remove('active')
    headerIconsBag.classList.remove('active')
    headerSearchContainer.classList.remove('active')
    isSearchOpen = false
}

function focusSearchInput(event) {
    event.propertyName === 'opacity' && searchInput.focus()
}

headerIconsSearch.addEventListener('click', toggleSearch)
menuIconContainer.addEventListener('click', toggleNavbar)

const isDesktop = window.innerWidth > 768

if (isDesktop) {
    body.addEventListener('click', (event) => { !header.contains(event.target) && closeSearch() })
    window.addEventListener('scroll', () => { closeSearch() })
}