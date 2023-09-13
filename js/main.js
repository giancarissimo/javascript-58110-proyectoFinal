/*-------------------- Función principal. --------------------*/

principal()

function principal() {
    let filtro
    /*-------------------- Array de los productos --------------------*/
    let productosOriginal = [
        { id: 18, nombre: "Airpods Pro", categoria: "airpods", stock: 6, precio: 249, nombreImagen: "Airpods_Pro.jpeg" },
        { id: 3, nombre: "iPhone 14", categoria: "iphone", stock: 8, precio: 799, nombreImagen: "iPhone14.jpg" },
        { id: 9, nombre: "iPhone 14 Pro", categoria: "iphone", stock: 7, precio: 999, nombreImagen: "iPhone14_Pro.jpg" },
        { id: 2, nombre: "Apple Watch Series 8", categoria: "watch", stock: 2, precio: 399, nombreImagen: "AppleWatch_Series8_Black.jpg" },
        { id: 12, nombre: "Apple Watch Ultra", categoria: "watch", stock: 4, precio: 799, nombreImagen: "AppleWatch_Ultra.jpg" },
        { id: 15, nombre: "MacBook Pro", categoria: "mac", stock: 5, precio: 1999, nombreImagen: "MacBook_Pro.jpg" },
        { id: 7, nombre: "Airpods Max", categoria: "airpods", stock: 3, precio: 549, nombreImagen: "Airpods_Max_Black.jpg" },
        { id: 8, nombre: "MacBook Air", categoria: "mac", stock: 4, precio: 1099, nombreImagen: "MacBook_Air.jpg" },
        { id: 1, nombre: "iPad Pro", categoria: "ipad", stock: 8, precio: 799, nombreImagen: "iPad_Pro.jpg" },
        { id: 14, nombre: "iPad Mini", categoria: "ipad", stock: 2, precio: 499, nombreImagen: "iPad_Mini.jpg" },
        { id: 11, nombre: "iPad Air", categoria: "ipad", stock: 6, precio: 599, nombreImagen: "iPad_Air.jpg" },
        { id: 5, nombre: "20W USB-C Charger", categoria: "accesories", stock: 10, precio: 19, nombreImagen: "Apple_Charger.jpeg" },
        { id: 10, nombre: "USB-C Charging Cable", categoria: "accesories", stock: 10, precio: 29, nombreImagen: "Apple_Charging_Cable.jpeg" },
        { id: 13, nombre: "Airtag", categoria: "accesories", stock: 7, precio: 29, nombreImagen: "Airtag.jpg" },
        { id: 6, nombre: "Screen Protector", categoria: "accesories", stock: 7, precio: 59, nombreImagen: "Screen_Protector.jpg" },
        { id: 4, nombre: "Magic Keyborad", categoria: "accesories", stock: 4, precio: 349, nombreImagen: "Apple_Magic_Keyboard.jpeg" },
        { id: 16, nombre: "3-in-1 Travel Charger", categoria: "accesories", stock: 3, precio: 149.95, nombreImagen: "Travel_Charger.jpeg" },
        { id: 17, nombre: "Apple Pencil (2° gen)", categoria: "accesories", stock: 8, precio: 129, nombreImagen: "Apple_Pencil.jpeg" },
    ]
    if (localStorage.productos == undefined)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))

    /*-------------------- Botones para ordenar por nombre o precio bajo/alto. --------------------*/

    const botonOrdenarNombre = document.getElementById("ordenarNombre")
    botonOrdenarNombre.addEventListener("click", () => ordenarPorNombre(localStorage.productos))

    const botonOrdenarPrecioBajo = document.getElementById("ordenarPrecioBajo")
    botonOrdenarPrecioBajo.addEventListener("click", () => ordenarPorPrecioBajo(localStorage.productos))

    const botonOrdenarPrecioAlto = document.getElementById("ordenarPrecioAlto")
    botonOrdenarPrecioAlto.addEventListener("click", () => ordenarPorPrecioAlto(localStorage.productos))

    const botonOrdenarDefault = document.getElementById("ordenarDefault")
    botonOrdenarDefault.addEventListener("click", function () {
        localStorage.removeItem("productos")
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        if (filtro != undefined) {
            filtrarPorCategoria(filtro)
        } else {
            renderizarTarjetas(JSON.parse(localStorage.productos))
        }
    })

    /*-------------------- Función para ordenar por Nombre/Precio. --------------------*/

    function ordenarPorNombre(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1))
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        if (filtro != undefined) {
            filtrarPorCategoria(filtro)
        }
    }

    function ordenarPorPrecioBajo(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => a.precio - b.precio)
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        if (filtro != undefined) {
            filtrarPorCategoria(filtro)
        }
    }

    function ordenarPorPrecioAlto(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => b.precio - a.precio)
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        if (filtro != undefined) {
            filtrarPorCategoria(filtro)
        }
    }

    /*-------------------- Filtrar por diferentes categorías. --------------------*/

    const botonFiltrarMac = document.getElementById("filtrarMac")
    botonFiltrarMac.addEventListener("click", () => filtrarPorCategoria("mac"))

    const botonFiltrarIphone = document.getElementById("filtrarIphone")
    botonFiltrarIphone.addEventListener("click", () => filtrarPorCategoria("iphone"))

    const botonFiltrarIpad = document.getElementById("filtrarIpad")
    botonFiltrarIpad.addEventListener("click", () => filtrarPorCategoria("ipad"))

    const botonFiltrarWatch = document.getElementById("filtrarWatch")
    botonFiltrarWatch.addEventListener("click", () => filtrarPorCategoria("watch"))

    const botonFiltrarAirpods = document.getElementById("filtrarAirpods")
    botonFiltrarAirpods.addEventListener("click", () => filtrarPorCategoria("airpods"))

    const botonFiltrarAccesories = document.getElementById("filtrarAccesories")
    botonFiltrarAccesories.addEventListener("click", () => filtrarPorCategoria("accesories"))

    const botonFiltrarTodos = document.getElementById("filtrarTodos")
    botonFiltrarTodos.addEventListener("click", function () {
        filtro = undefined
        renderizarTarjetas(JSON.parse(localStorage.productos))
    })

    /*-------------------- funcion para filtrar por las distintas categorías. -------------------- */

    function filtrarPorCategoria(categoria) {
        filtro = categoria
        const productosFiltrados = JSON.parse(localStorage.productos).filter(producto => producto.categoria === categoria)
        renderizarTarjetas(productosFiltrados)
    }

    renderizarTarjetas(JSON.parse(localStorage.productos))
}


/*-------------------- Hacer las cards de productos. --------------------*/

function renderizarTarjetas(productos) {
    let contenedor = document.getElementById("containerProductos")

    contenedor.innerHTML = ""
    productos.forEach(producto => {
        if (localStorage.getItem("carrito") != undefined) {
            let carrito = JSON.parse(localStorage.getItem("carrito"))
            let productoEnCarrito = carrito.find(prodCarrito => prodCarrito.id === producto.id)
            if (productoEnCarrito != undefined) {
                producto.stock = productoEnCarrito.stock
            }
        }
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.classList.add("cardProducto")
        tarjetaProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img class="cardProducto_img" src="./assets/images/store/${producto.nombreImagen}" alt="${producto.nombre}">
        <div class="cardProducto_info">
            <div class="cardProducto_info_text">
                <h4>From $${parseFloat(producto.precio).toFixed(2)}</h4>
                <p>${producto.stock} units left</p>
            </div>
            <button id=${producto.id}>add to cart</button>
        </div>
        `
        contenedor.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(productos, e))
    })
}

/*-------------------- Obtener el carrito almacenado en el storage. --------------------*/

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

/*-------------------- Agregar al carrito. --------------------*/

function agregarAlCarrito(productos, e) {
    let carrito = recuperarCarrito()
    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)
    if (productoBuscado.stock > 0) {
        alertas(`${productoBuscado.nombre} was added to your bag.`)
        productoBuscado.stock--

        if (productoEnCarrito) {
            productoEnCarrito.unidades++
            productoEnCarrito.subtotal = productoEnCarrito.precioUnitario * productoEnCarrito.unidades
            productoEnCarrito.stock = productoBuscado.stock
        } else {
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                subtotal: productoBuscado.precio,
                unidades: 1,
                imagen: productoBuscado.nombreImagen,
                stock: productoBuscado.stock
            })
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarTarjetas(productos)
    } else {
        alertas(`Sorry, ${productoBuscado.nombre} is currently out of stock. Please check out our other amazing products!`)
    }

}

/*-------------------- Botones desplegables. --------------------*/

const botonDesplegarFilter = document.getElementById('botonDesplegarFilter')
const botonDesplegadoFilter = document.getElementById('botonDesplegadoFilter')

botonDesplegarFilter.addEventListener('click', () => {
    botonDesplegadoFilter.classList.toggle('oculto')
})

const botonDesplegarOrder = document.getElementById('botonDesplegarOrder')
const botonDesplegadoOrder = document.getElementById('botonDesplegadoOrder')

botonDesplegarOrder.addEventListener('click', () => {
    botonDesplegadoOrder.classList.toggle('oculto')
})