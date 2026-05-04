let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios



// Crear función ocultarSecciones()
//No recibe parámetros
//Debe quitar la clase activa a todas las secciones

function ocultarSecciones() {
  let secciones = document.querySelectorAll("section");

  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.remove("activa");
  }
}

function mostrarSeccion(id) {
  ocultarSecciones(); // 1. ocultar todo
  document.getElementById(id).classList.add("activa"); // 2. mostrar una
}