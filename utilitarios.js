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

function mostrarError(idInput, mensaje) {
  let input = document.getElementById(idInput);

  input.classList.add("input-error");

  let errorAnterior = document.getElementById(idInput + "-error");

  if (errorAnterior) {
    errorAnterior.remove();
  }

  let textoError = document.createElement("div");

  textoError.className = "mensaje-error";

  textoError.id = idInput + "-error";

  textoError.innerText = mensaje;

  input.insertAdjacentElement("afterend", textoError);

  setTimeout(function () {
    input.classList.remove("input-error");
  }, 600);
}
function limpiarError(idInput) {
  let error = document.getElementById(idInput + "-error");

  if (error) {
    error.remove();
  }
}

function mostrarAlertaBonita(mensaje) {
  let alertaAnterior = document.querySelector(".overlay-alerta");

  if (alertaAnterior) {
    alertaAnterior.remove();
  }

  let overlay = document.createElement("div");

  overlay.className = "overlay-alerta";

  overlay.innerHTML = `
    
    <div class="alerta-modal">

      <div class="alerta-check">
        ✅
      </div>

      <h2>¡Éxito!</h2>

      <p>${mensaje}</p>

    </div>

  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("mostrar");
  }, 50);

  setTimeout(() => {
    overlay.classList.remove("mostrar");

    setTimeout(() => {
      overlay.remove();
    }, 400);
  }, 2200);
}
