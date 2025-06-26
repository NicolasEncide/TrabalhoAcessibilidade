//#region Brilho, Saturação, Desfoque, Contraste
const brilhoRange = document.getElementById("brilhoRange"),
    saturacaoRange = document.getElementById("saturacaoRange"),
    desfoqueRange = document.getElementById("desfoqueRange"),
    constrasteRange = document.getElementById("constrasteRange");

const filterSet = (nomePropriedade, valor) => {
    document.documentElement.style.setProperty(nomePropriedade, valor);
}

brilhoRange.addEventListener('input', () => {
    filterSet("--brightness", brilhoRange.value);
});

saturacaoRange.addEventListener('input', () => {
    filterSet("--saturate", saturacaoRange.value);
});

desfoqueRange.addEventListener('input', () => {
    filterSet("--blur", desfoqueRange.value + "px");
});

constrasteRange.addEventListener('input', () => {
    filterSet("--contrast", constrasteRange.value);
});
//#endregion
//#region Tamanho da Fonte
let tamanhoOriginal = 14;

const buttonAumentar = document.getElementById("buttonAumentar");
const buttonDiminuir = document.getElementById("buttonDiminuir");

buttonAumentar.addEventListener('click', () => {
    if (tamanhoOriginal < 22){tamanhoOriginal += 2;}
    document.getElementById("tamanhoFonte").style.fontSize = tamanhoOriginal + "pt";
});

buttonDiminuir.addEventListener('click', () => {
    if (tamanhoOriginal > 8){tamanhoOriginal -= 2;}
    document.getElementById("tamanhoFonte").style.fontSize = tamanhoOriginal + "pt";
});
//#endregion
//#region Captcha
const canvas = document.getElementById('captchaCanvas'),
    ctx = canvas.getContext('2d'),
    captchaTexto = gerarTexto();


function gerarTexto() {
    const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let texto = '';
    for (let i = 0; i < 5; i++) {
    texto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return texto;
}

function desenharTextoDistorcido(texto) {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tamanhos = [26, 28, 30, 32, 34];
    for (let i = 0; i < texto.length; i++) {
    const angulo = (Math.random() - 0.5) * 0.5;
    ctx.save();
    ctx.translate(30 + i * 40, 40 + (Math.random() * 20 - 10));
    ctx.rotate(angulo);
    ctx.font = tamanhos[i % tamanhos.length] + 'px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(texto[i], 0, 0);
    ctx.restore();
    }

    for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
    }

    for (let i = 0; i < 150; i++) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
}

function verificarCaptcha() {
    const entrada = document.getElementById('captchaInput').value.trim().toUpperCase();
    const erro = document.getElementById('mensagemErro');
    if (entrada !== captchaTexto) {
    erro.textContent = "Texto incorreto. Tente novamente.";
    erro.style.color = "red";
    } else {
    erro.textContent = "Verificação concluída com sucesso!";
    erro.style.color = "green";
    }
}
desenharTextoDistorcido(captchaTexto);


//#endregion
//#region Formulario
document.getElementById("tel").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
});

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value,
        email = document.getElementById("email").value,
        tel = document.getElementById("tel").value,
        tabela = document.getElementById("tabela");

    const linha = document.createElement("tr"),
        colunaNome = document.createElement("td"),
        colunaEmail = document.createElement("td"),
        colunaTel = document.createElement("td");

    colunaNome.textContent = nome;
    colunaEmail.textContent = email;
    colunaTel.textContent = tel;
    linha.appendChild(colunaNome);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaTel);
    tabela.appendChild(linha);
});
//#endregion
//#region Tema Escuro
document.getElementById("btnEscuro").addEventListener("click", () => {
    document.body.classList.toggle("escuro-body");
    document.querySelectorAll(".conteudo").forEach(div => div.classList.toggle("escuro-conteudo"));
    document.getElementById("navegacao").classList.toggle("escuro-container");
});

//#endregion