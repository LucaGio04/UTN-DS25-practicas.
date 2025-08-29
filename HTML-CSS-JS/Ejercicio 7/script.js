/* === Ejercicio 7: Inciso 1 === */

// Definimos la variable 'numero' y le asignamos un valor
let numero = 10;

// Le sumamos 5 a la variable
numero = numero + 5; 

// Mostramos el resultado en la consola del navegador para verificar
console.log("Inciso 1:", numero); // Esto imprimirá "Inciso 1: 15"

/* ----------------------------- */

/* === Ejercicio 7: Inciso 2 === */

// Definimos dos variables de tipo cadena
let nombre = "Juan";
let apellido = "Pérez";

// Concatenamos las dos variables
let nombreCompleto = nombre + " " + apellido;

// Mostramos el resultado en la consola
console.log("Inciso 2:", nombreCompleto); // Esto imprimirá "Inciso 2: Juan Pérez"

/* ----------------------------- */

/* === Ejercicio 7: Inciso 3 === */

// Definimos dos variables numéricas para comparar
let numero1 = 20;
let numero2 = 15;

if (numero1 === numero2) {
  console.log("Inciso 3: Los dos números son iguales.");
} else if (numero1 > numero2) {
  console.log("Inciso 3: El primer número es mayor que el segundo.");
} else {
  console.log("Inciso 3: El primer número es menor que el segundo.");
}

// Para evaluar si son diferentes, puedes usar otra sentencia
if (numero1 !== numero2) {
  console.log("Inciso 3: Los dos números son diferentes.");
}

/* ----------------------------- */

/* === Ejercicio 7: Inciso 4 === */

// Pedimos al usuario que ingrese un número y convertimos el valor a un número entero
let numeroUsuario = parseInt(prompt("Ingresa un número entre 1 y 10:"));

switch (numeroUsuario) {
  case 1:
  case 2:
  case 3:
    console.log("Inciso 4: El número ingresado pertenece al Grupo 1.");
    break;
  case 4:
  case 5:
  case 6:
    console.log("Inciso 4: El número ingresado pertenece al Grupo 2.");
    break;
  case 7:
  case 8:
  case 9:
  case 10:
    console.log("Inciso 4: El número ingresado pertenece al Grupo 3.");
    break;
  default:
    console.log("Inciso 4: El número ingresado no está en el rango de 1 a 10.");
}

/* ----------------------------- */

/* === Ejercicio 7: Inciso 5 === */

// Definimos una variable para almacenar la sumatoria
let sumatoria = 0;

// Usamos un bucle for para iterar desde 0 hasta 10
for (let i = 0; i <= 10; i++) {
  sumatoria = sumatoria + i;
}

// Mostramos el resultado en la consola
console.log("Inciso 5: La sumatoria de 0 a 10 es:", sumatoria); // Esto imprimirá 55

/* ----------------------------- */

/* === Ejercicio 7: Inciso 6 === */

// 1. Generamos un array con 10 números
let numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1]; 

// 2. Definimos una variable para almacenar el producto total, comenzando en 1
let productoTotal = 1;

// 3. Recorremos el array
for (let i = 0; i < numeros.length; i++) {
  // Multiplicamos el producto actual por cada elemento del array
  productoTotal = productoTotal * numeros[i];
}

// 4. Mostramos el producto final en la consola
console.log("Inciso 6: El producto total de los elementos del array es:", productoTotal); 

/* ----------------------------- */

/* === Ejercicio 7: Inciso 7 === */

// 1. Definimos la función 'multiplicar' que recibe dos valores
function multiplicar(valor1, valor2) {
  // 2. Retornamos el producto de los dos valores
  return valor1 * valor2;
}

// 3. Llamamos a la función con dos números y guardamos el resultado
let producto = multiplicar(5, 8);

// 4. Mostramos el resultado
console.log("Inciso 7: El producto es:", producto); // Esto imprimirá 40

/* ----------------------------- */

/* === Ejercicio 7: Inciso 8 === */

// 1. Definimos la función 'unirCadenas' que recibe dos parámetros de tipo cadena
function unirCadenas(cadena1, cadena2) {
  // 2. Retornamos la concatenación de las dos cadenas
  return cadena1 + " " + cadena2;
}

// 3. Llamamos a la función con dos cadenas de texto
let nombreCompleto2 = unirCadenas("Lionel", "Messi");

// 4. Mostramos el resultado
console.log("Inciso 8: El resultado de la concatenación es:", nombreCompleto2); // Esto imprimirá "Lionel Messi"

/* ----------------------------- */

/* === Ejercicio 7: Inciso 9 === */

// Definimos la función que recibe dos parámetros, 'val1' y 'val2'
function compararValores(val1, val2) {
  if (val1 > val2) {
    console.log("Inciso 9: El primer valor (" + val1 + ") es el mayor.");
  } else if (val2 > val1) {
    console.log("Inciso 9: El segundo valor (" + val2 + ") es el mayor.");
  } else {
    console.log("Inciso 9: Ambos valores (" + val1 + " y " + val2 + ") son iguales.");
  }
}

// Probamos la función con diferentes escenarios
compararValores(10, 5);    // El primer valor es mayor
compararValores(20, 35);   // El segundo valor es mayor
compararValores(100, 100); // Los valores son iguales

/* ----------------------------- */

/* === Ejercicio 7: Inciso 10 === */

// Definimos la función que recibe un número como parámetro
function dibujarAsteriscos(cantidad) {
  // Usamos un bucle for para iterar la cantidad de veces que se indique
  for (let i = 0; i < cantidad; i++) {
    console.log("*");
  }
}

// Llamamos a la función con un número
dibujarAsteriscos(5); // Esto imprimirá 5 asteriscos en la consola

/* ----------------------------- */

/* === Ejercicio 7: Inciso 11 === */

function calcularMontoFinal(montoProducto, medioDePago) {
  let montoFinal = 0;
  let descuento = 0;

  if (montoProducto < 200) {
    // Si el monto es menor a $200, no hay descuento
    descuento = 0;
  } else if (montoProducto >= 200 && montoProducto <= 400) {
    // Si el monto está entre $200 y $400, el descuento varía por medio de pago
    if (medioDePago === 'E') {
      descuento = 30; // Efectivo
    } else if (medioDePago === 'D') {
      descuento = 20; // Débito
    } else if (medioDePago === 'C') {
      descuento = 10; // Crédito
    } else {
      console.log("Medio de pago no reconocido.");
      return "Error";
    }
  } else if (montoProducto > 400) {
    // Si el monto es mayor a $400, el descuento es siempre del 40%
    descuento = 40;
  }

  // Calculamos el monto final aplicando el descuento
  montoFinal = montoProducto - (montoProducto * (descuento / 100));

  // Retornamos el monto final
  return montoFinal;
}

// Ejemplos para probar la función
let resultado1 = calcularMontoFinal(150, 'E'); // Menor a $200, sin descuento. Debería ser 150.
console.log("Inciso 11: Monto $150 con efectivo -> Monto final:", resultado1);

let resultado2 = calcularMontoFinal(300, 'E'); // Entre $200 y $400, 30% de descuento. Debería ser 210.
console.log("Inciso 11: Monto $300 con efectivo -> Monto final:", resultado2);

let resultado3 = calcularMontoFinal(500, 'C'); // Mayor a $400, 40% de descuento fijo. Debería ser 300.
console.log("Inciso 11: Monto $500 con tarjeta de crédito -> Monto final:", resultado3);

/* ----------------------------- */

/* === Ejercicio 7: Inciso 12 === */

// Definimos la función que recibe un número que representa la altura
/* === Ejercicio 7: Inciso 12 (Función para dibujar el árbol) === */
function dibujarMedioArbol(altura) {
  for (let i = 1; i <= altura; i++) {
    let fila = "";
    for (let j = 0; j < i; j++) {
      fila = fila + "* ";
    }
    console.log(fila);
  }
}

/* ----------------------------- */

// Llamamos a la función con una altura de 5
console.log("Inciso 12:");
dibujarMedioArbol(5);

/* === Ejercicio 7: Inciso 12 (Función para dibujar el árbol) === */

/* ----------------------------- */

/* ----------------------------- */

/* === Ejercicio 7: Inciso 13 === */

// Definimos la función que recibe el número del día de la semana
function obtenerDiaDeLaSemana(numeroDia) {
  switch (numeroDia) {
    case 1:
      return "lunes";
    case 2:
      return "martes";
    case 3:
      return "miércoles";
    case 4:
      return "jueves";
    case 5:
      return "viernes";
    case 6:
    case 7:
      return "fin de semana";
    default:
      return "Mensaje de error: El valor ingresado no representa un día de la semana.";
  }
}

// Ejemplos para probar la función y ver los resultados en la consola
let dia1 = obtenerDiaDeLaSemana(1);
console.log("Inciso 13 (Día 1):", dia1); // Retorna "lunes"

let dia6 = obtenerDiaDeLaSemana(6);
console.log("Inciso 13 (Día 6):", dia6); // Retorna "fin de semana"

let diaInvalido = obtenerDiaDeLaSemana(10);
console.log("Inciso 13 (Día 10):", diaInvalido); // Retorna el mensaje de error

/* ----------------------------- */

/* === Ejercicio 7: Inciso 14 === */

function calcularPromedio() {
  // 1. Pedimos al usuario la cantidad de números
  let cantidadNumeros = parseInt(prompt("Ingresa la cantidad de números que deseas promediar:"));
  
  // 2. Pedimos los números como una cadena de texto
  let numerosIngresados = prompt("Ingresa los " + cantidadNumeros + " números separados por espacios:");
  
  // 3. Convertimos la cadena en un array de strings usando split()
  let arrayDeStrings = numerosIngresados.split(" ");
  
  // Verificamos si la cantidad de números coincide con lo prometido
  if (arrayDeStrings.length !== cantidadNumeros) {
    console.error("Error: La cantidad de números ingresados no coincide con la cantidad que indicaste.");
    return; // Salimos de la función si hay un error
  }
  
  let suma = 0;
  
  // 4. Recorremos el array y sumamos los números
  for (let i = 0; i < arrayDeStrings.length; i++) {
    // Usamos Number() para convertir cada string a un número y lo sumamos
    suma += Number(arrayDeStrings[i]);
  }
  
  // 5. Calculamos el promedio
  let promedio = suma / cantidadNumeros;
  
  // 6. Mostramos el resultado en la consola
  console.log("Inciso 14: El promedio de los números es:", promedio);
}

// Llamamos a la función para ejecutarla
calcularPromedio();

/* ----------------------------- */

/* === Ejercicio 7: Inciso 15 (Interacción con el DOM) === */

// Obtenemos los elementos de HTML por su ID
const inputAltura = document.getElementById("inputAltura");
const btnDibujar = document.getElementById("btnDibujar");
const mensajeError = document.getElementById("mensajeError");

// Agregamos un "escuchador de eventos" al botón
btnDibujar.addEventListener("click", function() {
  const altura = Number(inputAltura.value); // Convertimos el valor a número

  // Validación de datos
  if (isNaN(altura) || altura <= 0 || !Number.isInteger(altura)) {
    mensajeError.textContent = "Por favor, ingresa un número entero positivo.";
    console.error("Error de validación: valor no válido.");
    return; // Detenemos la ejecución de la función
  } else {
    mensajeError.textContent = ""; // Limpiamos cualquier mensaje de error anterior
  }

  // Si la validación es exitosa, llamamos a la función del inciso 12
  console.clear(); // Limpiamos la consola para cada dibujo
  console.log("Inciso 15: Dibujando medio-árbol de altura " + altura + "...");
  dibujarMedioArbol(altura);
});

/* ----------------------------- */

/* === Ejercicio 7: Inciso 16 === */

// Obtenemos los elementos del DOM
const visorPiso = document.getElementById('visorPiso');
const visorDpto = document.getElementById('visorDpto');
const visorMensaje = document.getElementById('visorMensaje');
const botones = document.querySelectorAll('.numero');
const btnLlamar = document.getElementById('btnLlamar');
const btnBorrar = document.getElementById('btnBorrar');

// Variables de estado
let pisoMarcado = "";
let dptoMarcado = "";
let esPiso = true; // Variable para saber si estamos marcando el piso o el dpto

// Función para manejar el clic en los números
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.dataset.valor;

        if (esPiso) {
            if (pisoMarcado.length < 2) {
                pisoMarcado += valor;
                visorPiso.textContent = pisoMarcado;
            } else {
                esPiso = false; // Pasamos a marcar el dpto
                dptoMarcado += valor;
                visorDpto.textContent = dptoMarcado;
            }
        } else {
            if (dptoMarcado.length < 1) {
                dptoMarcado += valor;
                visorDpto.textContent = dptoMarcado;
            }
        }
    });
});

// Función para el botón LLAMAR
btnLlamar.addEventListener('click', () => {
    const piso = parseInt(pisoMarcado);
    const dpto = parseInt(dptoMarcado);

    // Validación de piso
    if (piso < 0 || piso > 48 || isNaN(piso)) {
        visorMensaje.textContent = "Error: El piso no existe.";
    } 
    // Validación de dpto
    else if (dpto < 1 || dpto > 6 || isNaN(dpto)) {
        visorMensaje.textContent = "Error: El dpto no existe.";
    } 
    // Mensaje de éxito
    else {
        visorMensaje.textContent = `Llamando a piso ${piso} dpto ${dpto}...`;
    }
});

// Función para el botón BORRAR
btnBorrar.addEventListener('click', () => {
    pisoMarcado = "";
    dptoMarcado = "";
    esPiso = true;
    visorPiso.textContent = "--";
    visorDpto.textContent = "--";
    visorMensaje.textContent = "Listo para marcar.";
});

/* ----------------------------- */

/* === Ejercicio 7: Inciso 17 === */

// Definimos cada línea del teclado en un array
const fila1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const fila2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
const fila3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// Variable para el texto del display
let displayTexto = '';

// Obtenemos los elementos del DOM
const display = document.getElementById('display');
const tecladoBody = document.querySelector('.teclado-body');
const btnBorrar2 = document.getElementById('btnBorrar');
const btnBackspace = document.getElementById('btnBackspace');

// Función centralizada para actualizar el display
function actualizarDisplay() {
    display.textContent = displayTexto;
}

// Función para crear las filas del teclado
function crearTeclas(filaArray) {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'fila';

    filaArray.forEach(tecla => {
        const boton = document.createElement('button');
        boton.textContent = tecla;
        boton.className = 'tecla';
        
        // Añadimos el evento de clic a cada tecla
        boton.addEventListener('click', () => {
            displayTexto += tecla;
            actualizarDisplay();
        });

        filaDiv.appendChild(boton);
    });

    tecladoBody.appendChild(filaDiv);
}

// Llamamos a la función para crear el teclado completo
crearTeclas(fila1);
crearTeclas(fila2);
crearTeclas(fila3);

// Añadimos el evento para el botón BORRAR
btnBorrar2.addEventListener('click', () => {
    displayTexto = '';
    actualizarDisplay();
});

// Añadimos el evento para el botón BACKSPACE
btnBackspace.addEventListener('click', () => {
    displayTexto = displayTexto.slice(0, -1);
    actualizarDisplay();
});

/* ----------------------------- */

