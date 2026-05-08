let cart = [];
        let total = 0;

        // function openShop() {
        //     document.getElementById('landing').style.display = 'none';
        //     document.getElementById('shop-area').style.display = 'block';
        // }

        function toggleCart(show) {
            document.getElementById('cart-sidebar').classList.toggle('active', show);
        }

        function addToCart(name, price) {
            cart.push({ name, price });
            total += price;
            updateUI();
            alert(name + " adicionado ao carrinho!");
        }

        function updateUI() {
            document.getElementById('count').innerText = cart.length;
            document.getElementById('total-price').innerText = total.toLocaleString();

            const list = document.getElementById('cart-list');
            list.innerHTML = '';
            cart.forEach((item, index) => {
                list.innerHTML += `
                    <div class="cart-item">
                        <span>${item.name}</span>
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