// Sistema de Carrinho com localStorage
class ShoppingCart {
    constructor() {
        this.storageKey = 'bilanga_cart';
        this.items = this.loadFromStorage();
    }

    // Carregar carrinho do localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            return [];
        }
    }

    // Salvar carrinho no localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            // Disparar evento para atualizar todas as abas abertas
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error);
        }
    }

    // Adicionar item ao carrinho
    addItem(name, price) {
        if (!name || price < 0) {
            console.error('Dados inválidos para adicionar ao carrinho');
            return false;
        }

        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                id: Date.now(),
                name,
                price,
                quantity: 1
            });
        }

        this.saveToStorage();
        return true;
    }

    // Remover item do carrinho
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
    }

    // Aumentar quantidade
    increaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity++;
            this.saveToStorage();
        }
    }

    // Diminuir quantidade
    decreaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.removeItem(itemId);
            }
            this.saveToStorage();
        }
    }

    // Obter total do carrinho
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Obter quantidade total de itens
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Limpar carrinho
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }

    // Obter todos os itens
    getItems() {
        return this.items;
    }
}

// Instância global do carrinho
const cart = new ShoppingCart();

// Função para adicionar ao carrinho (compatível com onclick)
function addToCart(name, price) {
    if (cart.addItem(name, price)) {
        // Mostrar feedback visual
        showNotification(`${name} adicionado ao carrinho!`);
        updateCartCount();
    }
}

// Atualizar contador do carrinho em tempo real
function updateCartCount() {
    const countElements = document.querySelectorAll('#count');
    const count = cart.getItemCount();
    countElements.forEach(el => {
        el.innerText = count;
    });
}

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

// Inicializar contador ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Sincronizar carrinho quando houver mudanças em outra aba
window.addEventListener('storage', (event) => {
    if (event.key === 'bilanga_cart') {
        cart.items = cart.loadFromStorage();
        updateCartCount();
    }
});
