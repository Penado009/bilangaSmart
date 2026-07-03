// Script específico para a página do carrinho
import { cart } from './cart.js';
// Renderizar itens do carrinho
// function renderCartItems() {
//     const cartList = document.getElementById('cart-list');
//     const totalPrice = document.getElementById('total-price');
//     const btnFinalize = document.getElementById('btn-finalize');

//     if (cart.items.length === 0) {
//         cartList.innerHTML = '<div class="cart-empty">Carrinho vazio</div>';
//         totalPrice.innerText = '0';
//         btnFinalize.style.display = 'none';
//         return;
//     }

//     let html = '';
//     cart.items.forEach(item => {
//         const subtotal = item.price * item.quantity;
//         html += `
//             <div class="cart-item">
//                 <div class="cart-item-info">
//                     <div class="cart-item-name">${item.name}</div>
//                     <div class="cart-item-price">${item.price.toLocaleString('pt-AO')} Kz x ${item.quantity}</div>
//                 </div>
//                 <div class="cart-item-quantity">
//                     <button onclick="decreaseQuantity(${item.id})">−</button>
//                     <span>${item.quantity}</span>
//                     <button onclick="increaseQuantity(${item.id})">+</button>
//                 </div>
//                 <button class="cart-item-remove" onclick="removeItem(${item.id})">Remover</button>
//             </div>
//         `;
//     });

//     cartList.innerHTML = html;
//     totalPrice.innerText = cart.getTotal().toLocaleString('pt-AO');
//     btnFinalize.style.display = 'block';
// }

// // Aumentar quantidade de item
// function increaseQuantity(itemId) {
//     cart.increaseQuantity(itemId);
//     renderCartItems();
//     updateCartCount();
// }

// // Diminuir quantidade de item
// function decreaseQuantity(itemId) {
//     cart.decreaseQuantity(itemId);
//     renderCartItems();
//     updateCartCount();
// }

// // Remover item
// function removeItem(itemId) {
//     cart.removeItem(itemId);
//     renderCartItems();
//     updateCartCount();
//     showNotification('Produto removido do carrinho');
// }

// // Limpar carrinho
// function clearCartItems() {
//     if (confirm('Tem certeza que deseja limpar o carrinho?')) {
//         cart.clearCart();
//         renderCartItems();
//         updateCartCount();
//         showNotification('Carrinho limpo');
//     }
// }

// Finalizar pedido via WhatsApp
// function finalizeOrder() {
//     

//     // Construir mensagem para WhatsApp
//     let mensagem = `🛒 *PEDIDO BILANGA SMART*%0A%0A`;
//     mensagem += `👤 *CLIENTE*%0A`;
//     mensagem += `Nome: ${nome}%0A`;
//     mensagem += `Telefone: ${telefone}%0A`;
//     mensagem += `Email: ${email || 'N/A'}%0A%0A`;
    
//     mensagem += `📍 *ENDEREÇO DE ENTREGA*%0A`;
//     mensagem += `Município: ${municipio}%0A`;
//     mensagem += `Bairro: ${bairro}%0A%0A`;
    
//     mensagem += `📦 *ITENS DO PEDIDO*%0A`;
//     let total = 0;
//     cart.items.forEach(item => {
//         const subtotal = item.price * item.quantity;
//         total += subtotal;
//         mensagem += `• ${item.name} x${item.quantity} = ${subtotal.toLocaleString('pt-AO')} Kz%0A`;
//     });

//     mensagem += `%0A💰 *TOTAL: ${total.toLocaleString('pt-AO')} Kz*%0A%0A`;
//     mensagem += `Como posso proceder com o pagamento?`;

//     // Número WhatsApp
//     const numeroWhatsApp = '244935850464';

//     // Abrir WhatsApp
//     window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');

//     // Limpar carrinho após envio
//     setTimeout(() => {
//         cart.clearCart();
//         renderCartItems();
//         updateCartCount();
        
//         // Limpar formulário
//         document.getElementById('inome').value = '';
//         document.getElementById('i-email').value = '';
//         document.getElementById('itelef').value = '';
//         document.getElementById('imunicipio').value = '';
//         document.getElementById('ibairro').value = '';
        
//         showNotification('Pedido enviado com sucesso!');
//     }, 500);
// }

// Renderizar carrinho quando a página carrega
// document.addEventListener('DOMContentLoaded', () => {
//     renderCartItems();
//     updateCartCount();
// });

// // Atualizar carrinho quando há mudanças em outra aba
// window.addEventListener('storage', (event) => {
//     if (event.key === 'bilanga_cart') {
//         cart.items = cart.loadFromStorage();
//         renderCartItems();
//         updateCartCount();
//     }
// });

// // Atualizar carrinho quando houver evento customizado
// window.addEventListener('cartUpdated', () => {
//     renderCartItems();
//     updateCartCount();
// });
