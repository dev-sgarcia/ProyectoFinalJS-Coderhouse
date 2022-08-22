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



const agregarAlCarrito = (pqtId) => {
                                               
    Toastify({

        text: "Paquete añadido",
        
        duration: 4000,
        gravity : "bottom",
        postion :"right"
        
        }).showToast();

  
    const existe = carrito.some (pqt => pqt.id === pqtId) //comprobar si el elemento ya existe en el carro

    if (existe){ 
        const pqt = carrito.map (pqt => { 
            if (pqt.id === pqtId){
                pqt.cantidad++
            }
           
        })
    } else { 
        const item = datapaquetes.find((pqt) => pqt.id === pqtId)
        carrito.push(item)
    }
   actualizarCarrito() 
}




const eliminarDelCarrito = (pqtId) => {
    const item = carrito.find((pqt) => pqt.id === pqtId)
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
    carrito.forEach((pqt) => {
        const div = document.createElement('div')
        div.className = ('paqueteEnCarrito')

        div.innerHTML = `
        <p>${pqt.nombre}</p>
        <img class="cardimg2"  src=${pqt.img} alt= "">
        <p>Precio:$${pqt.precio}</p>
        <p>Cantidad: <span id="cantidad">${pqt.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${pqt.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

    })  
    contadorCarrito.innerText = carrito.length    
    precioTotal.innerText = carrito.reduce((acc, pqt) => acc + pqt.cantidad * pqt.precio, 0)
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


