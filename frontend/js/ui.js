/**
 * =========================================================
 * MÓDULO DE INTERFACE - UI
 * =========================================================
 *
 * Responsabilidade deste arquivo:
 *
 * - Controlar elementos visuais.
 * - Exibir notificações.
 * - Controlar menu mobile.
 * - Controlar estados visuais.
 * - Auxiliar na experiência do usuário.
 *
 * =========================================================
 */


/**
 * =========================================================
 * MOSTRAR NOTIFICAÇÃO
 * =========================================================
 *
 * Exibe uma mensagem temporária para o usuário.
 *
 * @param {string} mensagem
 */
export function mostrarNotificacao(
    mensagem
) {

    /*
     * Validação básica.
     */
    if (!mensagem) {

        return;

    }


    /*
     * Procura uma notificação que já esteja
     * sendo exibida.
     */
    const notificacaoExistente =
        document.querySelector(
            ".marketplace-notification"
        );


    /*
     * Remove a notificação anterior.
     */
    if (notificacaoExistente) {

        notificacaoExistente.remove();

    }


    /*
     * Cria o elemento da notificação.
     */
    const notificacao =
        document.createElement(
            "div"
        );


    /*
     * Define a classe CSS.
     */
    notificacao.className =
        "marketplace-notification";


    /*
     * Define o texto.
     */
    notificacao.textContent =
        mensagem;


    /*
     * Adiciona a notificação ao documento.
     */
    document.body.appendChild(
        notificacao
    );


    /*
     * Pequeno atraso para permitir
     * a animação de entrada.
     */
    requestAnimationFrame(
        () => {

            notificacao.classList.add(
                "show"
            );

        }
    );


    /*
     * Remove a notificação automaticamente
     * após 3 segundos.
     */
    setTimeout(
        () => {

            notificacao.classList.remove(
                "show"
            );


            notificacao.classList.add(
                "hide"
            );


            /*
             * Aguarda a animação terminar
             * antes de remover o elemento.
             */
            setTimeout(
                () => {

                    if (
                        notificacao &&
                        notificacao.parentNode
                    ) {

                        notificacao.remove();

                    }

                },
                300
            );

        },
        3000
    );

}


/**
 * =========================================================
 * CONFIGURAR MENU MOBILE
 * =========================================================
 *
 * Controla a abertura e fechamento
 * do menu em telas menores.
 */
export function configurarMenuMobile() {

    /*
     * Localiza o botão do menu.
     */
    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    /*
     * Localiza o menu.
     */
    const navMenu =
        document.getElementById(
            "navMenu"
        );


    /*
     * Verifica se os elementos existem.
     */
    if (
        !menuToggle ||
        !navMenu
    ) {

        console.warn(
            "Elementos do menu mobile não encontrados."
        );

        return;

    }


    /*
     * Configura o estado inicial
     * de acessibilidade.
     */
    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    /*
     * Evento de clique.
     */
    menuToggle.addEventListener(
        "click",
        () => {

            /*
             * Alterna o estado do menu.
             */
            const menuAberto =
                navMenu.classList.toggle(
                    "active"
                );


            /*
             * Atualiza o atributo
             * aria-expanded.
             */
            menuToggle.setAttribute(
                "aria-expanded",
                menuAberto
            );


            /*
             * Atualiza o atributo
             * aria-label.
             */
            menuToggle.setAttribute(
                "aria-label",
                menuAberto
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        }
    );


    /*
     * Fecha o menu quando o usuário
     * clica em algum link.
     */
    const links =
        navMenu.querySelectorAll(
            "a"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }
            );

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR SCROLL SUAVE
 * =========================================================
 *
 * Faz com que links internos da página
 * tenham rolagem suave.
 */
export function configurarScrollSuave() {

    /*
     * Localiza links que apontam
     * para uma seção da mesma página.
     */
    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    /*
                     * Obtém o destino.
                     */
                    const destino =
                        link.getAttribute(
                            "href"
                        );


                    /*
                     * Ignora links que apontam
                     * apenas para "#".
                     */
                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        return;

                    }


                    /*
                     * Procura o elemento.
                     */
                    const elemento =
                        document.querySelector(
                            destino
                        );


                    /*
                     * Se o elemento existir,
                     * fazemos a rolagem.
                     */
                    if (elemento) {

                        event.preventDefault();


                        elemento.scrollIntoView(
                            {
                                behavior: "smooth",
                                block: "start"
                            }
                        );

                    }

                }
            );

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR BOTÃO VOLTAR AO TOPO
 * =========================================================
 *
 * Caso exista um botão com:
 *
 * id="backToTop"
 *
 * ele será utilizado para voltar ao topo.
 */
export function configurarVoltarAoTopo() {

    const botao =
        document.getElementById(
            "backToTop"
        );


    /*
     * Se o botão não existir,
     * não fazemos nada.
     */
    if (!botao) {

        return;

    }


    /*
     * Inicialmente o botão fica escondido.
     */
    botao.classList.remove(
        "visible"
    );


    /*
     * Monitora o scroll da página.
     */
    window.addEventListener(
        "scroll",
        () => {

            /*
             * Mostra o botão depois
             * de determinado deslocamento.
             */
            if (
                window.scrollY > 400
            ) {

                botao.classList.add(
                    "visible"
                );

            }

            else {

                botao.classList.remove(
                    "visible"
                );

            }

        }
    );


    /*
     * Clique para voltar ao topo.
     */
    botao.addEventListener(
        "click",
        () => {

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }
    );

}


/**
 * =========================================================
 * DESTAQUE DE LINK ATIVO
 * =========================================================
 *
 * Adiciona uma classe visual ao link
 * correspondente à seção atual.
 */
export function configurarNavegacaoAtiva() {

    const links =
        document.querySelectorAll(
            ".main-menu a"
        );


    /*
     * Se não houver links,
     * encerramos.
     */
    if (!links.length) {

        return;

    }


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    /*
                     * Remove a classe dos demais links.
                     */
                    links.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Ativa o link selecionado.
                     */
                    link.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/**
 * =========================================================
 * INICIALIZAR UI
 * =========================================================
 *
 * Função central para inicializar os recursos
 * visuais da aplicação.
 */
export function inicializarUI() {

    console.log(
        "Interface carregada com sucesso."
    );


    /*
     * Configura o menu mobile.
     */
    configurarMenuMobile();


    /*
     * Configura rolagem suave.
     */
    configurarScrollSuave();


    /*
     * Configura botão voltar ao topo.
     */
    configurarVoltarAoTopo();


    /*
     * Configura navegação ativa.
     */
    configurarNavegacaoAtiva();

}