// ================= VARIABLES GLOBALES =================

// Arreglo que almacena los clientes
let clientes = [];

// Arreglo para futuros créditos
let creditos = [];

// Tasa de interés inicial
let tasaInteres = 15;

// Cliente seleccionado para actualizar
let clienteSeleccionado = null;

// Variables auxiliares para cálculos
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


// ================= PARÁMETROS =================

// Guarda y valida la tasa de interés
function guardarTasa() {
  let valorTasa = recuperarInt("tasaInteres");

  if (isNaN(valorTasa)) {
    mostrarTexto("mensajeTasa", "Ingrese un número válido");

  } else if (valorTasa >= 10 && valorTasa <= 20) {
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente: " + valorTasa + "%"
    );
    tasaInteres = valorTasa; // Actualiza la tasa global

  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}


// ================= CLIENTES =================

// Agrega cliente (no se usa mucho porque ya está en guardarCliente)
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


// Muestra los clientes en la tabla
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

    // Botones de acciones
    contenido += "<td>";
    contenido += "<button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button>";
    contenido += "<button onclick=\"eliminarCliente('" + c.cedula + "')\">Eliminar</button>";
    contenido += "</td>";

    contenido += "</tr>";
  }

  cmpTabla.innerHTML = contenido;
}


// Busca un cliente por cédula
function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      return clientes[i]; // Retorna cliente si lo encuentra
    }
  }
  return null; // Retorna null si no existe
}


// Selecciona un cliente y carga sus datos en el formulario
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


// Limpia los campos del formulario
function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("campoIngresos", "");
  mostrarTextoEnCaja("campoEgresos", "");

  clienteSeleccionado = null;
}


// Guarda o actualiza un cliente
function guardarCliente() {
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("campoIngresos");
  let egresos = recuperarFloat("campoEgresos");

  let existente = buscarCliente(cedula);

  if (existente == null) {
    // CREAR CLIENTE
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
    // ACTUALIZAR CLIENTE
    existente.nombre = nombre;
    existente.apellido = apellido;
    existente.ingresos = ingresos;
    existente.egresos = egresos;

    alert("Cliente actualizado");
  }

  pintarClientes(); // Refresca tabla
  limpiar();        // Limpia formulario
}


// Elimina un cliente por cédula
function eliminarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      clientes.splice(i, 1); // Elimina 1 elemento
      break;
    }
  }

  pintarClientes(); // Actualiza la tabla
}