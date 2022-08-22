const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const contenedorPaquetes = document.getElementById('contenedor-paquetes')
const botonComprar = document.getElementById('comprar-carrito2')
const cantidad = document.getElementById('cantidad')
const cantidadTotal = document.getElementById('cantidadTotal')

//array carrito
let carrito = []


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {                                
    
    if (carrito.length >= 1 ) { Swal.fire({
        title: '¿Vas a eliminar todos los paquetes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF0000',  /*  ROJO    */
        cancelButtonColor: '#008000',   /*  VERDE   */
        confirmButtonText: 'Yes'
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminados!',
            'Carrito vacío.',
            'success'
          )
          carrito.length = 0
          actualizarCarrito()
        }
      })} else{
        Swal.fire({                                             
            icon: 'error',
            title: 'Carrito vacío',
                        
          }) }
  
})


const cargapaquetes = async () => {
    const resp = await
    fetch ("/js/stock.json")
     datapaquetes = await resp.json()

   
    datapaquetes.forEach((paquete) => {
    const div = document.createElement('div')
    div.classList.add('paquete')
    div.innerHTML = `
    <img class="cardimg"  src=${paquete.img} alt= "">
    
    <p>${paquete.desc}</p>

    <p class="precioPaquete">Precio:$ ${paquete.precio}</p>
    <button id="agregar${paquete.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorPaquetes.appendChild(div)

    
    const boton = document.getElementById(`agregar${paquete.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(paquete.id)
       
    })
})

}

cargapaquetes ()



const agregarAlCarrito = (prodId) => {
                                               
    Toastify({

        text: "Paquete añadido",
        
        duration: 4000,
        gravity : "bottom",
        postion :"right"
        
        }).showToast();

  
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
           
        })
    } else { 
        const item = datapaquetes.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
   actualizarCarrito() 
}




const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 

    Swal.fire({                                             
        icon: 'error',
        title: 'Paquete eliminado',                
      })

    actualizarCarrito()    
}


const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('paqueteEnCarrito')

        div.innerHTML = `
        <p>${prod.nombre}</p>
        <img class="cardimg2"  src=${prod.img} alt= "">
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

    })  
    contadorCarrito.innerText = carrito.length    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    guardarCarritoStorage(carrito);       
}

 botonComprar.addEventListener('click', () => {
        if (carrito.length >= 1) {
            Swal.fire({                                 
                
                title: 'Agradece tu compra y te desea feliz viaje',
/*                text: '¡Feliz Viaje!',*/
                imageUrl: '/img/paquetes/logo.png',
                imageWidth: 200,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'success',
              })
            carrito.length = 0
            actualizarCarrito()
         }else {

            Swal.fire({                                             
                icon: 'error',
                title: 'Carrito vacío',                
                
                
              })
         }   
         
 })


//Storage carrito.
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


