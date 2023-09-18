/*-------------------- Función principal. --------------------*/

function principal(productosOriginal) {
    let filtro

    localStorage.productos == undefined && localStorage.setItem("productos", JSON.stringify(productosOriginal))

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
        filtro !== undefined ? filtrarPorCategoria(filtro) : renderizarTarjetas(JSON.parse(localStorage.productos))
    })

    /*-------------------- Función para ordenar por Nombre/Precio. --------------------*/

    function ordenarPorNombre(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1))
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        filtro != undefined && filtrarPorCategoria(filtro)
    }

    function ordenarPorPrecioBajo(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => a.precio - b.precio)
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        filtro != undefined && filtrarPorCategoria(filtro)
    }

    function ordenarPorPrecioAlto(productosOriginal) {
        productosOriginal = JSON.parse(productosOriginal)
        productosOriginal.sort((a, b) => b.precio - a.precio)
        renderizarTarjetas(productosOriginal)
        localStorage.setItem("productos", JSON.stringify(productosOriginal))
        filtro != undefined && filtrarPorCategoria(filtro)
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
            productoEnCarrito != undefined && (producto.stock = productoEnCarrito.stock)
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
        alertas(`Sorry, ${productoBuscado.nombre} is currently out of stock.`)
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

/*-------------------- Llamando al array de productos con fetch. --------------------*/

fetch('js/productos.json')
    .then(respuesta => respuesta.json())
    .then(productosOriginal => principal(productosOriginal))
    .catch(error => console.log(error))