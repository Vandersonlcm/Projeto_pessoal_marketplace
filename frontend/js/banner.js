/**
 * =========================================================
 * MÓDULO DO BANNER / CARROSSEL PROMOCIONAL
 * =========================================================
 */


/**
 * =========================================================
 * CONFIGURAÇÕES
 * =========================================================
 */

/*
 * Tempo entre cada troca automática.
 *
 * 5000 = 5 segundos.
 */
const INTERVALO_SLIDE = 5000;


/*
 * Quantidade total de slides.
 */
const TOTAL_SLIDES = 4;


/**
 * =========================================================
 * ESTADO DO CARROSSEL
 * =========================================================
 */

let slideAtual = 0;


let temporizador = null;


/*
 * Indica se o mouse está sobre o carrossel.
 */
let mouseSobreCarrossel = false;


/*
 * Indica se a aba do navegador está ativa.
 */
let paginaAtiva = true;


/**
 * =========================================================
 * OBTER ELEMENTOS
 * =========================================================
 *
 * Localiza os elementos HTML utilizados
 * pelo carrossel.
 */
function obterElementosBanner() {

    /*
     * Container principal.
     */
    const banner =
        document.getElementById(
            "heroCarousel"
        );


    /*
     * Lista de slides.
     */
    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    const botaoAnterior =
        document.getElementById(
            "heroPrevious"
        );


    const botaoProximo =
        document.getElementById(
            "heroNext"
        );


    const indicadores =
        document.querySelectorAll(
            ".hero-indicator"
        );


    /*
     * Retorna todos os elementos.
     */
    return {

        banner,

        slides,

        botaoAnterior,

        botaoProximo,

        indicadores

    };

}


/**
 * =========================================================
 * EXIBIR SLIDE
 * =========================================================
 *
 * Mostra somente o slide solicitado.
 *
 * @param {number} indice
 */
function mostrarSlide(
    indice
) {

    const elementos =
        obterElementosBanner();


    /*
     * Se o carrossel não existir,
     * interrompemos a execução.
     */
    if (
        !elementos.banner ||
        !elementos.slides.length
    ) {

        return;

    }


  
    if (
        indice < 0
    ) {

        indice =
            TOTAL_SLIDES - 1;

    }


    if (
        indice >= TOTAL_SLIDES
    ) {

        indice = 0;

    }


    /*
     * Atualiza o estado atual.
     */
    slideAtual = indice;


    /*
     * Percorre todos os slides.
     */
    elementos.slides.forEach(
        (
            slide,
            index
        ) => {

            /*
             * Verifica se este é
             * o slide atualmente ativo.
             */
            const ativo =
                index === slideAtual;


            /*
             * Adiciona ou remove
             * a classe "active".
             */
            slide.classList.toggle(
                "active",
                ativo
            );


            /*
             * Atualiza acessibilidade.
             */
            slide.setAttribute(
                "aria-hidden",
                String(!ativo)
            );

        }
    );


    /*
     * Atualiza os indicadores.
     */
    elementos.indicadores.forEach(
        (
            indicador,
            index
        ) => {

            const ativo =
                index === slideAtual;


            /*
             * Classe visual.
             */
            indicador.classList.toggle(
                "active",
                ativo
            );


        
            indicador.setAttribute(
                "aria-current",
                ativo
                    ? "true"
                    : "false"
            );

        }
    );

}


/**
 * =========================================================
 * PRÓXIMO SLIDE
 * =========================================================
 */
function proximoSlide() {

    mostrarSlide(
        slideAtual + 1
    );

}


/**
 * =========================================================
 * SLIDE ANTERIOR
 * =========================================================
 */
function slideAnterior() {

    mostrarSlide(
        slideAtual - 1
    );

}


/**
 * =========================================================
 * INICIAR TEMPORIZADOR
 * =========================================================
 */
function iniciarTemporizador() {

   
    pararTemporizador();


    /*
     * Cria um novo temporizador.
     */
    temporizador =
        setInterval(
            () => {

                /*
                 * Só troca o slide quando:
                 *
                 * 1. A página está ativa.
                 * 2. O mouse não está sobre o banner.
                 */
                if (
                    paginaAtiva &&
                    !mouseSobreCarrossel
                ) {

                    proximoSlide();

                }

            },
            INTERVALO_SLIDE
        );

}


/**
 * =========================================================
 * PARAR TEMPORIZADOR
 * =========================================================
 */
function pararTemporizador() {

    /*
     * Verifica se existe temporizador.
     */
    if (
        temporizador
    ) {

        clearInterval(
            temporizador
        );


        temporizador =
            null;

    }

}


/**
 * =========================================================
 * CONFIGURAR BOTÕES
 * =========================================================
 */
function configurarBotoes(
    elementos
) {


    if (
        elementos.botaoAnterior
    ) {

        elementos.botaoAnterior.addEventListener(
            "click",
            () => {

                slideAnterior();

                /*
                 * Reinicia o contador depois
                 * de uma navegação manual.
                 */
                iniciarTemporizador();

            }
        );

    }


  
    if (
        elementos.botaoProximo
    ) {

        elementos.botaoProximo.addEventListener(
            "click",
            () => {

                proximoSlide();

                /*
                 * Reinicia o contador.
                 */
                iniciarTemporizador();

            }
        );

    }

}


/**
 * =========================================================
 * CONFIGURAR INDICADORES
 * =========================================================
 */
function configurarIndicadores(
    elementos
) {

    elementos.indicadores.forEach(
        (
            indicador,
            index
        ) => {

            indicador.addEventListener(
                "click",
                () => {

                 
                    mostrarSlide(
                        index
                    );


                 
                    iniciarTemporizador();

                }
            );

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR PAUSA DO MOUSE
 * =========================================================
 */
function configurarPausaMouse(
    elementos
) {

 
    if (
        !elementos.banner
    ) {

        return;

    }


    /*
     * Quando o mouse entra no banner,
     * marcamos como pausado.
     */
    elementos.banner.addEventListener(
        "mouseenter",
        () => {

            mouseSobreCarrossel =
                true;

        }
    );


    /*
     * Quando o mouse sai,
     * permitimos novamente a troca automática.
     */
    elementos.banner.addEventListener(
        "mouseleave",
        () => {

            mouseSobreCarrossel =
                false;

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR VISIBILIDADE DA PÁGINA
 * =========================================================
 *
 * Quando o usuário muda de aba,
 * o carrossel deixa de trocar slides.
 */
function configurarVisibilidadePagina() {

    document.addEventListener(
        "visibilitychange",
        () => {

            paginaAtiva =
                !document.hidden;

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR TECLADO
 * =========================================================
 *
 * Permite:
 *
 * ← = slide anterior
 * → = próximo slide
 */
function configurarTeclado() {

    document.addEventListener(
        "keydown",
        event => {

            
            const elementoAtivo =
                document.activeElement;


            if (
                elementoAtivo &&
                (
                    elementoAtivo.tagName ===
                    "INPUT" ||

                    elementoAtivo.tagName ===
                    "TEXTAREA" ||

                    elementoAtivo.tagName ===
                    "SELECT"
                )
            ) {

                return;

            }


        
            if (
                event.key ===
                "ArrowLeft"
            ) {

                slideAnterior();

                iniciarTemporizador();

            }


        
            if (
                event.key ===
                "ArrowRight"
            ) {

                proximoSlide();

                iniciarTemporizador();

            }

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR ACESSIBILIDADE
 * =========================================================
 */
function configurarAcessibilidade(
    elementos
) {

    if (
        elementos.banner
    ) {

        elementos.banner.setAttribute(
            "aria-roledescription",
            "carrossel"
        );

    }


    elementos.slides.forEach(
        (
            slide,
            index
        ) => {

            slide.setAttribute(
                "aria-hidden",
                String(
                    index !== 0
                )
            );

        }
    );

}


/**
 * =========================================================
 * INICIALIZAR CARROSSEL
 * =========================================================
 */
export function inicializarBanner() {

    console.log(
        "Banner promocional carregado."
    );


    /*
     * Obtém os elementos.
     */
    const elementos =
        obterElementosBanner();


    
    if (
        !elementos.banner ||
        !elementos.slides.length
    ) {

        console.warn(
            "Carrossel não encontrado."
        );

        return;

    }


    /*
     * Configura acessibilidade.
     */
    configurarAcessibilidade(
        elementos
    );


    /*
     * Exibe o primeiro slide.
     */
    mostrarSlide(
        0
    );


    /*
     * Configura os botões.
     */
    configurarBotoes(
        elementos
    );


    /*
     * Configura os indicadores.
     */
    configurarIndicadores(
        elementos
    );


    /*
     * Configura pausa com mouse.
     */
    configurarPausaMouse(
        elementos
    );


    /*
     * Configura pausa quando
     * a aba perde o foco.
     */
    configurarVisibilidadePagina();


    /*
     * Configura navegação por teclado.
     */
    configurarTeclado();


    /*
     * Inicia a troca automática.
     */
    iniciarTemporizador();

}