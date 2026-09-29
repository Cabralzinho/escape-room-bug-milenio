const CODIGOS = ["1", "2", "3"];

let erros = 0;
const validados = [false, false, false];

const inputs = [
  document.getElementById("code1"),
  document.getElementById("code2"),
  document.getElementById("code3")
];

const botoes = [
  document.getElementById("btn1"),
  document.getElementById("btn2"),
  document.getElementById("btn3")
];

const feedbacks = [
  document.getElementById("feedback1"),
  document.getElementById("feedback2"),
  document.getElementById("feedback3")
];

const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3")
];

const lockPanel = document.getElementById("lockPanel");
const doorScreen = document.getElementById("doorScreen");
const systemStatus = document.getElementById("systemStatus");
const attempts = document.getElementById("attempts");
const progress = document.getElementById("progress");
const fakeDate = document.getElementById("fakeDate");

function validarCodigo(indice) {
  if (validados[indice]) return;

  const valor = inputs[indice].value.trim();

  if (valor === CODIGOS[indice]) {
    validados[indice] = true;

    inputs[indice].value = CODIGOS[indice];
    inputs[indice].disabled = true;
    inputs[indice].classList.add("validated");

    botoes[indice].disabled = true;
    botoes[indice].textContent = "SALVO";

    steps[indice].classList.add("success");

    feedbacks[indice].textContent =
      `> CÓDIGO ${indice + 1} ACEITO E SALVO.`;
    feedbacks[indice].className = "feedback ok";

    atualizarProgresso();
  } else {
    erros++;
    attempts.textContent = `ERROS: ${erros}`;

    feedbacks[indice].textContent =
      `> CÓDIGO ${indice + 1} INCORRETO.`;
    feedbacks[indice].className = "feedback error";

    steps[indice].classList.remove("shake");
    void steps[indice].offsetWidth;
    steps[indice].classList.add("shake");

    inputs[indice].select();
  }
}

function atualizarProgresso() {
  const total = validados.filter(Boolean).length;
  progress.textContent = `CÓDIGOS: ${total}/3`;

  if (total === 3) {
    setTimeout(desbloquearPorta, 600);
  }
}

function desbloquearPorta() {
  lockPanel.classList.add("hidden");
  doorScreen.classList.remove("hidden");

  systemStatus.innerHTML =
    '<span class="dot" style="background:#56ff9a;box-shadow:0 0 9px #56ff9a"></span>SISTEMA LIBERADO';

  systemStatus.style.color = "#8dffb9";
  systemStatus.style.borderColor = "rgba(86,255,154,.45)";
}

botoes.forEach((botao, indice) => {
  botao.addEventListener("click", () => validarCodigo(indice));
});

inputs.forEach((input, indice) => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      validarCodigo(indice);
    }
  });
});

const inicio = new Date(1999, 11, 31, 23, 59, 57);
const inicioReal = Date.now();

setInterval(() => {
  const segundos = Math.floor((Date.now() - inicioReal) / 1000);
  const atual = new Date(inicio.getTime() + segundos * 1000);

  const dd = String(atual.getDate()).padStart(2, "0");
  const mm = String(atual.getMonth() + 1).padStart(2, "0");
  const aa = String(atual.getFullYear()).padStart(4, "0");
  const hh = String(atual.getHours()).padStart(2, "0");
  const min = String(atual.getMinutes()).padStart(2, "0");
  const ss = String(atual.getSeconds()).padStart(2, "0");

  fakeDate.textContent = `${dd}/${mm}/${aa} ${hh}:${min}:${ss}`;
}, 1000);
