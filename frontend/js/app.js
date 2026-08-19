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
  buscarProdutoPorId,
} from "./produtos.js";

import { obterCarrinho, adicionarProduto } from "./carrinho.js";

import { mostrarNotificacao, inicializarUI } from "./ui.js";

import { inicializarBanner } from "./banner.js";

/**
 * =========================================================
 * ESTADO DA APLICAÇÃO
 * =========================================================
 *
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
 */

/**
 * Grid onde os produtos serão exibidos.
 */
const productGrid = document.getElementById("productGrid");

/**
 * Campo de pesquisa.
 */
const searchInput = document.getElementById("searchInput");

/**
 * Botão de pesquisa.
 */
const searchButton = document.getElementById("searchBtn");

/**
 * Campo/select de ordenação.
 */
const sortSelect = document.getElementById("sortProducts");

/*
 * Elemento responsável por mostrar
 * a quantidade de produtos encontrados.
 */
const productsCount = document.getElementById("productsCount");

/*
 * Botão para limpar os filtros.
 */
const clearFilters = document.getElementById("clearFilters");

/*
 * Botão exibido quando nenhum produto
 * é encontrado.
 */
const clearEmptyFilters = document.getElementById("clearEmptyFilters");

/**
 * Elemento que mostra a quantidade de itens
 * no carrinho.
 */
const cartCount = document.getElementById("cartCount");

/**
 * Botão do menu mobile.
 */
const menuToggle = document.getElementById("menuToggle");

/**
 * Menu de navegação.
 */
const mainMenu = document.getElementById("navMenu");

/**
 * =========================================================
 * ATUALIZAR PRODUTOS
 * =========================================================
 *
 */
function atualizarProdutos() {
  /*
   * Começamos utilizando todos os produtos.
   */
  let resultado = [...todosProdutos];

  /*
   * -----------------------------------------------------
   * FILTRO DE PESQUISA
   * -----------------------------------------------------
   */

  if (termoPesquisa.trim() !== "") {
    resultado = pesquisarProdutos(termoPesquisa);
  }

  /*
   * -----------------------------------------------------
   * FILTRO POR CATEGORIA
   * -----------------------------------------------------
   */

  if (categoriaAtual !== "todos") {
    resultado = resultado.filter(
      (produto) =>
        produto.categoria.toLowerCase() === categoriaAtual.toLowerCase(),
    );
  }

  /*
   * -----------------------------------------------------
   * ORDENAÇÃO
   * -----------------------------------------------------
   */

  resultado = ordenarProdutos(resultado, criterioOrdenacao);

  /*
   * Atualiza o estado da aplicação.
   */
  produtosAtuais = resultado;

  /*
   * Atualiza a quantidade de produtos
   * encontrados na tela.
   */
  atualizarQuantidadeProdutos(produtosAtuais.length);

  /*
   * Envia os produtos para o módulo responsável
   * pela criação dos cards.
   */
  renderizarProdutos(produtosAtuais);
};

/**
 * =========================================================
 * ATUALIZAR QUANTIDADE DE PRODUTOS
 * =========================================================
 *
 * Mostra ao usuário quantos produtos
 * estão sendo exibidos.
 *
 * @param {number} quantidade
 */
function atualizarQuantidadeProdutos(
    quantidade
) {

    /*
     * Verifica se o elemento existe.
     */
    if (!productsCount) {

        return;

    }


    /*
     * Define o texto no singular.
     */
    if (quantidade === 1) {

        productsCount.textContent =
            "1 produto encontrado";

        return;

    }


    /*
     * Define o texto no plural.
     */
    productsCount.textContent =
        `${quantidade} produtos encontrados`;

}

/**
 * =========================================================
 * LIMPAR FILTROS
 * =========================================================
 *
 * Retorna a página para o estado inicial.
 *
 * São restaurados:
 *
 * - pesquisa;
 * - categoria;
 * - ordenação.
 */
function limparFiltros() {

    /*
     * Limpa o campo de pesquisa.
     */
    if (searchInput) {

        searchInput.value = "";

    }


    /*
     * Remove a categoria selecionada.
     */
    categoriaAtual =
        "todos";


    /*
     * Volta para a ordenação padrão.
     */
    criterioOrdenacao =
        "default";


    /*
     * Atualiza o select visualmente.
     */
    if (sortSelect) {

        sortSelect.value =
            "default";

    }


    /*
     * Remove a classe "active"
     * de todas as categorias.
     */
    const categoryButtons =
        document.querySelectorAll(
            ".category-card"
        );

    categoryButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    /*
     * Atualiza os produtos.
     */
    atualizarProdutos();

}

/**
 * =========================================================
 * CONFIGURAR LIMPEZA DOS FILTROS
 * =========================================================
 */
function configurarLimpezaFiltros() {

    /*
     * Botão principal.
     */
    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            limparFiltros
        );

    }


    /*
     * Botão apresentado quando
     * nenhum resultado é encontrado.
     */
    if (clearEmptyFilters) {

        clearEmptyFilters.addEventListener(
            "click",
            limparFiltros
        );

    }

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
  termoPesquisa = searchInput.value;

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
  searchInput.addEventListener("input", () => {
    realizarPesquisa();
  });

  /*
   * Caso exista um botão de pesquisa,
   * também configuramos o clique.
   */
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      realizarPesquisa();
    });
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
  sortSelect.addEventListener("change", (event) => {
    /*
     * Obtém o critério selecionado.
     */
    criterioOrdenacao = event.target.value;

    /*
     * Atualiza os produtos.
     */
    atualizarProdutos();
  });
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
  const categoryButtons = document.querySelectorAll(".category-card");

  /*
   * Percorre todos os cards.
   */
  categoryButtons.forEach((button) => {
    /*
     * Adiciona o evento de clique.
     */
    button.addEventListener("click", () => {
      /*
       * Obtém a categoria através
       * do atributo data-category.
       */
      const categoria = button.dataset.category;

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
      categoriaAtual = categoria;

      /*
       * Remove o estado ativo
       * de todas as categorias.
       */
      categoryButtons.forEach((item) => {
        item.classList.remove("active");
      });

      /*
       * Marca a categoria selecionada.
       */
      button.classList.add("active");

      /*
       * Atualiza os produtos.
       */
      atualizarProdutos();
    });
  });
}

/**
 * =========================================================
 * CARRINHO DE COMPRAS
 * =========================================================
 *
 * Isso permite manter o carrinho mesmo depois que
 * o usuário atualiza a página.
 *
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
  const carrinho = obterCarrinho();

  /*
   * Soma a quantidade de todos os produtos.
   */
  const quantidade = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);

  /*
   * Se o contador existir, atualizamos seu conteúdo.
   */
  if (cartCount) {
    cartCount.textContent = quantidade;
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
function adicionarAoCarrinho(produtoId) {
  /*
   * Procura o produto pelo ID.
   */
  const produto = buscarProdutoPorId(produtoId);

  /*
   * Verifica se o produto existe.
   */
  if (!produto) {
    console.error("Produto não encontrado:", produtoId);

    return;
  }

  /*
   * Envia o produto para o módulo
   * responsável pelo carrinho.
   */
  const sucesso = adicionarProduto(produto);

  /*
   * Se a operação foi concluída,
   * atualizamos a interface.
   */
  if (sucesso) {
    atualizarContadorCarrinho();

    mostrarNotificacao(`${produto.nome} foi adicionado ao carrinho.`);
  }
}

/**
 * =========================================================
 * EVENTOS DOS CARDS DE PRODUTO
 * =========================================================
 *
 * Utilizamos delegação de eventos.
 *
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
  productGrid.addEventListener("click", (event) => {
    /*
     * Procura o botão clicado.
     */
    const button = event.target.closest(".product-button");

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
    const produtoId = button.dataset.productId;

    /*
     * Adiciona o produto ao carrinho.
     */
    adicionarAoCarrinho(produtoId);
  });
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

/**
 * =========================================================
 * INICIALIZAÇÃO DA APLICAÇÃO
 * =========================================================
 *
 * Esta função executa todas as configurações
 * necessárias quando a página é carregada.
 */
function inicializarAplicacao() {
  console.log("Marketplace iniciado com sucesso.");

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
   * Limpa o carrinho.
   */
  configurarLimpezaFiltros();

  /*
   * Atualiza o contador do carrinho.
   */
  atualizarContadorCarrinho();

  /*
   * Inicializa os recursos
   * visuais da interface.
   */
  inicializarUI();

  /*
   * Inicializa o carrossel
   * promocional.
   */
  inicializarBanner();
}

/**
 * =========================================================
 * EXECUTAR APLICAÇÃO
 * =========================================================
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarAplicacao);
} else {
  inicializarAplicacao();
}
