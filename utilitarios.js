function recuperaraTexto(idComponente) {
  let componente;
  let valorIngresado;
  componente = document.getElementById(idComponente);
  valorIngresado = componente.value;
  return valorIngresado;
}

function recuperarInt(idComponente) {
  let valorCaja = recuperaraTexto(idComponente);
  let valorEntero = parseInt(valorCaja);
  return valorEntero;
}
function recuperarFloat(idComponente) {
  let valorCaja = recuperaraTexto(idComponente);
  let valorFlotante = parseFloat(valorCaja);
  return valorFlotante;
}
function mostrarTexto(idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.innerText = mensaje;
}
function mostrarTextoEnCaja(idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.value = mensaje;
}

function mostrarImagen(idComponente, rutaImagen) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.src = rutaImagen;
}

function calcularDisponible(ingresos, egresos) {
  return ingresos - egresos;
}

function calculaCapacidadPago(disponible) {
  return disponible * 0.4;
}

function calcularInteresSimple(monto, interes, plazo) {
  return (monto * interes * plazo) / 100;
}

function calcularTotalPagar(monto, interes) {
  return monto + interes;
}

function calularCuotaMensual(totalPagar, plazo) {
  return totalPagar / (plazo * 12);
}

function analizarCredito(capacidadPago, cuotaMensual) {
  return cuotaMensual <= capacidadPago;
}
function validarCedula(cedula) {
  if (cedula.length != 10) {
    return false;
  }

  for (let i = 0; i < cedula.length; i++) {
    let caracter = cedula.charAt(i);

    if (caracter < "0" || caracter > "9") {
      return false;
    }
  }

  return true;
}