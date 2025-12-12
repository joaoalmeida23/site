document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. NAVEGAÇÃO SUAVE (SMOOTH SCROLLING)
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Ignora o smooth scrolling se for um link do dropdown sem hash (como Política de Privacidade)
            if (targetId === '#') return; 
            
            // Corrige o bug de rolagem ao usar IDs com #
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================
    // 2. LÓGICA DO LIGHTBOX/MODAL
    // =========================================================

    const modal = document.getElementById('modal-lightbox');
    const modalImg = document.getElementById('modal-imagem-src');
    const fecharBtn = document.querySelector('.modal-fechar');
    
    // Seleciona TODAS as imagens de TODAS as galerias
    const fotos = document.querySelectorAll('.grade-fotos img'); 
    
    const anteriorBtn = document.querySelector('.modal-anterior');
    const proximoBtn = document.querySelector('.modal-proximo');
    let indiceAtual = 0;

    // 1. ABRIR MODAL
    fotos.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src; // Usa o src da imagem clicada
            indiceAtual = index;
            atualizarNavegacao();
        });
    });

    // 2. FECHAR MODAL (Clicando no 'X')
    fecharBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // 3. FECHAR MODAL (Clicando Fora ou Tecla ESC)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
            } else if (event.key === 'ArrowLeft') {
                mudarFoto(-1);
            } else if (event.key === 'ArrowRight') {
                mudarFoto(1);
            }
        }
    });

    // 4. NAVEGAÇÃO ENTRE FOTOS
    anteriorBtn.onclick = function() {
        mudarFoto(-1);
    };

    proximoBtn.onclick = function() {
        mudarFoto(1);
    };

    function mudarFoto(direcao) {
        // Calcula o novo índice
        indiceAtual += direcao;
        
        // Garante que o índice fique dentro dos limites (circular)
        if (indiceAtual < 0) {
            indiceAtual = fotos.length - 1;
        } else if (indiceAtual >= fotos.length) {
            indiceAtual = 0;
        }

        // Atualiza a imagem no modal
        modalImg.src = fotos[indiceAtual].src;
        atualizarNavegacao();
    }
    
    // Garante que as setas só apareçam se houver mais de uma foto
    function atualizarNavegacao() {
        if (fotos.length <= 1) {
            anteriorBtn.style.display = 'none';
            proximoBtn.style.display = 'none';
        } else {
            anteriorBtn.style.display = 'block';
            proximoBtn.style.display = 'block';
        }
    }
    
    // Inicializa a navegação
    atualizarNavegacao();

    function abrirModal() {
    document.getElementById('modalContato').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalContato').style.display = 'none';
}

// Fechar se o usuário clicar fora do modal
window.onclick = function(event) {
    if (event.target == document.getElementById('modalContato')) {
        fecharModal();
    }
}
    
}); // Fim do DOMContentLoaded