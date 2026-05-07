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
  pintarClientes();
}

function buscarClienteCredito() {
  let buscarCedula = recuperaraTexto("buscarCedulaCredito");
  let existenteBuscado = buscarCliente(buscarCedula);
  if (existenteBuscado != null) {
    clienteSeleccionado = existenteBuscado;
    let contenido = `
      <h3>Cliente encontrado</h3>
      <p><strong>Cédula:</strong> ${existenteBuscado.cedula}</p>
      <p><strong>Nombre:</strong> ${existenteBuscado.nombre}</p>
      <p><strong>Apellido:</strong> ${existenteBuscado.apellido}</p>
      <p><strong>Ingresos:</strong> $${existenteBuscado.ingreso}</p>
      <p><strong>Egresos:</strong> $${existenteBuscado.egreso}</p>
    `;

    document.getElementById("datosClienteCredito").innerHTML = contenido;
  } else {
    document.getElementById("datosClienteCredito").innerHTML =
      "<p>Cliente no encontrado</p>";

    clienteSeleccionado = null;
  }
}

function calcularCredito() {
  // Verificar que exista cliente seleccionado
  if (clienteSeleccionado == null) {
    document.getElementById("resultadoCredito").innerHTML =
      "<p>Debe buscar un cliente primero</p>";
    return;
  }

  // Recuperar datos
  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarInt("plazoCredito");

  // Datos del cliente
  let ingresos = clienteSeleccionado.ingreso;
  let egresos = clienteSeleccionado.egreso;

  // 1. Capacidad de pago
  let disponible = calcularDisponible(ingresos, egresos);

  let capacidadPago = calculaCapacidadPago(disponible);

  // 2. Interés
  let interes = calcularInteresSimple(monto, tasaInteres, plazo);

  // 3. Total a pagar
  let totalPagar = calcularTotalPagar(monto, interes);

  // 4. Cuota mensual
  let cuotaMensual = calularCuotaMensual(totalPagar, plazo);

  // 5. Resultado del crédito
  let aprobado = analizarCredito(capacidadPago, cuotaMensual);

  // Guardar valores globales
  cuotaCalculada = cuotaMensual;
  montoCalculado = monto;
  plazoCalculado = plazo;
  creditoAprobado = aprobado;

  document.getElementById("resultadoCredito").innerHTML = `
  Capacidad de pago: ${capacidadPago}<br>
  Total a pagar: ${totalPagar}<br>
  Cuota mensual: ${cuotaMensual}<br>
  RESULTADO: ${aprobado ? "APROBADO" : "RECHAZADO"}
`;
  let resultadoCredito = document.getElementById("resultadoCredito");

  if (aprobado) {
    resultadoCredito.className = "aprobado";
    let btnAsignar = document.getElementById("btnSolicitarCredito");
    btnAsignar.disabled = false;
  } else {
    resultadoCredito.className = "rechazado";
  }
}

function solicitarCredito() {
  let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoIngresado,
    cuota: cuotaCalculada,
  };
  creditos.push[credito];
  alert("Crédito solicitado correctamente");
}

function buscarCreditos(cedula) {
  let creditosEncontrados = [];
  for (i = 0; i < creditos.length; i++) {
    let elementoCredito = creditos[i];
    if (elementoCredito.cedula == cedula) {
      creditosEncontrados.push(elementoCredito);
    }
  }
  return creditosEncontrados;
}

function pintarCredito(creditos) {
  const TABLA= document.getElementById("tablaCreditos");
  let almacenarPintar = "";
  for (i = 0; i < creditos.length; i++) {
    let elementoCredito = creditos[i];
    almacenarPintar += `
      <tr>
        <td>${elementoCredito.cedula}</td>
        <td>${elementoCredito.nombre}</td>
        <td>${elementoCredito.apellido}</td>
        <td>${elementoCredito.monto}</td>
        <td>${elementoCredito.tasa}%</td>
        <td>${elementoCredito.plazo} meses</td>
        <td>${elementoCredito.cuota}</td>
        <td>
          <button onclick="eliminarCredito(${i})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
TABLA.innerHTML+=almacenarPintar;
  }
}
