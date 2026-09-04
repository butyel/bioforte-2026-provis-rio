// Função para aumentar o número a cada 24 horas
function aumentarNumero(contadorElemento) {
    let numeroAtual = parseInt(contadorElemento.textContent);
    numeroAtual++;
    contadorElemento.textContent = numeroAtual;
    
    // Aguarda novamente por 24 horas
    setTimeout(function() {
        aumentarNumero(contadorElemento);
    }, 24 * 60 * 60 * 1000); // 24 horas em milissegundos
}

// Seleciona todos os elementos .s-info que contêm contadores
const contadores = document.querySelectorAll('.s-info .numero');

// Para cada contador, inicia o processo de incremento automático
contadores.forEach(function(contador) {
    aumentarNumero(contador);
});