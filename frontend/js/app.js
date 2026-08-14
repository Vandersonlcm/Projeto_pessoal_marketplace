/**
 * =========================================================
 * APLICAÇÃO PRINCIPAL DO MARKETPLACE
 * =========================================================
 *
 * Este arquivo é responsável por controlar a interação
 * principal da interface do Marketplace.
 *
 * Responsabilidades:
 *
 * - Inicializar a aplicação.
 * - Renderizar os produtos.
 * - Realizar pesquisas.
 * - Filtrar por categoria.
 * - Ordenar produtos.
 * - Adicionar produtos ao carrinho.
 * - Atualizar o contador do carrinho.
 * - Controlar o menu mobile.
 *
 * IMPORTANTE:
 *
 * Neste momento os produtos ainda são carregados
 * pelo arquivo produtos.js.
 *
 * Em uma etapa futura, os produtos serão carregados
 * através da API Python.
 * =========================================================
 */


/**
 * =========================================================
 * IMPORTAÇÕES
 * =========================================================
 *
 * Importamos as funções responsáveis pelo gerenciamento
 * dos produtos.
 */

import {
    obterProdutos,
    renderizarProdutos,
    pesquisarProdutos,
    ordenarProdutos,
    buscarProdutoPorId
} from "./produtos.js";

import {
    obterCarrinho,
    adicionarProduto
} from "./carrinho.js";


/**
 * =========================================================
 * ESTADO DA APLICAÇÃO
 * =========================================================
 *
 * Estas variáveis armazenam o estado atual da interface.
 */


/**
 * Lista completa de produtos.
 */
const todosProdutos = obterProdutos();


/**
 * Lista atualmente exibida na tela.
 *
 * Inicialmente exibimos todos os produtos.
 */
let produtosAtuais = [...todosProdutos];


/**
 * Categoria atualmente selecionada.
 *
 * "todos" significa que nenhuma categoria específica
 * está sendo aplicada.
 */
let categoriaAtual = "todos";


/**
 * Texto atualmente utilizado na pesquisa.
 */
let termoPesquisa = "";


/**
 * Critério atual de ordenação.
 */
let criterioOrdenacao = "default";


/**
 * =========================================================
 * ELEMENTOS DO DOM
 * =========================================================
 *
 * Localizamos os principais elementos da página.
 */


/**
 * Grid onde os produtos serão exibidos.
 */
const productGrid =
    document.getElementById("productGrid");


/**
 * Campo de pesquisa.
 *
 * Caso o projeto utilize outro ID no HTML,
 * podemos ajustá-lo posteriormente.
 */
const searchInput =
    document.getElementById("searchInput");


/**
 * Botão de pesquisa.
 */
const searchButton =
    document.getElementById("searchBtn");


/**
 * Campo/select de ordenação.
 */
const sortSelect =
    document.getElementById("sortProducts");


/**
 * Elemento que mostra a quantidade de itens
 * no carrinho.
 */
const cartCount =
    document.getElementById("cartCount");


/**
 * Botão do menu mobile.
 */
const menuToggle =
    document.getElementById("menuToggle");


/**
 * Menu de navegação.
 */
const mainMenu =
    document.getElementById("navMenu");


/**
 * =========================================================
 * ATUALIZAR PRODUTOS
 * =========================================================
 *
 * Esta função aplica todos os filtros selecionados
 * pelo usuário.
 *
 * Ordem utilizada:
 *
 * 1. Pesquisa
 * 2. Categoria
 * 3. Ordenação
 * 4. Renderização
 */
function atualizarProdutos() {

    /*
     * Começamos utilizando todos os produtos.
     */
    let resultado =
        [...todosProdutos];


    /*
     * -----------------------------------------------------
     * FILTRO DE PESQUISA
     * -----------------------------------------------------
     */

    if (termoPesquisa.trim() !== "") {

        resultado =
            pesquisarProdutos(
                termoPesquisa
            );

    }


    /*
     * -----------------------------------------------------
     * FILTRO POR CATEGORIA
     * -----------------------------------------------------
     */

    if (categoriaAtual !== "todos") {

        resultado =
            resultado.filter(
                produto =>
                    produto.categoria.toLowerCase() ===
                    categoriaAtual.toLowerCase()
            );

    }


    /*
     * -----------------------------------------------------
     * ORDENAÇÃO
     * -----------------------------------------------------
     */

    resultado =
        ordenarProdutos(
            resultado,
            criterioOrdenacao
        );


    /*
     * Atualiza o estado da aplicação.
     */
    produtosAtuais =
        resultado;


    /*
     * Envia os produtos para o módulo responsável
     * pela criação dos cards.
     */
    renderizarProdutos(
        produtosAtuais
    );

}


/**
 * =========================================================
 * PESQUISA DE PRODUTOS
 * =========================================================
 *
 * Esta função é chamada quando o usuário pesquisa
 * um produto.
 */
function realizarPesquisa() {

    /*
     * Verifica se o campo de pesquisa existe.
     */
    if (!searchInput) {

        return;

    }


    /*
     * Obtém o texto digitado.
     */
    termoPesquisa =
        searchInput.value;


    /*
     * Atualiza a lista de produtos.
     */
    atualizarProdutos();

}


/**
 * =========================================================
 * CONFIGURAR PESQUISA
 * =========================================================
 */
function configurarPesquisa() {

    /*
     * Se o campo não existir, não fazemos nada.
     */
    if (!searchInput) {

        return;

    }


    /*
     * Pesquisa enquanto o usuário digita.
     *
     * Isso proporciona uma experiência mais moderna.
     */
    searchInput.addEventListener(
        "input",
        () => {

            realizarPesquisa();

        }
    );


    /*
     * Caso exista um botão de pesquisa,
     * também configuramos o clique.
     */
    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                realizarPesquisa();

            }
        );

    }

}


/**
 * =========================================================
 * CONFIGURAR ORDENAÇÃO
 * =========================================================
 */
function configurarOrdenacao() {

    /*
     * Verifica se existe o campo de ordenação.
     */
    if (!sortSelect) {

        return;

    }


    /*
     * Detecta a alteração do usuário.
     */
    sortSelect.addEventListener(
        "change",
        event => {

            /*
             * Obtém o critério selecionado.
             */
            criterioOrdenacao =
                event.target.value;


            /*
             * Atualiza os produtos.
             */
            atualizarProdutos();

        }
    );

}


/**
 * =========================================================
 * CONFIGURAR CATEGORIAS
 * =========================================================
 *
 * As categorias são representadas pelos elementos
 * que possuem a classe:
 *
 * .category-card
 */
function configurarCategorias() {

    /*
     * Localiza todos os cards de categoria.
     */
    const categoryButtons =
        document.querySelectorAll(
            ".category-card"
        );


    /*
     * Percorre todos os cards.
     */
    categoryButtons.forEach(
        button => {

            /*
             * Adiciona o evento de clique.
             */
            button.addEventListener(
                "click",
                () => {

                    /*
                     * Obtém a categoria através
                     * do atributo data-category.
                     */
                    const categoria =
                        button.dataset.category;


                    /*
                     * Se não existir uma categoria,
                     * não fazemos nada.
                     */
                    if (!categoria) {

                        return;

                    }


                    /*
                     * Atualiza a categoria atual.
                     */
                    categoriaAtual =
                        categoria;


                    /*
                     * Remove o estado ativo
                     * de todas as categorias.
                     */
                    categoryButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Marca a categoria selecionada.
                     */
                    button.classList.add(
                        "active"
                    );


                    /*
                     * Atualiza os produtos.
                     */
                    atualizarProdutos();

                }
            );

        }
    );

}


/**
 * =========================================================
 * CARRINHO DE COMPRAS
 * =========================================================
 *
 * Nesta etapa utilizamos localStorage.
 *
 * Isso permite manter o carrinho mesmo depois que
 * o usuário atualiza a página.
 *
 * Posteriormente o carrinho poderá ser integrado
 * ao back-end Python.
 */


/**
 * Salva o carrinho no navegador.
 *
 * @param {Array} carrinho
 */

/**
 * =========================================================
 * ATUALIZAR CONTADOR DO CARRINHO
 * =========================================================
 */
function atualizarContadorCarrinho() {

    /*
     * Obtém os produtos do carrinho.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Soma a quantidade de todos os produtos.
     */
    const quantidade =
        carrinho.reduce(
            (
                total,
                item
            ) => {

                return total + item.quantidade;

            },
            0
        );


    /*
     * Se o contador existir, atualizamos seu conteúdo.
     */
    if (cartCount) {

        cartCount.textContent =
            quantidade;

    }

}


/**
 * =========================================================
 * ADICIONAR PRODUTO AO CARRINHO
 * =========================================================
 *
 * Localiza o produto e envia para o módulo
 * responsável pelo carrinho.
 *
 * @param {number|string} produtoId
 */
function adicionarAoCarrinho(
    produtoId
) {

    /*
     * Procura o produto pelo ID.
     */
    const produto =
        buscarProdutoPorId(
            produtoId
        );


    /*
     * Verifica se o produto existe.
     */
    if (!produto) {

        console.error(
            "Produto não encontrado:",
            produtoId
        );

        return;

    }


    /*
     * Envia o produto para o módulo
     * responsável pelo carrinho.
     */
    const sucesso =
        adicionarProduto(
            produto
        );


    /*
     * Se a operação foi concluída,
     * atualizamos a interface.
     */
    if (sucesso) {

        atualizarContadorCarrinho();


        mostrarNotificacao(
            `${produto.nome} foi adicionado ao carrinho.`
        );

    }

}


/**
 * =========================================================
 * EVENTOS DOS CARDS DE PRODUTO
 * =========================================================
 *
 * Utilizamos delegação de eventos.
 *
 * Isso é importante porque os cards são criados
 * dinamicamente pelo produtos.js.
 */
function configurarCarrinho() {

    /*
     * Verifica se o grid existe.
     */
    if (!productGrid) {

        return;

    }


    /*
     * Escuta os cliques dentro do grid.
     */
    productGrid.addEventListener(
        "click",
        event => {

            /*
             * Procura o botão clicado.
             */
            const button =
                event.target.closest(
                    ".product-button"
                );


            /*
             * Se o clique não foi em um botão,
             * ignoramos.
             */
            if (!button) {

                return;

            }


            /*
             * Obtém o ID do produto.
             */
            const produtoId =
                button.dataset.productId;


            /*
             * Adiciona o produto ao carrinho.
             */
            adicionarAoCarrinho(
                produtoId
            );

        }
    );

}


/**
 * =========================================================
 * NOTIFICAÇÃO
 * =========================================================
 *
 * Mostra uma pequena mensagem para o usuário.
 *
 * @param {string} mensagem
 */
function mostrarNotificacao(
    mensagem
) {

    /*
     * Verifica se já existe uma notificação.
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
     * Cria o elemento.
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
     * Remove automaticamente depois de 3 segundos.
     */
    setTimeout(
        () => {

            notificacao.classList.add(
                "hide"
            );


            /*
             * Aguarda a animação antes de remover.
             */
            setTimeout(
                () => {

                    notificacao.remove();

                },
                300
            );

        },
        3000
    );

}


/**
 * =========================================================
 * MENU MOBILE
 * =========================================================
 */
function configurarMenuMobile() {

    /*
     * Verifica se os elementos existem.
     */
    if (
        !menuToggle ||
        !mainMenu
    ) {

        return;

    }


    /*
     * Adiciona o evento de clique.
     */
    menuToggle.addEventListener(
        "click",
        () => {

            /*
             * Alterna a classe "active".
             */
            mainMenu.classList.toggle(
                "active"
            );


            /*
             * Atualiza o atributo de acessibilidade.
             */
            const aberto =
                mainMenu.classList.contains(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto
            );

        }
    );

}


/**
 * =========================================================
 * FECHAR MENU MOBILE
 * =========================================================
 *
 * Fecha o menu quando o usuário seleciona um link.
 */
function configurarFechamentoMenu() {

    /*
     * Localiza os links do menu.
     */
    const menuLinks =
        document.querySelectorAll(
            ".main-menu a"
        );


    /*
     * Adiciona evento para cada link.
     */
    menuLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (mainMenu) {

                        mainMenu.classList.remove(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


/**
 * =========================================================
 * INICIALIZAÇÃO DA APLICAÇÃO
 * =========================================================
 *
 * Esta função executa todas as configurações
 * necessárias quando a página é carregada.
 */
function inicializarAplicacao() {

    console.log(
        "Marketplace iniciado com sucesso."
    );


    /*
     * Renderiza os produtos inicialmente.
     */
    atualizarProdutos();


    /*
     * Configura a pesquisa.
     */
    configurarPesquisa();


    /*
     * Configura a ordenação.
     */
    configurarOrdenacao();


    /*
     * Configura as categorias.
     */
    configurarCategorias();


    /*
     * Configura o carrinho.
     */
    configurarCarrinho();


    /*
     * Atualiza o contador do carrinho.
     */
    atualizarContadorCarrinho();


    /*
     * Configura o menu mobile.
     */
    configurarMenuMobile();


    /*
     * Configura o fechamento do menu.
     */
    configurarFechamentoMenu();

}


/**
 * =========================================================
 * EXECUTAR APLICAÇÃO
 * =========================================================
 *
 * Esperamos o HTML ser completamente carregado
 * antes de iniciar o JavaScript.
 */
if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarAplicacao
    );

}

else {

    inicializarAplicacao();

}