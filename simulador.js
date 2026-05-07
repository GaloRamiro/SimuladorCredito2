//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {
  // 🚨 VALIDAR PRIMERO
  if (!validarFormulario()) {
    return; //  si hay error, NO calcula
  }

  let recuperarIngreso = recuperarFloat("txtIngresos");
  //Valor recuperados examen
  let recuperarArriendo = recuperarFloat("txtArriendo");
  let recuperarAlimentacion = recuperarFloat("txtAlimentacion");
  let recuperarVarios = recuperarFloat("txtVarios");

  // Cierre Valores Examen

  let gastos = recuperarArriendo + recuperarAlimentacion + recuperarVarios;

  cambiarTexto("spnGastos", gastos);

  let valor = calcularDisponible(recuperarIngreso, gastos);

  cambiarTexto("spnDisponible", valor);

  let capacidadPago = calculaCapacidadPago(valor);

  cambiarTexto("spnCapacidadPago", capacidadPago);

  let recuperarMonto = recuperarEntero("txtMonto");
  let recuperarPlazo = recuperarEntero("txtPlazo");
  let recuperarInteres = recuperarEntero("txtTasaInteres");

  let valorInteres = calcularInteresSimple(
    recuperarMonto,
    recuperarInteres,
    recuperarPlazo,
  );
  cambiarTexto("spnInteresPagar", valorInteres);

  let totalPagar = calcularTotalPagar(recuperarMonto, valorInteres);
  cambiarTexto("spnTotalPrestamo", totalPagar);

  let cuotaMensual = calularCuotaMensual(totalPagar, recuperarPlazo);

  cambiarTexto("spnCuotaMensual", cuotaMensual);

  let respuestaCredito = analizarCredito(capacidadPago, cuotaMensual);

  let spRepuesta = document.getElementById("spnEstadoCredito");
  if (respuestaCredito) {
    spRepuesta.textContent = "Crédito Aprobado";
  } else {
    spRepuesta.textContent = "Crédito Rechazado";
  }
}

function reiniciarFormulario() {
  // inputs
  let ingresos = document.getElementById("txtIngresos");
  //let egresos = document.getElementById("txtEgresos");

  //Examen
  let arriendo = document.getElementById("txtArriendo");
  let alimentacion = document.getElementById("txtAlimentacion");
  let varios = document.getElementById("txtVarios");
  // Examen

  let monto = document.getElementById("txtMonto");
  let plazo = document.getElementById("txtPlazo");
  let tasa = document.getElementById("txtTasaInteres");
  // limpiar
  ingresos.value = "";
  //egresos.value = "";
  //Examen
  arriendo.value = "";
  alimentacion.value = "";
  varios.value = "";
  //Examen
  monto.value = "";
  plazo.value = "";
  tasa.value = "";

  // Limpiar mensajes
  ingresos.nextElementSibling.textContent = "";
  //EXAMEN
  arriendo.nextElementSibling.textContent = "";
  alimentacion.nextElementSibling.textContent = "";
  varios.nextElementSibling.textContent = "";
  //EXAMEN
  monto.nextElementSibling.textContent = "";
  plazo.nextElementSibling.textContent = "";
  tasa.nextElementSibling.textContent = "";

  // Limpiar resultados
  document.getElementById("spnDisponible").textContent = "";
  document.getElementById("spnCapacidadPago").textContent = "";
  document.getElementById("spnInteresPagar").textContent = "";
  document.getElementById("spnTotalPrestamo").textContent = "";
  document.getElementById("spnCuotaMensual").textContent = "";

  //Limpiar Gastos
  document.getElementById("spnGastos").textContent = "";

  // Estado inicial
  document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
}
/**
 * Función reutilizable para validar inputs de tipo numérico
 * Reglas:
 * - No vacío
 * - Solo números
 * - Máximo 5 dígitos
 *
 * @param {HTMLInputElement} input - Input que dispara la validación
 * @returns {boolean} - true si es válido, false si hay error
 */
function validarInput(input) {
  const valor = input.value.trim();
  const errorMsg = input.nextElementSibling;

  let mensaje = "";

  //const esDecimal = ["txtIngresos", "txtEgresos"].includes(input.id);

  //examen
  const esDecimal = [
    "txtIngresos",
    "txtArriendo",
    "txtAlimentacion",
    "txtVarios",
  ].includes(input.id);
  //examen

  // 1. Vacío
  if (valor === "") {
    mensaje = "Este campo es obligatorio";
  }
  // 2. Validación según tipo
  else {
    if (esDecimal) {
      // Permite decimales (dinero)
      if (!/^\d+(\.\d{1,2})?$/.test(valor)) {
        mensaje = "Formato inválido (ej: 1500.50)";
      }
    } else {
      // Solo enteros
      if (!/^\d+$/.test(valor)) {
        mensaje = "Solo números enteros";
      }
    }
  }

  // 3. Máximo 5 dígitos (sin contar el punto)
  const soloNumeros = valor.replace(".", "");
  if (mensaje === "" && soloNumeros.length > 5) {
    mensaje = "Máximo 5 dígitos";
  }

  // ERROR
  if (mensaje !== "") {
    input.classList.add("input-error");
    errorMsg.textContent = mensaje;

    // Animación (para que se repita)
    input.classList.remove("input-error");
    void input.offsetWidth;
    input.classList.add("input-error");

    return false;
  }

  // OK
  input.classList.remove("input-error");
  errorMsg.textContent = "";
  return true;
}

function validarFormulario() {
  const ingresos = document.getElementById("txtIngresos");

  //examen
  const arriendo = document.getElementById("txtArriendo");
  const alimentacion = document.getElementById("txtAlimentacion");
  const varios = document.getElementById("txtVarios");

  //const egresos = document.getElementById("txtEgresos");
  const monto = document.getElementById("txtMonto");
  const plazo = document.getElementById("txtPlazo");
  const tasa = document.getElementById("txtTasaInteres");

  let valido = true;

  // Validaciones básicas

  if (!validarInput(ingresos)) valido = false;
  //if (!validarInput(egresos)) valido = false;
  //Examen

  if (!validarInput(arriendo)) valido = false;
  if (!validarInput(alimentacion)) valido = false;
  if (!validarInput(varios)) valido = false;

  if (!validarInput(monto)) valido = false;
  if (!validarInput(plazo)) valido = false;
  if (!validarInput(tasa)) valido = false;

  // Convertir valores
  const vIngresos = parseFloat(ingresos.value);
  //const vEgresos = parseFloat(egresos.value);
  //Examen

  const vArriendo = parseFloat(arriendo.value);
  const vAlimentacion = parseFloat(alimentacion.value);
  const vVarios = parseFloat(varios.value);

  const vEgresos = vArriendo + vAlimentacion + vVarios;

  const vMonto = parseInt(monto.value);
  const vPlazo = parseInt(plazo.value);
  const vTasa = parseInt(tasa.value);
  //  VALIDACIÓN NaN
  if (isNaN(vIngresos)) {
    mostrarError(ingresos, "Ingrese un valor válido");
    valido = false;
  }

  //if (isNaN(vEgresos)) {
  // mostrarError(egresos, "Ingrese un valor válido");
  //valido = false;
  //}
  //EXAMEN
  if (isNaN(vEgresos)) {
    mostrarError(arriendo, "Ingrese valores válidos en gastos");
    valido = false;
  }
  //EXAMEN

  // Reglas de negocio
  if (vIngresos < 100 || vIngresos > 99999) {
    mostrarError(ingresos, "Ingresos entre 100 y 99999");
    valido = false;
  }

  //if (vEgresos > vIngresos) {
  // mostrarError(egresos, "Egresos no pueden ser mayores a ingresos");
  //valido = false;
  //}
  //EXAMEN
  if (vEgresos > vIngresos) {
    mostrarError(arriendo, "Los gastos no pueden ser mayores a los ingresos");
    mostrarError(
      alimentacion,
      "Los gastos no pueden ser mayores a los ingresos",
    );
    mostrarError(varios, "Los gastos no pueden ser mayores a los ingresos");
    valido = false;
  }
  //EXAMEN
  if (vMonto < 500 || vMonto > 50000) {
    mostrarError(monto, "Monto entre 500 y 50000");
    valido = false;
  }

  if (vPlazo < 1 || vPlazo > 30) {
    mostrarError(plazo, "Plazo entre 1 y 30 años");
    valido = false;
  }

  if (vTasa < 1 || vTasa > 100) {
    mostrarError(tasa, "Tasa entre 1% y 100%");
    valido = false;
  }

  return valido;
}

function mostrarError(input, mensaje) {
  const errorMsg = input.nextElementSibling;
  input.classList.add("input-error");
  errorMsg.textContent = mensaje;
}


function actualizarGastosEnTiempoReal() {

  let ingresos = recuperarFloat("txtIngresos");
  let arriendo = recuperarFloat("txtArriendo");
  let alimentacion = recuperarFloat("txtAlimentacion");
  let varios = recuperarFloat("txtVarios");

  // evitar NaN
  if (isNaN(ingresos)) ingresos = 0;
  if (isNaN(arriendo)) arriendo = 0;
  if (isNaN(alimentacion)) alimentacion = 0;
  if (isNaN(varios)) varios = 0;

  let gastos = arriendo + alimentacion + varios;

  cambiarTexto("spnGastos", gastos);

  let disponible = calcularDisponible(ingresos, gastos);

  cambiarTexto("spnDisponible", disponible);

  let capacidad = calculaCapacidadPago(disponible);
  cambiarTexto("spnCapacidadPago", capacidad);
}

