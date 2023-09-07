/*-------------------- Obtener el carrito almacenado en el storage. --------------------*/

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

/*-------------------- Carrito sin contenido. --------------------*/

carritoSinNada()
function carritoSinNada() {
    const emptyCartMessage = document.getElementById("emptyCartMessage")
    const botonFinalizarCompra = document.getElementById("finalizarCompra")
    const carrito = recuperarCarrito()

    if (carrito.length === 0) {
        emptyCartMessage.style.display = "block"
        botonFinalizarCompra.style.display = "none"
    } else {
        renderizarCarrito()
        botonFinalizarCompra.style.display = "block"
        emptyCartMessage.style.display = "none"
    }
}

/*-------------------- Hacer el carrito. --------------------*/

function renderizarCarrito() {
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    let carrito = recuperarCarrito()
    carrito.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML = `
        <div class="producto_carrito">
            <img class="producto_carrito_img" src="../assets/images/store/${producto.imagen}" alt="${producto.nombre}">
            <div class="producto_carrito_containerh3">
                <h3>${producto.nombre}</h3>
            </div>
            <p>${producto.unidades}</p>
            <h4>$${producto.subtotal}</h4>
            <button onclick="eliminarDelCarrito(${producto.id})">remove</button>
        </div>
        `
        contenedor.appendChild(tarjetaProducto)
    })
}

/*-------------------- Eliminar un producto del carrito. --------------------*/

function eliminarDelCarrito(id) {
    let carrito = recuperarCarrito()
    let indiceProducto = carrito.findIndex(producto => producto.id === id)
    let productos = JSON.parse(localStorage.productos)
    let indiceProductos = productos.findIndex(producto => producto.id === id)

    if (indiceProducto !== -1) {
        const productoEliminado = carrito.splice(indiceProducto, 1)[0]
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarCarrito()
        alert(`Se eliminó ${productoEliminado.nombre} del carrito.`)
        productos[indiceProductos].stock = productos[indiceProductos].stock + productoEliminado.unidades
        localStorage.setItem("productos", JSON.stringify(productos))
        carritoSinNada()
    }
}

/*-------------------- Finalización de compra. --------------------*/

let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", finalizarCompra)

function finalizarCompra() {
    let carrito = recuperarCarrito()
    // let contenedor = document.getElementById("carrito")
    if (carrito.length > 0) {
        localStorage.removeItem("carrito")
        renderizarCarrito()
        alert("Muchas gracias por su compra!")
        carritoSinNada()
    }
}
