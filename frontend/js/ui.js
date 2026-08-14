```javascript
/**
 * =========================================================
 * MÓDULO DA INTERFACE
 * =========================================================
 *
 * Responsabilidade:
 *
 * - Menu mobile.
 * - Notificações.
 * - Interações visuais.
 * =========================================================
 */


/**
 * Inicializa o menu mobile.
 */
export function inicializarMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    /*
     * Verifica se os elementos existem
     * antes de adicionar eventos.
     */
    if (!menuToggle || !navMenu) {

        return;

    }


    menuToggle.addEventListener(
        "click",
        () => {

            const menuAberto =
                navMenu.classList.toggle("active");


            /*
             * Atualiza o atributo de acessibilidade.
             */
            menuToggle.setAttribute(
                "aria-expanded",
                menuAberto
            );

        }
    );

}


/**
 * Exibe uma notificação temporária.
 *
 * @param {string} mensagem
 */
export function mostrarNotificacao(mensagem) {

    /*
     * Cria o elemento da notificação.
     */
    const notification =
        document.createElement("div");


    notification.classList.add(
        "notification"
    );


    notification.textContent =
        mensagem;


    /*
     * Adiciona a notificação à página.
     */
    document.body.appendChild(
        notification
    );


    /*
     * Remove a notificação depois de 3 segundos.
     */
    setTimeout(
        () => {

            notification.remove();

        },
        3000
    );

}
```
