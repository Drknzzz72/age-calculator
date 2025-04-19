const { DateTime } = luxon;

let intervaloAnimacion;
let etapaActual = 1;
const maxEtapas = 3;
let calculado = false;

function mostrarImagenEtapa(etapa) {
  document.querySelectorAll('.persona-img').forEach(img => img.classList.remove('active'));
  const img = document.getElementById(`img${etapa}`);
  if (img) img.classList.add('active');

  document.querySelectorAll('.circle').forEach(c => c.style.backgroundColor = '');
  const circle = document.getElementById(`circle${etapa}`);
  if (circle) circle.style.backgroundColor = 'var(--azul)';

  const textoEtapa = document.getElementById('texto-etapa');
  textoEtapa.style.display = 'block';
  textoEtapa.textContent =
    etapa === 1 ? 'CHILD (0-12 years)' :
    etapa === 2 ? 'ADULT (13-59 years)' :
    'ELDERLY (60+ years)';
}

function iniciarAnimacionCiclica() {
  intervaloAnimacion = setInterval(() => {
    if (calculado) return;
    mostrarImagenEtapa(etapaActual);
    etapaActual++;
    if (etapaActual > maxEtapas) etapaActual = 1;
  }, 2500);
}

window.addEventListener("DOMContentLoaded", () => {
  iniciarAnimacionCiclica();
});

document.getElementById("calculate").addEventListener("click", () => {
  const input = document.getElementById("birthdate").value;
  const birthDate = DateTime.fromISO(input);
  const today = DateTime.now();

  if (!birthDate.isValid || birthDate > today) {
    alert("Fecha no válida");
    return;
  }

  clearInterval(intervaloAnimacion);
  calculado = true;

  const diff = today.diff(birthDate, ["years", "months", "days"]).toObject();
  const edad = Math.floor(diff.years);

  const edadTexto = document.getElementById("edad-texto");
  edadTexto.innerHTML = `
    You are ${Math.floor(diff.years)} years, 
    ${Math.floor(diff.months)} months and 
    ${Math.floor(diff.days)} days old.
  `;

  edadTexto.style.display = 'block';

  if (edad <= 12) mostrarImagenEtapa(1);
  else if (edad <= 59) mostrarImagenEtapa(2);
  else mostrarImagenEtapa(3);
});
