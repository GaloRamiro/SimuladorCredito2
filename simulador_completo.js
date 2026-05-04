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

function guardarTasa() {
  let valorTasa = recuperarInt("tasaInteres");
  if (isNaN(valorTasa)) {
    mostrarTexto("mensajeTasa", "Ingrese un número válido");
  } else if (valorTasa >= 10 && valorTasa <= 20) {
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente: " + valorTasa + "%",
    );
    tasaInteres = valorTasa;
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {

  let valorCedula = recuperaraTexto("txtCedula");
  let valorNombre = recuperaraTexto("txtNombre");
  let valorApellido = recuperaraTexto("txtApellido");
  let valorIngreso = recuperarFloat("campoIngresos");
  let valorEgresos = recuperarFloat("campoEgresos");

  let nuevoCliente = {
    cedula: valorCedula,
    nombre: valorNombre,
    apellido: valorApellido,
    ingresos: valorIngreso,
    egresos: valorEgresos
  };

  agregarCliente(nuevoCliente);
}

function agregarCliente(ingresoCliente) {
  let resultado = buscarcliente(ingresoCliente.cedula);

  if (resultado == null) {
    clientes.push(ingresoCliente);
    alert("Cliente agregado");
    pintarClientes(); 
  } else {
    alert("YA EXISTE EL CLIENTE CON LA CÉDULA: " + ingresoCliente.cedula);
  }
}

function pintarClientes() {
  let cmpTabla = document.getElementById("tablaClientes");

  let contenido = "";

  for (let i = 0; i < clientes.length; i++) {
    let c = clientes[i];

    contenido += "<tr>";
    contenido += "<td>" + c.cedula + "</td>";
    contenido += "<td>" + c.nombre + "</td>";
    contenido += "<td>" + c.apellido + "</td>";
    contenido += "<td>" + c.ingresos + "</td>";
    contenido += "<td>" + c.egresos + "</td>";
    contenido += "<td>";
    contenido += "<button>Actualizar</button>";
    contenido += "<button>Eliminar</button>";
    contenido += "</td>";
    contenido += "</tr>";
  }

  cmpTabla.innerHTML = contenido;
}

function buscarcliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      return clientes[i];
    }
  }
  return null;
}