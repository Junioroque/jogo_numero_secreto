let listaDeNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = 5 //gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.4});
}

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'JOGO DE ADIVINHA');
    exibirTextoTela('p', 'Escolha um numero entre 1 e 10')
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto) {
        exibirTextoTela('h1', 'MEUS PARABENS!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa} !`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
         if(chute > numeroSecreto) {
            exibirTextoTela('p', 'O numero secreto e menor')
         }else {
            exibirTextoTela('p', 'O numero secreto e maior')
         }
         tentativas++;
         limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementossNaLista = listaDeNumeroSorteado.length;
    
    if(quantidadeDeElementossNaLista == numeroLimite) {
        listaDeNumeroSorteado = [];
    }
    if(listaDeNumeroSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else {
        listaDeNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo();
   tentativas = 1;
   exibirMensagemInicial();
   document.getElementById('reiniciar').setAttribute('disabled', true);
}