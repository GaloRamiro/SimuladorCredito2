
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let creditos = JSON.parse(localStorage.getItem("creditos")) || [];


let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;
// ================= LOCALSTORAGE =================

function guardarLocalStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("creditos", JSON.stringify(creditos));
}
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

  let hayError = false;

  limpiarError("txtCedula");
  limpiarError("txtNombre");
  limpiarError("txtApellido");
  limpiarError("campoIngresos");
  limpiarError("campoEgresos");

  // VALIDAR CÉDULA
  if (valorCedula.trim() == "") {
    mostrarError("txtCedula", "Ingrese la cédula");
    hayError = true;
  } else if (!validarCedula(valorCedula)) {
    mostrarError("txtCedula", "La cédula debe tener exactamente 10 números");
    hayError = true;
  }

  // VALIDAR NOMBRE
  if (valoNombre.trim() == "") {
    mostrarError("txtNombre", "Ingrese el nombre");
    hayError = true;
  }

  // VALIDAR APELLIDO
  if (valorApellido.trim() == "") {
    mostrarError("txtApellido", "Ingrese el apellido");
    hayError = true;
  }

  // VALIDAR INGRESOS
  if (isNaN(valorIngresos) || valorIngresos < 0) {
    mostrarError("campoIngresos", "Ingrese ingresos válidos");
    hayError = true;
  }

  // VALIDAR EGRESOS
  if (isNaN(valorEgresos) || valorEgresos < 0) {
    mostrarError("campoEgresos", "Ingrese egresos válidos");
    hayError = true;
  }

  // DETENER SI HAY ERRORES
  if (hayError) {
    return;
  }

  let existente = buscarCliente(valorCedula);

  // CREAR O ACTUALIZAR
  if (existente == null) {
    let clienteNuevo = {
      cedula: valorCedula,
      nombre: valoNombre,
      apellido: valorApellido,
      ingreso: valorIngresos,
      egreso: valorEgresos,
    };

    clientes.push(clienteNuevo);

    guardarLocalStorage();

    mostrarAlertaBonita("Cliente creado");
  } else {
    existente.nombre = valoNombre;
    existente.apellido = valorApellido;
    existente.ingreso = valorIngresos;
    existente.egreso = valorEgresos;
    guardarLocalStorage();

    mostrarAlertaBonita("Cliente actualizado");
  }

  pintarClientes();
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
  limpiarError("txtCedula");
  limpiarError("txtNombre");
  limpiarError("txtApellido");
  limpiarError("campoIngresos");
  limpiarError("campoEgresos");
}

function eliminarCliente(cedula) {
  if (tieneCreditos(cedula)) {
    mostrarAlertaBonita("No puede eliminar un cliente con créditos");
    return;
  }
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      clientes.splice(i, 1);
      guardarLocalStorage();

      break;
    }
  }
  pintarClientes();
}

function buscarClienteCredito() {
  let buscarCedula = recuperaraTexto("buscarCedulaCredito");
  if (!validarCedula(buscarCedula)) {
    mostrarError("buscarCedulaCredito", "Ingrese una cédula válida");
    return;
  }

  let existenteBuscado = buscarCliente(buscarCedula);
  if (existenteBuscado != null) {
    clienteSeleccionado = existenteBuscado;
    document.getElementById("resultadoCredito").innerHTML = "";

    document.getElementById("btnSolicitarCredito").disabled = true;
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

  if (isNaN(monto) || monto <= 0) {
    mostrarError("montoCredito", "Ingrese un monto válido");
    return;
  }

  if (isNaN(plazo) || plazo <= 0) {
    mostrarError("plazoCredito", "Ingrese un plazo válido");
    return;
  }

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
  <div class="fila-resultado">
  <i class="fa-solid fa-credit-card"></i>
     <span>Capacidad de pago:</span>
    <strong>${capacidadPago.toFixed(2)}</strong>
  </div>

  <div class="fila-resultado">
  <i class="fa-solid fa-sack-dollar"></i>
     <span>Total a pagar:</span>
    <strong>${totalPagar.toFixed(2)}</strong>
  </div>

  <div class="fila-resultado">
  <i class="fa-solid fa-calendar-days"></i>
     <span>Cuota mensual:</span>
    <strong>${cuotaMensual.toFixed(2)}</strong>
  </div>

  <hr>

<div class="fila-resultado resultado-final">
  ${
    aprobado
      ? '<i class="fa-solid fa-square-check"></i> <span>RESULTADO:</span> <strong>APROBADO</strong>'
      : '<i class="fa-solid fa-circle-xmark"></i> <span>RESULTADO:</span> <strong>RECHAZADO</strong>'
  }
</div>
`;
  let resultadoCredito = document.getElementById("resultadoCredito");

  if (aprobado) {
    resultadoCredito.classList.remove("rechazado");
    resultadoCredito.classList.add("aprobado");

    let btnAsignar = document.getElementById("btnSolicitarCredito");

    btnAsignar.disabled = false;
  } else {
    resultadoCredito.classList.remove("aprobado");
    resultadoCredito.classList.add("rechazado");

    let btnAsignar = document.getElementById("btnSolicitarCredito");

    btnAsignar.disabled = true;
  }
}

function solicitarCredito() {
  if (clienteSeleccionado == null) {
    mostrarAlertaBonita("Debe seleccionar un cliente");
    return;
  }

  if (!creditoAprobado) {
    mostrarAlertaBonita("El crédito no está aprobado");
    return;
  }
  let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada,
  };
  creditos.push(credito);
  guardarLocalStorage();

  mostrarAlertaBonita("Crédito solicitado correctamente");

  pintarCredito(creditos);
}

function buscarCreditos(cedula) {
  let creditosEncontrados = [];
  for (let i = 0; i < creditos.length; i++) {
    let elementoCredito = creditos[i];
    if (elementoCredito.cedula == cedula) {
      creditosEncontrados.push(elementoCredito);
    }
  }
  return creditosEncontrados;
}
function tieneCreditos(cedula) {
  for (let i = 0; i < creditos.length; i++) {
    if (creditos[i].cedula == cedula) {
      return true;
    }
  }

  return false;
}
function pintarCredito(creditos) {
  const TABLA = document.getElementById("tablaCreditos");
  let almacenarPintar = "";
  for (let i = 0; i < creditos.length; i++) {
    let elementoCredito = creditos[i];
    almacenarPintar += `
      <tr>
        <td>${elementoCredito.cedula}</td>
        <td>${elementoCredito.nombre}</td>
        <td>${elementoCredito.apellido}</td>
        <td>${elementoCredito.monto.toFixed(2)}</td>
        <td>${elementoCredito.tasa}%</td>
        <td>${elementoCredito.plazo} años</td>
        <td>${elementoCredito.cuota.toFixed(2)}</td>
        <td>
          <button onclick="eliminarCredito(${i})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  }
  TABLA.innerHTML = almacenarPintar;
}

function eliminarCredito(indice) {

  creditos.splice(indice, 1);
  //Eliminar localStorage en creditos 
  localStorage.setItem(
    "creditos",
    JSON.stringify(creditos)
  );

  pintarCredito(creditos);
}

function buscarCreditosCliente() {
  let buscaCedula = recuperaraTexto("buscarCedulaListado");
  let lista = buscarCreditos(buscaCedula);
  pintarCredito(lista);
}
function guardarLocalStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("creditos", JSON.stringify(creditos));
}
mostrarSeccion("parametros");
pintarClientes();
pintarCredito(creditos);
