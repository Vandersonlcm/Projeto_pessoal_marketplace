/**
 * =========================================================
 * MÓDULO DO CARRINHO DE COMPRAS
 * =========================================================
 *
 * Responsabilidade:
 *
 * - Adicionar produtos ao carrinho.
 * - Remover produtos.
 * - Alterar quantidade.
 * - Calcular subtotal.
 * - Calcular total.
 * - Salvar o carrinho no navegador.
 * - Recuperar o carrinho.
 *
 * Nesta etapa utilizamos localStorage.
 *
 * Posteriormente este módulo poderá ser integrado
 * ao back-end Python.
 * =========================================================
 */


/**
 * Chave utilizada para armazenar o carrinho
 * no localStorage.
 */
const CHAVE_CARRINHO =
    "marketplace_carrinho";


/**
 * =========================================================
 * OBTER CARRINHO
 * =========================================================
 *
 * Recupera os produtos armazenados no navegador.
 *
 * @returns {Array}
 */
export function obterCarrinho() {

    /*
     * Busca os dados armazenados.
     */
    const dados =
        localStorage.getItem(
            CHAVE_CARRINHO
        );


    /*
     * Caso não exista nenhum carrinho,
     * retornamos um array vazio.
     */
    if (!dados) {

        return [];

    }


    /*
     * Tenta converter o JSON para JavaScript.
     */
    try {

        return JSON.parse(
            dados
        );

    }

    catch (erro) {

        /*
         * Caso os dados estejam corrompidos,
         * exibimos o erro no console.
         */
        console.error(
            "Erro ao carregar o carrinho:",
            erro
        );


        /*
         * Retorna um carrinho vazio.
         */
        return [];

    }

}


/**
 * =========================================================
 * SALVAR CARRINHO
 * =========================================================
 *
 * @param {Array} carrinho
 */
export function salvarCarrinho(
    carrinho
) {

    /*
     * Converte o array para JSON.
     */
    const dados =
        JSON.stringify(
            carrinho
        );


    /*
     * Salva no navegador.
     */
    localStorage.setItem(
        CHAVE_CARRINHO,
        dados
    );

}


/**
 * =========================================================
 * ADICIONAR PRODUTO
 * =========================================================
 *
 * @param {Object} produto
 */
export function adicionarProduto(
    produto
) {

    /*
     * Validação básica.
     */
    if (!produto || !produto.id) {

        console.error(
            "Produto inválido."
        );

        return false;

    }


    /*
     * Recupera o carrinho atual.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Procura o produto no carrinho.
     */
    const itemExistente =
        carrinho.find(
            item =>
                item.id === produto.id
        );


    /*
     * Se o produto já estiver no carrinho,
     * aumentamos sua quantidade.
     */
    if (itemExistente) {

        itemExistente.quantidade += 1;

    }


    /*
     * Caso contrário, adicionamos
     * um novo produto.
     */
    else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            imagem: produto.imagem,

            quantidade: 1

        });

    }


    /*
     * Salva o novo estado.
     */
    salvarCarrinho(
        carrinho
    );


    /*
     * Retorna verdadeiro indicando
     * que a operação foi concluída.
     */
    return true;

}


/**
 * =========================================================
 * REMOVER PRODUTO
 * =========================================================
 *
 * Remove completamente um produto do carrinho.
 *
 * @param {number|string} produtoId
 */
export function removerProduto(
    produtoId
) {

    /*
     * Recupera o carrinho.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Cria uma nova lista sem o produto informado.
     */
    const novoCarrinho =
        carrinho.filter(
            item =>
                item.id !== Number(produtoId)
        );


    /*
     * Salva o resultado.
     */
    salvarCarrinho(
        novoCarrinho
    );


    return novoCarrinho;

}


/**
 * =========================================================
 * ALTERAR QUANTIDADE
 * =========================================================
 *
 * @param {number|string} produtoId
 * @param {number} quantidade
 */
export function alterarQuantidade(
    produtoId,
    quantidade
) {

    /*
     * Recupera o carrinho.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Localiza o produto.
     */
    const item =
        carrinho.find(
            produto =>
                produto.id === Number(produtoId)
        );


    /*
     * Se o produto não existir,
     * encerramos a função.
     */
    if (!item) {

        return carrinho;

    }


    /*
     * Converte a quantidade para número.
     */
    const novaQuantidade =
        Number(quantidade);


    /*
     * Se a quantidade for menor ou igual a zero,
     * removemos o produto.
     */
    if (
        novaQuantidade <= 0
    ) {

        return removerProduto(
            produtoId
        );

    }


    /*
     * Atualiza a quantidade.
     */
    item.quantidade =
        novaQuantidade;


    /*
     * Salva o carrinho.
     */
    salvarCarrinho(
        carrinho
    );


    return carrinho;

}


/**
 * =========================================================
 * AUMENTAR QUANTIDADE
 * =========================================================
 *
 * @param {number|string} produtoId
 */
export function aumentarQuantidade(
    produtoId
) {

    /*
     * Obtém o carrinho.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Procura o item.
     */
    const item =
        carrinho.find(
            produto =>
                produto.id === Number(produtoId)
        );


    /*
     * Se não encontrar o item,
     * não executamos nada.
     */
    if (!item) {

        return carrinho;

    }


    /*
     * Aumenta uma unidade.
     */
    item.quantidade += 1;


    /*
     * Salva as alterações.
     */
    salvarCarrinho(
        carrinho
    );


    return carrinho;

}


/**
 * =========================================================
 * DIMINUIR QUANTIDADE
 * =========================================================
 *
 * @param {number|string} produtoId
 */
export function diminuirQuantidade(
    produtoId
) {

    /*
     * Recupera o carrinho.
     */
    const carrinho =
        obterCarrinho();


    /*
     * Procura o item.
     */
    const item =
        carrinho.find(
            produto =>
                produto.id === Number(produtoId)
        );


    /*
     * Se não encontrar,
     * retorna o carrinho atual.
     */
    if (!item) {

        return carrinho;

    }


    /*
     * Diminui uma unidade.
     */
    item.quantidade -= 1;


    /*
     * Se chegar a zero,
     * remove o produto.
     */
    if (
        item.quantidade <= 0
    ) {

        return removerProduto(
            produtoId
        );

    }


    /*
     * Salva as alterações.
     */
    salvarCarrinho(
        carrinho
    );


    return carrinho;

}


/**
 * =========================================================
 * CALCULAR QUANTIDADE TOTAL
 * =========================================================
 *
 * Soma a quantidade de todos os produtos.
 *
 * @returns {number}
 */
export function calcularQuantidadeTotal() {

    const carrinho =
        obterCarrinho();


    return carrinho.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                item.quantidade
            );

        },
        0
    );

}


/**
 * =========================================================
 * CALCULAR SUBTOTAL
 * =========================================================
 *
 * @returns {number}
 */
export function calcularSubtotal() {

    const carrinho =
        obterCarrinho();


    return carrinho.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                (
                    item.preco *
                    item.quantidade
                )
            );

        },
        0
    );

}


/**
 * =========================================================
 * CALCULAR TOTAL
 * =========================================================
 *
 * Neste momento o total é igual ao subtotal.
 *
 * Posteriormente podemos acrescentar:
 *
 * - Frete;
 * - Descontos;
 * - Cupons;
 * - Impostos;
 * - Outras regras comerciais.
 *
 * @returns {number}
 */
export function calcularTotal() {

    const subtotal =
        calcularSubtotal();


    return subtotal;

}


/**
 * =========================================================
 * LIMPAR CARRINHO
 * =========================================================
 */
export function limparCarrinho() {

    /*
     * Remove o carrinho do navegador.
     */
    localStorage.removeItem(
        CHAVE_CARRINHO
    );

}


/**
 * =========================================================
 * VERIFICAR SE O CARRINHO ESTÁ VAZIO
 * =========================================================
 *
 * @returns {boolean}
 */
export function carrinhoEstaVazio() {

    const carrinho =
        obterCarrinho();


    return carrinho.length === 0;

}