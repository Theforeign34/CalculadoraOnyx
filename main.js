const board = document.querySelector(".padre");
const pantalla = board.firstElementChild;
const pantallaResultados = board.lastElementChild;

const borrarTodo = document
  .querySelector(".btnBorrar")
  .addEventListener("click", () => {
    pantalla.value = "";
    pantallaResultados.value = "";
  });

const ultimoElemento = () => {
  return pantalla.value.charAt(pantalla.value.length - 1);
};

const botones = document.querySelectorAll(".btn");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    pantalla.value += btn.textContent;
  });
});

const suma = document.querySelector(".suma").addEventListener("click", () => {
  const ultimo = ultimoElemento();

  if (pantalla.value.length === 0 || ultimo === "+") return;

  if (ultimo === "*" || ultimo === "/" || ultimo === "-") {
    reemplazar("+");
    return;
  }

  pantalla.value += "+";
});

const resta = document.querySelector(".resta").addEventListener("click", () => {
  const ultimo = ultimoElemento();

  if (pantalla.value.length === 0) {
    pantalla.value += "-";
    return;
  }

  if (ultimo === "-") return;

  if (ultimo === "+") {
    reemplazar("-");
    return;
  }

  pantalla.value += "-";
});

const multiplicacion = document
  .querySelector(".multiplicacion")
  .addEventListener("click", () => {
    const ultimo = ultimoElemento();

    if (pantalla.value.length === 0 || ultimo === "*") return;

    if (ultimo === "+" || ultimo === "/" || ultimo === "-") {
      reemplazar("*");
      return;
    }

    pantalla.value += "*";
  });

const division = document
  .querySelector(".division")
  .addEventListener("click", () => {
    const ultimo = ultimoElemento();

    if (pantalla.value.length === 0 || ultimo === "/") return;

    if (ultimo === "+" || ultimo === "*" || ultimo === "-") {
      reemplazar("/");
      return;
    }

    pantalla.value += "/";
  });

const borrar = document.querySelector(".back").addEventListener("click", () => {
  let cantidadNumeros = pantalla.value;
  let cantidadCaracteres = pantalla.value.length;

  if (cantidadCaracteres != 0) {
    pantalla.value = cantidadNumeros.substring(0, cantidadCaracteres - 1);
  }
});

const resultado = document
  .querySelector(".igual")
  .addEventListener("click", () => {
    if (pantalla.value.length === 0) {
      return;
    }
    try {
      pantallaResultados.value = " = " + eval(pantalla.value);
      let text = document.createElement("p");
      text.textContent = pantalla.value + pantallaResultados.value;
      historial.append(text);
    } catch (error) {
      pantallaResultados.value = "ERROR";
    }
  });

const reemplazar = (caracter) => {
  pantalla.value = pantalla.value.slice(0, -1);
  pantalla.value += caracter;
};

const historial = document.querySelector(".historial");

const borrar_historial = document.querySelector(".borrar-historial");
borrar_historial.addEventListener("click", (e) => {
  historial.querySelectorAll("p").forEach((p) => p.remove());
});

const agregarPunto = () => {
  let cadena = pantalla.value.split(/[+\ /*%-]/);
  let ultimoNumero = cadena[cadena.length - 1];
  return ultimoNumero.includes(".");
};

const punto = document.querySelector(".punto").addEventListener("click", () => {
  if (pantalla.value.length === 0) {
    pantalla.value += "0.";
    return;
  }
  if (ultimoElemento() === ".") {
    return;
  }
  if (
    ultimoElemento() === "+" ||
    ultimoElemento() === "-" ||
    ultimoElemento() === "*" ||
    ultimoElemento() === "%" ||
    ultimoElemento() === "/"
  ) {
    pantalla.value += "0.";
  }
  if (!agregarPunto()) {
    pantalla.value += ".";
  }
});

const masMenos = document
  .querySelector(".masMenos")
  .addEventListener("click", () => {
    let primerElemento = pantalla.value.charAt(0);

    if (primerElemento.length === 0) {
      return;
    }

    if (primerElemento === "-") {
      pantalla.value = pantalla.value.slice(1);
      return;
    }
    pantalla.value = "-" + pantalla.value;
  });

const potencia = document
  .querySelector(".potencia")
  .addEventListener("click", () => {
    let resultado = Math.pow(eval(pantalla.value), 2);

    pantallaResultados.value = " = " + resultado;

    let text = document.createElement("p");
    text.textContent = pantalla.value + "^2 = " + resultado;
    historial.append(text);
  });

document.addEventListener("keydown", (e) => {

  if ("0123456789".includes(e.key)) {
    pantalla.value += e.key;
  }
    if (e.key === "+") document.querySelector(".suma").click();
    if (e.key === "-") document.querySelector(".resta").click();
    if (e.key === "*") document.querySelector(".multiplicacion").click();
    if (e.key === "/") document.querySelector(".division").click();
    
    if (e.key === "Enter") document.querySelector(".igual").click();
    if (e.key === "Backspace") document.querySelector(".back").click();
    if (e.key === "Escape") document.querySelector(".btnBorrar").click();
    if (e.key === ".") document.querySelector(".punto").click();
});
