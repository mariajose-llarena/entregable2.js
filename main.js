document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("inactive");
});

let Carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productosBiblioteca = [
    { id: 1, nombre: "El Principito", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/714Hvb52n-L._SY466_.jpg", precio: 500, sinopsis: "Una historia poética sobre un joven príncipe que viaja a diferentes planetas y aprende lecciones sobre la vida, la amistad y el amor." },
    { id: 2, nombre: "Cien Años de Soledad", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/51W3oPQ3ANL._SY445_SX342_PQ1_.jpg", precio: 600, sinopsis: "Entre la boda de José Arcadio Buendía con Amelia Iguarán hasta la terrible maldición de Aureliano Babilonia transcurre todo un siglo." },
    { id: 3, nombre: "1984", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/51IetGH4OQL._SY445_SX342_PQ1_.jpg", precio: 450, sinopsis: "Orwell presenta un futuro en el que una dictadura totalitaria, es una distopía que fue escritas durante la primera mitad del siglo XX." },
    { id: 4, nombre: "Rayuela", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/913qsYmTdmL._SL1500_.jpg", precio: 550, sinopsis: "El amor turbulento de Oliveira y La Maga, las caminatas por París en busca del cielo y el infierno tienen su reverso en la aventura." },
    { id: 5, nombre: "Romeo y Julieta", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/51Zz1MKvLzL._SY445_SX342_PQ1_.jpg", precio: 100, sinopsis: "Una tragedia de amor juvenil, apasionado y sin límites. Su autor nos presenta a dos familias grandes enemigos desde hace años." },
    { id: 6, nombre: "Divina comedia", categoria: "Literatura", img: "https://m.media-amazon.com/images/I/81oi4UEVXwL._SY385_.jpg", precio: 95, sinopsis: "Una de las mayores obras, presentada ahora en una nueva y cuidada edición. Destrucción, horror y redención. Textos de Las Hijas" },
];

const productos = document.getElementById("productos");
const productosCarrito = document.getElementById("productosCarrito");
const total = document.getElementById("total");
const botonQueLimpia = document.getElementById("botonQueLimpia");

function botonesComprar() {
    const botones = document.getElementsByClassName("botonesCompra");
    Array.from(botones).forEach(el => {
        el.addEventListener("click", (evento) => {
            let nombre = evento.target.parentElement.children[0].innerText;
           
            let precio = Number(evento.target.parentElement.querySelector("span").innerText);
            let cantidadInput = evento.target.parentElement.querySelector(".cantidadInput").value;
            let cantidad = Number(cantidadInput) || 1;

            if (isNaN(precio) || isNaN(cantidad)) {
                console.error('Precio o cantidad no válidos');
                return; // Salir si hay un error
            }

            let productoABuscar = Carrito.find(el => el.nombre === nombre);
            if (productoABuscar) {
                productoABuscar.cantidad += cantidad;
            } else {
                Carrito.push({ nombre, precio, cantidad });
            }
            actualizadoraCarrito();
        });
    });
}

function botonEliminar() {
    const botones = document.getElementsByClassName("botonesEliminar");
    Array.from(botones).forEach(el => {
        el.addEventListener("click", (evento) => {
            let nombre = evento.target.parentElement.children[0].innerText;
            let productoABuscar = Carrito.find(el => el.nombre === nombre);
            if (productoABuscar.cantidad === 1) {
                let index = Carrito.findIndex(el => el.nombre === productoABuscar.nombre);
                Carrito.splice(index, 1);
            } else {
                productoABuscar.cantidad--;
            }
            actualizadoraCarrito();
        });
    });
}

function actualizadoraCarrito() {
    productosCarrito.innerHTML = "";

    Carrito.forEach(el => {
        productosCarrito.innerHTML += `
        <div class="producto">
            <h3>${el.nombre}</h3>
            <p>Precio: $${el.precio}</p>
            <p>Cantidad: ${el.cantidad}</p>
            <button class="botonesEliminar">X</button>
        </div>`;
    });

  
    const totalValue = Carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);

 
    total.innerText = isNaN(totalValue) ? '0' : `${totalValue}`;

  
    document.getElementById("carritoIcon").children[0].innerText = Carrito.reduce((acc, el) => acc + el.cantidad, 0);

    localStorage.setItem("carrito", JSON.stringify(Carrito));

    botonEliminar();
}

botonQueLimpia.addEventListener("click", () => {
    Carrito = [];
    localStorage.clear();
    actualizadoraCarrito();
});

document.addEventListener("DOMContentLoaded", () => {
    productosBiblioteca.forEach(el => {
        productos.innerHTML += `
        <div id="${el.id}" class="producto">
            <div class="producto-info">
                <h3>${el.nombre}</h3>
                <p>Precio: $<span>${el.precio}</span></p>
                <p><strong>Sinopsis:</strong> ${el.sinopsis}</p>
                <p>Categoría: ${el.categoria}</p>
                <input type="number" class="cantidadInput" value="1" min="1" style="width: 50px;">
                <button class="botonesCompra">Comprar</button>
            </div>
            <div class="img">
                <img src="${el.img}" alt="">
            </div>
        </div>`;
    });

    botonesComprar();

 
    actualizadoraCarrito();
});
