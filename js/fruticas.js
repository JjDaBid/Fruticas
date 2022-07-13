const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const total = document.getElementById("total")
const templateTotal = document.getElementById("template-total")
const fragment = document.createDocumentFragment()

// ******** Evento "Click" *********** //

document.addEventListener("click", (e) => {
    if((e.target.matches(".btn"))) {
        agregarAlCarrito(e)
    }

    if((e.target.matches(".btn-add"))) {
        btnAumentar(e)
    }

    if((e.target.matches(".btn-del"))) {
        btnDisminuir(e)
    }
})

let carritoCompras = [];

const agregarAlCarrito = (e) => {

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }; 

    const indice = carritoCompras.findIndex((fruta) => fruta.id === producto.id)

    if(indice === -1){
        carritoCompras.push(producto)
    } else { 
        carritoCompras[indice].cantidad ++;
    }
    console.log(carritoCompras)

    pintarCarrito(carritoCompras)
}

// ******** Funcion que crea el template de las frutas seleccionadas *********** //

const pintarCarrito = () => {
    carrito.textContent = "";

    carritoCompras.forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector(".badge-subtotal").textContent = item.precio * item.cantidad;
        clone.querySelector(".btn-add").dataset.id = item.id;
        clone.querySelector(".btn-del").dataset.id = item.id

        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);

    pintarTotal();
}

// ******** Funcion que crea el template del total *********** //

const pintarTotal = () => {
    console.log("pintarTotal")
    total.textContent = "";

    const cuenta = carritoCompras.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    );

    const clone = templateTotal.content.cloneNode(true);
    clone.querySelector(".total-invoice").textContent = cuenta

    total.appendChild(clone)
}

// ******** Funcion del boton aumentar *********** //

const btnAumentar = (e) => {
    console.log("agregaste una unidad", e.target.dataset.id)
    carritoCompras = carritoCompras.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++
        }
        return item
    });
    pintarCarrito()
}

// ******** Funcion del boton quitar *********** //

const btnDisminuir = (e) => {
    console.log("quitaste una unidad", e.target.dataset.id)
    carritoCompras = carritoCompras.filter(item => {
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad --
                if(item.cantidad === 0) return
                return item
            }
        } else { return item }
    })  
      pintarCarrito()
}


