let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

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

function agregarCliente(ingresoCliente) {
  let resultado = buscarCliente(ingresoCliente.cedula);

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
    contenido +=
      "<button onclick=\"seleccionarCliente('" +
      c.cedula +
      "')\">Actualizar</button>";
    contenido +=
      "<button onclick=\"eliminarCliente('" +
      c.cedula +
      "')\">Eliminar</button>";
    contenido += "</td>";
    contenido += "</tr>";
  }

  cmpTabla.innerHTML = contenido;
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      return clientes[i];
    }
  }
  return null;
}

function seleccionarCliente(cedula) {
  let cliente = buscarCliente(cedula);

  if (cliente != null) {
    clienteSeleccionado = cliente;

    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("campoIngresos", cliente.ingresos);
    mostrarTextoEnCaja("campoEgresos", cliente.egresos);
  }
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("campoIngresos", "");
  mostrarTextoEnCaja("campoEgresos", "");

  clienteSeleccionado = null;
}

function guardarCliente() {
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("campoIngresos");
  let egresos = recuperarFloat("campoEgresos");

  let existente = buscarCliente(cedula);

  if (existente == null) {
    // CREAR
    let nuevo = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ingresos: ingresos,
      egresos: egresos,
    };

    clientes.push(nuevo);
    alert("Cliente creado");
  } else {
    // ACTUALIZAR (NO cambiar cédula)
    existente.nombre = nombre;
    existente.apellido = apellido;
    existente.ingresos = ingresos;
    existente.egresos = egresos;

    alert("Cliente actualizado");
  }

  pintarClientes();
  limpiar();
}

function eliminarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      clientes.splice(i, 1);
      break;
    }
  }

  pintarClientes();
}
