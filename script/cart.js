import {
    getProdutos,
    criarPedido
} from './server.js'



// Sistema de Carrinho com localStorage
class ShoppingCart {

    constructor() {
        this.items = this.load();
    }

    load() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    add(idProduto, name, price) {

        const item = this.items.find(i => i.idProduto === idProduto);

        if (item) {
            item.quantidade++;
        } else {
            this.items.push({
                idProduto,
                name,
                price,
                quantidade: 1
            });
        }

        this.save();
    }

    increase(idProduto) {
        const item = this.items.find(i => i.idProduto === idProduto);
        if (item) item.quantidade++;
        this.save();
    }

    decrease(idProduto) {
        const item = this.items.find(i => i.idProduto === idProduto);

        if (!item) return;

        item.quantidade--;

        if (item.quantidade <= 0) {
            this.remove(idProduto);
        }

        this.save();
    }

    remove(idProduto) {
        this.items = this.items.filter(i => i.idProduto !== idProduto);
        this.save();
    }

    clear() {
        this.items = [];
        this.save();
    }

    total() {
        return this.items.reduce(
            (sum, i) => sum + (i.price * i.quantidade),
            0
        );
    }

    getItemCount() {
        return this.items.reduce((sum, i) => sum + i.quantidade, 0);
    }
}

// Instância global do carrinho
export const cart = new ShoppingCart();
window.cart = cart;

// função única global
function addToCart(idProduto, name, price) {
    // Se chamado com 2 parâmetros (legacy support): addToCart('Banana', 800)
    if (price === undefined) {
        price = name;
        name = idProduto;
        idProduto = name.toLowerCase().replace(/\s+/g, '_'); // Gera ID a partir do nome
    }
    
    cart.add(idProduto, name, price);
    renderCart();
    showNotification(`${name} adicionado ao carrinho`);
}

window.addToCart = addToCart;

//PARA RENDERZAR EM CART ITEM
function renderCart() {



    const list = document.getElementById('cart-list');

    if (cart.items.length === 0) {
         list.innerHTML = '<div class="cart-empty">Carrinho vazio</div>';
         return;
     }

    if(!list) return;

    list.innerHTML = cart.items.map(item => `
        <div class="cart-item">

            <abbr class="abbr_nome" title="${item.name}"><span class="cart-item-name">${item.name}</span></abbr>
            

            <div class="cart-item-quantity">

            
            <button onclick="decrease(${item.idProduto})">-</button>
            <span>${item.quantidade}</span>
            
            <button onclick="increase(${item.idProduto})">+</button>
            
            </div>
            
            <span class="cart-item-price" >${item.price * item.quantidade} Kz</span>
            
            <button class="cart-item-remove"  onclick="removeItem(${item.idProduto})">
            <span class="material-symbols-outlined">delete</span>
            </button>
            
        </div>
    `).join('');

    document.getElementById('total-price').innerText =
        cart.total().toLocaleString();

    updateCartCount();
}

// Inicializar contador ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});
function increase(id) {
    cart.increase(id);
    renderCart();
}

function decrease(id) {
    cart.decrease(id);
    renderCart();
}

function removeItem(id) {
    cart.remove(id);
    renderCart();
}

window.increase = increase;
window.decrease = decrease;
window.removeItem = removeItem;




// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 100);
    }, 3000);
}

window.showNotification = showNotification;

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


//Atualizar contador do carrinho em tempo real
function updateCartCount() {
    const countElements = document.querySelectorAll('#count');
    const count = cart.getItemCount();
    countElements.forEach(el => {
        el.innerText = count;
    });
}

//PARA PEDIDOS

async function finalizarPedido() {

     const borderRed = document.querySelector('.borderRed')
     const nome = document.getElementById('inome').value.trim();
     const email = document.getElementById('i-email').value.trim();
     const telefone = document.getElementById('itelef').value.trim();
     const municipio = document.getElementById('imunicipio').value;
     const bairro = document.getElementById('ibairro').value.trim();

      //Validação básica
     if (!nome || nome.length < 3) {
         alert('Por favor, digite um nome válido');
         return;
     }

     if (!telefone || telefone.length < 9) {
         alert('Por favor, digite um telefone válido');
         return;
     }

     if (!municipio) {
         alert('Por favor, selecione um município');
         return;
     }

     if (!bairro || bairro.length < 2) {
         alert('Por favor, digite um bairro válido');
         return;
     }

     if (cart.items.length === 0) {
         alert('O carrinho está vazio!');
         return;
     }
   

    const pedido = {
        cliente: nome,

        endereco:
            municipio +
            ', ' +
            bairro,

        telefone: telefone,

        dataEntrega: new Date().toISOString(),

        itensPedido: cart.items.map(item => ({
            idProduto: item.idProduto,
            quantidade: item.quantidade
        }))
    };

    try {

        const res = await fetch('http://localhost:8080/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (!res.ok) throw new Error('Erro ao enviar pedido');

        showNotification('Pedido enviado com sucesso!');
        cart.clear();
        renderCart();

    } catch (err) {
        console.error(err);
        alert('Erro ao enviar pedido');
    }


    // Limpar carrinho após envio
     setTimeout(() => {
         cart.clear();
         renderCart();
        
         // Limpar formulário
         document.getElementById('inome').value = '';
         document.getElementById('i-email').value = '';
         document.getElementById('itelef').value = '';
         document.getElementById('imunicipio').value = '';
         document.getElementById('ibairro').value = '';
        
     }, 500);
}




 // Limpar carrinho
  function clearCartItems() {
      if (confirm('Tem certeza que deseja limpar o carrinho?')) {
          cart.clear();
          renderCart();
          updateCartCount();
          showNotification('Carrinho limpo');
      }
  }
     
  window.clearCartItems = clearCartItems
 

 //Renderizar carrinho quando a página carrega
 document.addEventListener('DOMContentLoaded', () => {
     renderCart();
 });

window.finalizarPedido = finalizarPedido;