
function filterProducts() {
    // 1. Obter o texto da pesquisa e converter para minúsculas
    let input = document.getElementById('searchInput').value.toLowerCase();

    // 2. Selecionar todos os cartões de produto
    let cards = document.getElementsByClassName('product-card');

    // 3. Percorrer cada cartão
    for (let i = 0; i < cards.length; i++) {
        let productName = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();

        // 4. Se o nome contiver o texto pesquisado, mostra. Se não, esconde.
        if (productName.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

window.filterProducts = filterProducts;

/*Catalogo prev e back*/

document.addEventListener('DOMContentLoaded', () => {
    const next_catal = document.querySelector('.next_catal');
    const prev_catal = document.querySelector('.prev_catal');
    

    if (next_catal && prev_catal) {
        next_catal.addEventListener('click', () => {
            const item_catol = document.querySelectorAll('.item_catol');
            const slideCatal = document.querySelector('.slide_catal');
            if (slideCatal && item_catol.length) {
                slideCatal.appendChild(item_catol[0]);
            }
        });

        prev_catal.addEventListener('click', () => {
            const item_catol = document.querySelectorAll('.item_catol');
            const slideCatal = document.querySelector('.slide_catal');
            if (slideCatal && item_catol.length) {
                slideCatal.prepend(item_catol[item_catol.length - 1]);
            }
        });
    } 
});

    //PARA O MENU
    const menu_hamburg = document.getElementById('hambur')
    const menu_movel = document.querySelector('.menu-movel')
    const close_cart = document.querySelector('.close-cart')

    

    if (menu_hamburg && close_cart) {
        menu_hamburg.addEventListener('click', () =>{
        menu_movel.classList.toggle('activo-menu')
    })

    close_cart.addEventListener('click', () =>{
        menu_movel.classList.remove('activo-menu')
    })

    }

    

    window.addEventListener('resize', () =>{{
        if(window.innerWidth > 768){
            menu_hamburg.classList.remove('activo-menu')
        }
    }})


