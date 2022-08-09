let palavras = ['CARRO', 'CASA', 'FLOR', 'AGUA',
    'CACHORRO', 'GATO', 'CAVALO', 'ELEFANTE'];

let letrasErradas = [];
let letrasCertas = [];
let nLetrasCertas = 0;
let palavraSecreta = '';

const menu = document.getElementById('menu');

const addNewWordDiv = document.getElementById('add-new-word');
const game = document.getElementById('game');
let partesCorpo = document.querySelectorAll('.forca-corpo')

function showWrongLetters() {
    const div = document.querySelector('.letras-erradas-container');
    div.innerHTML = ''; // limpa o conteúdo da div
    letrasErradas.forEach(l => {
        const letra = document.createElement('span');
        letra.className = 'w-letter';
        letra.innerHTML = `${l}`;
        div.appendChild(letra);
    })
}

function showRightLetters() {
    const div = document.querySelector('.letras-certas-container');
    div.innerHTML = ''; // limpa o conteúdo da div
    const letrasSpan = div.appendChild(document.createElement('span'));
    letrasSpan.className = 'letras';
    nLetrasCertas = 0;
    palavraSecreta.split('').forEach(l => {
        if (letrasCertas.includes(l)) {
            const letra = document.createElement('span');
            letra.className = 'r-letter';
            letra.innerHTML = `${l}`;
            letrasSpan.appendChild(letra);
            nLetrasCertas = nLetrasCertas + 1;
        } else {
            const letra = document.createElement('span');
            letra.className = 'r-letter';
            letra.innerHTML = ' ';
            letrasSpan.appendChild(letra);
        }
    });
    const baseSpan = div.appendChild(document.createElement('span'));
    baseSpan.className = 'base-letras';
    palavraSecreta.split('').forEach(() => {
        const image = document.createElement('img');
        image.src = './assets/rectangle.svg';
        baseSpan.appendChild(image);
    });

}

function desenharForca() {
    partesCorpo.forEach(parte => {
        parte.style.display = 'none';
    });
    for (let i = 0; i < letrasErradas.length; i++) {
        partesCorpo[i].style.display = 'block';
    }
}

function checkGame() {
    const container = document.querySelector('.result');
    container.innerHTML = ''; // limpa o conteúdo da div
    if (letrasErradas.length === partesCorpo.length) {
        const txt = document.createElement('p');
        txt.innerHTML = 'Você perdeu!';
        txt.className = 'looser';
        container.appendChild(txt);
        return true;
    } else if (nLetrasCertas === palavraSecreta.length) {
        const txt1 = document.createElement('p');
        txt1.innerHTML = 'Você venceu';
        const txt2 = document.createElement('p');
        txt2.innerHTML = 'Parabéns!';
        txt1.className = 'winner';
        txt2.className = 'winner';
        container.appendChild(txt1);
        container.appendChild(txt2);
        return true;
    }
    return false;
}

function refresh() {
    showWrongLetters();
    showRightLetters();
    desenharForca();
    let isGameOver = checkGame();
    if (isGameOver) {
        document.removeEventListener("keydown", testarLetra);
    }
}

function isLetter(code) {
    return code >= 65 && code <= 90;
}

function play() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    refresh();
    trocarTela('game');
    document.addEventListener("keydown", testarLetra);
}

function addNewWord() {
    trocarTela('add-new-word');
}

function saveAndStart() {
    let newWord = document.getElementById('new-word');
    palavras.push(newWord.value.toUpperCase());
    newWord.value = '';
    play();
}

function cancel() {
    let newWord = document.getElementById('new-word');
    newWord.value = '';
    trocarTela('menu');
}

function restart() {
    giveUp();
    play();
    // window.location.reload();
}

function giveUp() {
    document.removeEventListener("keydown", testarLetra);
    trocarTela('menu');
    letrasErradas.length = 0;
    letrasCertas.length = 0;
}

function trocarTela(tela) {
    menu.style.display = 'none';
    addNewWordDiv.style.display = 'none';
    game.style.display = 'none';
    switch (tela) {
        case 'menu':
            menu.style.display = 'flex';
            break;
        case 'add-new-word':
            addNewWordDiv.style.display = 'flex';
            break;
        case 'game':
            game.style.display = 'flex';
            break;
        default:
            menu.style.display = 'flex';
            break;
    }
}

function testarLetra(event) {
    const code = event.keyCode;
    if (isLetter(code)) {
        const letter = String.fromCharCode(code).toUpperCase();
        if (letrasErradas.includes(letter) || letrasCertas.includes(letter)) {
            return;
        } else {
            if (palavraSecreta.includes(letter)) {
                letrasCertas.push(letter);
            } else {
                letrasErradas.push(letter);
            }
        }

        refresh();
    }
}

trocarTela('menu');