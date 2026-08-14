/**
 * =========================================================
 * MÓDULO DE PRODUTOS
 * =========================================================
 *
 * Responsabilidade deste módulo:
 *
 * - Armazenar os produtos temporariamente.
 * - Exibir os produtos na página.
 * - Pesquisar produtos.
 * - Ordenar produtos.
 * - Localizar produtos pelo ID.
 *
 * IMPORTANTE:
 *
 * Nesta primeira etapa os produtos são simulados.
 *
 * Posteriormente, este módulo será adaptado para buscar
 * os produtos através da API Python.
 * =========================================================
 */


/**
 * Lista temporária de produtos.
 *
 * Atualmente os produtos estão armazenados diretamente
 * no JavaScript.
 *
 * Na etapa do Back-end, esses dados virão do banco
 * de dados através da API Python.
 */
const produtos = [

    {
        id: 1,

        nome: "Notebook Gamer",

        preco: 4500,

        categoria: "Tecnologia",

        descricao:
            "Notebook de alto desempenho para trabalho e jogos.",

        imagem:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,

        nome: "Smartphone Pro",

        preco: 3200,

        categoria: "Celulares",

        descricao:
            "Smartphone moderno com excelente desempenho.",

        imagem:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,

        nome: 'Smart TV 50"',

        preco: 2800,

        categoria: "Eletrônicos",

        descricao:
            "Smart TV com imagem de alta qualidade.",

        imagem:
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,

        nome: "Headphone Bluetooth",

        preco: 350,

        categoria: "Eletrônicos",

        descricao:
            "Headphone sem fio com excelente qualidade sonora.",

        imagem:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    }

];


/**
 * =========================================================
 * FORMATAR PREÇO
 * =========================================================
 *
 * Converte um número para o padrão monetário brasileiro.
 *
 * Exemplo:
 *
 * 4500
 *
 * Resultado:
 *
 * R$ 4.500,00
 *
 * @param {number} preco
 * @returns {string}
 */
export function formatarPreco(preco) {

    return preco.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/**
 * =========================================================
 * RENDERIZAR PRODUTOS
 * =========================================================
 *
 * Cria os cards dos produtos dinamicamente no HTML.
 *
 * @param {Array} listaProdutos
 */
export function renderizarProdutos(listaProdutos) {

    const productGrid =
        document.getElementById("productGrid");

    const emptyState =
        document.getElementById("emptyState");


    /*
     * Verifica se o elemento de produtos existe.
     *
     * Isso evita erros caso a função seja executada
     * em uma página que não possua o grid.
     */
    if (!productGrid) {

        console.error(
            "Elemento #productGrid não foi encontrado."
        );

        return;

    }


    /*
     * Limpa os produtos atualmente exibidos.
     */
    productGrid.innerHTML = "";


    /*
     * Se nenhum produto foi encontrado,
     * mostramos o estado vazio.
     */
    if (listaProdutos.length === 0) {

        if (emptyState) {

            emptyState.classList.remove("hidden");

        }

        return;

    }


    /*
     * Existem produtos.
     *
     * Portanto, escondemos a mensagem
     * de "nenhum produto encontrado".
     */
    if (emptyState) {

        emptyState.classList.add("hidden");

    }


    /*
     * Percorre todos os produtos da lista.
     */
    listaProdutos.forEach(
        produto => {

            /*
             * Cria o elemento principal
             * que representará o card.
             */
            const card =
                document.createElement("article");


            /*
             * Adiciona a classe CSS do card.
             */
            card.classList.add(
                "product-card"
            );


            /*
             * Monta o conteúdo HTML do card.
             *
             * ATENÇÃO:
             *
             * A crase que abre esta estrutura deve
             * permanecer exatamente aqui.
             *
             * A crase no final também é obrigatória.
             */
            card.innerHTML = `
                <div class="product-image">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        loading="lazy"
                    >

                </div>


                <div class="product-content">

                    <span class="product-category">
                        ${produto.categoria}
                    </span>


                    <h3 class="product-name">
                        ${produto.nome}
                    </h3>


                    <p class="product-description">
                        ${produto.descricao}
                    </p>


                    <strong class="product-price">
                        ${formatarPreco(produto.preco)}
                    </strong>


                    <button
                        type="button"
                        class="product-button"
                        data-product-id="${produto.id}"
                    >
                        Adicionar ao carrinho
                    </button>

                </div>
            `;


            /*
             * Adiciona o card completo
             * dentro do grid de produtos.
             */
            productGrid.appendChild(
                card
            );

        }
    );

}


/**
 * =========================================================
 * PESQUISAR PRODUTOS
 * =========================================================
 *
 * Pesquisa pelo:
 *
 * - Nome;
 * - Categoria;
 * - Descrição.
 *
 * @param {string} termo
 *
 * @returns {Array}
 */
export function pesquisarProdutos(termo) {

    /*
     * Remove espaços desnecessários e converte
     * o texto para letras minúsculas.
     */
    const termoNormalizado =
        termo
            .trim()
            .toLowerCase();


    /*
     * Se o campo estiver vazio,
     * retornamos todos os produtos.
     */
    if (!termoNormalizado) {

        return produtos;

    }


    /*
     * Filtra os produtos.
     */
    return produtos.filter(
        produto => {

            const nome =
                produto.nome.toLowerCase();

            const categoria =
                produto.categoria.toLowerCase();

            const descricao =
                produto.descricao.toLowerCase();


            /*
             * Retorna verdadeiro quando o termo
             * estiver presente em qualquer um
             * dos campos pesquisados.
             */
            return (

                nome.includes(
                    termoNormalizado
                )

                ||

                categoria.includes(
                    termoNormalizado
                )

                ||

                descricao.includes(
                    termoNormalizado
                )

            );

        }
    );

}


/**
 * =========================================================
 * ORDENAR PRODUTOS
 * =========================================================
 *
 * @param {Array} lista
 * @param {string} criterio
 *
 * @returns {Array}
 */
export function ordenarProdutos(
    lista,
    criterio
) {

    /*
     * Cria uma cópia da lista original.
     *
     * Isso evita alterar diretamente
     * o array principal de produtos.
     */
    const novaLista =
        [...lista];


    /*
     * Verifica qual critério foi selecionado.
     */
    switch (criterio) {

        /*
         * Menor preço.
         */
        case "price-low":

            return novaLista.sort(
                (a, b) =>
                    a.preco - b.preco
            );


        /*
         * Maior preço.
         */
        case "price-high":

            return novaLista.sort(
                (a, b) =>
                    b.preco - a.preco
            );


        /*
         * Ordem alfabética.
         */
        case "name":

            return novaLista.sort(
                (a, b) =>
                    a.nome.localeCompare(
                        b.nome,
                        "pt-BR"
                    )
            );


        /*
         * Relevância / ordem original.
         */
        default:

            return novaLista;

    }

}


/**
 * =========================================================
 * BUSCAR PRODUTO POR ID
 * =========================================================
 *
 * @param {number|string} id
 *
 * @returns {Object|undefined}
 */
export function buscarProdutoPorId(id) {

    return produtos.find(
        produto =>
            produto.id === Number(id)
    );

}


/**
 * =========================================================
 * OBTER TODOS OS PRODUTOS
 * =========================================================
 *
 * Retorna a lista completa de produtos.
 *
 * Posteriormente esta função será substituída
 * por uma chamada à API Python.
 *
 * @returns {Array}
 */
export function obterProdutos() {

    return produtos;

}