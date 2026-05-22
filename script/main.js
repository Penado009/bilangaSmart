let cart = [];
        let total = 0;

         
        


        function addToCart(name, price) {
            cart.push({ name, price });
            total += price;
            updateUI();
            // alert(name + " adicionado ao carrinho!");
        }

        function updateUI() {
            document.getElementById('count').innerText = cart.length;
            document.getElementById('total-price').innerText = total.toLocaleString();

            const list = document.getElementById('cart-list');
            list.innerHTML = '';
            cart.forEach((item, index) => {
                list.innerHTML += `
                    <div class="cart-item">
                        
                        <span>${item.name} </span>
                        <span>${item.price} Kz</span>
                    </div>
                `;
            });
        }

        function checkoutWhatsApp() {
            if (cart.length === 0) return alert("O carrinho está vazio!");

            let numeroWhatsApp = "244935850464"; // INSIRA O SEU NÚMERO AQUI
            let mensagem = "Olá BILANGA Smart! Gostaria de fazer o seguinte pedido:%0A%0A";

            cart.forEach(item => {
                mensagem += `- ${item.name}: ${item.price} Kz%0A`;
            });

            mensagem += `%0A*Total: ${total} Kz*%0A%0AComo posso proceder com o pagamento?`;

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
        }
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
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

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



    hambur.addEventListener('click', () =>{
        menu_movel.classList.toggle('activo-menu')
    })

    close_cart.addEventListener('click', () =>{
        menu_movel.classList.remove('activo-menu')
    })

    window.addEventListener('resize', () =>{{
        if(window.innerWidth > 768){
            menu_hamburg.classList.remove('activo-menu')
        }
    }})

    
    //PARA O CONTEÚDO DENTRO DE PRODUTOS

    const product_grid = document.querySelector('.product-grid')

    const dados = [{
        img: 'TR.jpg', titulo: 'Banana', preco: 2000
    },
        {img: 'ws.jpg', titulo: 'Cove', preco: 1000
    }  
]   
    product_grid.innerHTML = ''
    product_grid.innerHTML = dados.map(elem =>
        `<div class="product-card">
                    <img src=${elem.img}>
                    <div class="product-info">
                        <h3>${elem.titulo}</h3>
                        <p class="price">${elem.preco}</p>
                        <button class="btn-add" onclick="addToCart('Mix de Vegetais', 1500)">🛒 Adicionar</button>
                    </div>
                </div>`
    ).join('')


