/*-------------------- Obtener el carrito almacenado en el storage. --------------------*/

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

/*-------------------- Carrito sin contenido. --------------------*/

carritoSinNada()
function carritoSinNada() {
    const emptyCartMessage = document.getElementById("emptyCartMessage")
    const botonFinalizarCompra = document.getElementById("finalizarCompra")
    const infoTotalCarito = document.getElementById("containerTotal")
    const carrito = recuperarCarrito()

    if (carrito.length === 0) {
        emptyCartMessage.style.display = "block"
        botonFinalizarCompra.style.display = "none"
        infoTotalCarito.style.display = "none"
    } else {
        renderizarCarrito()
        botonFinalizarCompra.style.display = "block"
        emptyCartMessage.style.display = "none"
        infoTotalCarito.style.display = "flex"
    }
}

/*-------------------- Hacer el carrito. --------------------*/

function renderizarCarrito() {
    let contenedor = document.getElementById("carrito")
    const total = document.getElementById("total")
    contenedor.innerHTML = ""
    let carrito = recuperarCarrito()
    let suma = 0
    carrito.forEach(producto => {
        suma = suma + parseFloat(producto.subtotal)
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML = `
        <div class="producto_carrito">
            <img class="producto_carrito_img" src="../assets/images/store/${producto.imagen}" alt="${producto.nombre}">
            <div class="producto_carrito_containerh3">
                <h3>${producto.nombre}</h3>
            </div>
            <div class="producto_carrito_container_InfoProd">
                <div class="producto_carrito_container_InfoProd_unidades">
                    <p>${producto.unidades}</p>
                </div>
                <h4>$${parseFloat(producto.subtotal).toFixed(2)}</h4>
            </div>
            <button onclick="eliminarDelCarrito(${producto.id})">Remove</button>
        </div>
        `
        contenedor.appendChild(tarjetaProducto)
    })
    total.innerText = `$${suma.toFixed(2)}`
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
        alertas(`${productoEliminado.nombre} was removed from your bag.`)
        localStorage.setItem("productos", JSON.stringify(productos))
        carritoSinNada()
    }
}

/*-------------------- Finalización de compra. --------------------*/

let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", finalizarCompra)

function finalizarCompra() {
    let carrito = recuperarCarrito()
    if (carrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify([]))
        renderizarCarrito()
        alertas(`Thank you for your purchase! You will receive an email with your invoice shortly.`)
        carritoSinNada()
    }
}