let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

// ================= SECCIONES =================

// Oculta todas las secciones de la página
function ocultarSecciones() {
  let secciones = document.querySelectorAll("section");

  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.remove("activa");
  }
}

// Muestra solo la sección indicada por id
function mostrarSeccion(id) {
  ocultarSecciones(); // Oculta todas
  document.getElementById(id).classList.add("activa"); // Muestra una
}

function guardarTasa() {
  let valorTasa = recuperarInt("tasaInteres");
  if (isNaN(valorTasa)) {
    mostrarTexto("mensajeTasa", "Ingrese un valor valido");
  } else if (valorTasa >= 10 && valorTasa <= 20) {
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente; " + valorTasa + "%",
    );
    tasaInteres = valorTasa;
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let valorCedula = recuperaraTexto("txtCedula");
  let valoNombre = recuperaraTexto("txtNombre");
  let valorApellido = recuperaraTexto("txtApellido");
  let valorIngresos = recuperarFloat("campoIngresos");
  let valorEgresos = recuperarFloat("campoEgresos");
  let existente = buscarCliente(valorCedula);
  if (existente == null) {
    let clienteNuevo = {
      cedula: valorCedula,
      nombre: valoNombre,
      apellido: valorApellido,
      ingreso: valorIngresos,
      egreso: valorEgresos,
    };
    clientes.push(clienteNuevo);
    alert("Cliente Creado");
  } else {
    existente.nombre = valoNombre;
    existente.apellido = valorApellido;
    existente.ingreso = valorIngresos;
    existente.egreso = valorEgresos;
    alert("Cliente actualizado");
  }
  pintarClientes(); // Refresca tabla
  limpiar();
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      return clientes[i];
    }
  }
  return null;
}

function pintarClientes() {
  let cmpTabla = document.getElementById("tablaClientes");
  let contenido = "";
  for (let i = 0; i < clientes.length; i++) {
    let usuario = clientes[i];
    contenido += `<tr>
                  <td>${usuario.cedula}</td>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.apellido}</td>
                  <td>${usuario.ingreso}</td>
                  <td>${usuario.egreso}</td>
                  <td>
                  <button onclick="seleccionarCliente('${usuario.cedula}')">Actualizar</button>
                  <button onclick="eliminarCliente('${usuario.cedula}')">Eliminar</button>
                  </td>
                  </tr>`;
  }
  cmpTabla.innerHTML = contenido;
}

function seleccionarCliente(cedula) {
  let cliente = buscarCliente(cedula);

  if (cliente != null) {
    clienteSeleccionado = cliente;

    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("campoIngresos", cliente.ingreso);
    mostrarTextoEnCaja("campoEgresos", cliente.egreso);
  }
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("campoIngresos", "");
  mostrarTextoEnCaja("campoEgresos", "");
}

function eliminarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      clientes.splice(i, 1);
      break;
    }
  }
  pintarClientes(); }