// 1. Activa la figura desde las tarjetas
// Cambia la figura en el menú desplegable al hacer clic en una tarjeta
function seleccionarFigura(figura) {
  const selectFigura = document.getElementById("figura");
  if (selectFigura) {
    selectFigura.value = figura;
    actualizarCamposMedidas();
  }
}

// Oculta o muestra los campos y acmbia sus etiquetas según la figura
function actualizarCamposMedidas() {
  const figura = document.getElementById("figura").value;
  const label1 = document.querySelector('label[for="medida-1"]');
  const label2 = document.querySelector('label[for="medida-2"]');
  const input2 = document.getElementById("medida-2");

  if (!label1 || !label2 || !input2) return;

  if (figura === "cubo") {
    label1.textContent = "Medida del Lado";
    input2.parentElement.style.display = "none";
  } else if (figura === "esfera") {
    label1.textContent = "Radio";
    input2.parentElement.style.display = "none";
  } else if (figura === "cilindro" || figura === "cono") {
    label1.textContent = "Radio";
    label2.textContent = "Altura";
    input2.parentElement.style.display = "block";
  } else if (figura === "prisma") {
    label1.textContent = "Área de la Base / Largo";
    label2.textContent = "Altura / Ancho";
    input2.parentElement.style.display = "block";
  }
}

// Calcula el volumen según las medidas ingresadas
function calcularVolumen() {
  const figura = document.getElementById("figura").value;
  const m1 = parseFloat(document.getElementById("medida-1").value);
  const m2 = parseFloat(document.getElementById("medida-2").value);
  const textoResultado = document.getElementById("resultado-texto");

  if (!textoResultado) return;

  // Validar que se ingrese un número válido mayor a 0
  if (isNaN(m1) || m1 <= 0) {
    textoResultado.textContent = "Ingresa medidas válidas";
    return;
  }

  let volumen = 0;

  if (figura === "cubo") {
    volumen = Math.pow(m1, 3);
  } else if (figura === "prisma") {
    volumen = m1 * (m2 || 1);
  } else if (figura === "cilindro") {
    volumen = Math.PI * Math.pow(m1, 2) * (m2 || 1);
  } else if (figura === "cono") {
    volumen = (Math.PI * Math.pow(m1, 2) * (m2 || 1)) / 3;
  } else if (figura === "esfera") {
    volumen = (4 / 3) * Math.PI * Math.pow(m1, 3);
  }

  // Muestra el resultado final con dos decimales
  textoResultado.textContent = `${volumen.toFixed(2)} u³`;
}

// Configuración inicial del lienzo 3D y eventos
function setup() {
  let canvas = createCanvas(300, 250, WEBGL);
  canvas.parent("contenedor-3d");

  // Escuchar cambios en el selector de figuras
  const selectFigura = document.getElementById("figura");
  if (selectFigura) {
    selectFigura.addEventListener("change", actualizarCamposMedidas);
  }

  // Escuchar clic en el botón de calcular
  const btnCalcular = document.querySelector('button[type="button"]');
  if (btnCalcular) {
    btnCalcular.addEventListener("click", calcularVolumen);
  }

  actualizarCamposMedidas();
}

// Renderizado continuo de la figura 3D
function draw() {
  background(24, 24, 27);

  // Permite rotar la figura con el mouse
  orbitControl(); 

  // Estilos de la figura
  stroke(0, 229, 255);
  fill(0, 229, 255, 40);
  strokeWeight(2);

  const select = document.getElementById("figura");
  const figuraActual = select ? select.value : "cubo";

  // Dibuja la figura correspondiente
  if (figuraActual === "cubo") {
    box(100);
  } else if (figuraActual === "prisma") {
    box(140, 70, 90);
  } else if (figuraActual === "cilindro") {
    cylinder(50, 110);
  } else if (figuraActual === "cono") {
    cone(60, 110);
  } else if (figuraActual === "esfera") {
    sphere(65);
  }

  // Ajusta el tamaño del canvas automáticamente si la pantalla cambia o se gira
function windowResized() {
  const contenedor = document.getElementById("contenedor-3d");
  if (contenedor) {
    // Redimensiona el lienzo 3D según el ancho del contenedor en la pantalla
    let ancho = Math.min(300, contenedor.clientWidth - 20);
    resizeCanvas(ancho, 250);
  }
}
}
