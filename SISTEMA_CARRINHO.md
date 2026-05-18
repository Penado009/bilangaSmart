# 🛒 Sistema de Carrinho com localStorage - BILANGA Smart

## 📋 Resumo das Mudanças Implementadas

### ✅ O que foi corrigido:

1. **Erro Crítico**: Substituído `<iframe>` por `<div>` na página de carrinho
2. **localStorage Implementado**: O carrinho agora persiste dados entre sessões
3. **Sincronização entre Páginas**: Produtos adicionados em qualquer página aparecem no carrinho
4. **Quantidade de Produtos**: Sistema de incrementar/decrementar quantidade
5. **Melhor Experiência**: Notificações visuais e validação de formulário

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
- **`script/cart.js`** - Sistema central de carrinho com localStorage
- **`script/cart-page.js`** - Lógica específica da página de carrinho

### Arquivos Modificados:
- **`index.html`** - Adicionado script cart.js
- **`sec_page/produtos/produtos.html`** - Adicionado script cart.js
- **`sec_page/carrinho/carrinho.html`** - Corrigido iframe, adicionados estilos e scripts

---

## 🔧 Como Funciona

### 1. Classe `ShoppingCart` (em `cart.js`)

```javascript
const cart = new ShoppingCart();

// Métodos disponíveis:
cart.addItem(name, price)      // Adicionar item
cart.removeItem(itemId)        // Remover item
cart.increaseQuantity(itemId)  // Aumentar quantidade
cart.decreaseQuantity(itemId)  // Diminuir quantidade
cart.getTotal()                // Obter total
cart.getItemCount()            // Contar itens
cart.clearCart()               // Limpar tudo
cart.getItems()                // Listar itens
```

### 2. Função Global `addToCart()`

Use em qualquer página com:
```html
<button onclick="addToCart('Produto', 800)">🛒 Adicionar</button>
```

---

## 💾 Dados Armazenados no localStorage

O carrinho é salvo em `localStorage` com a chave `'bilanga_cart'`:

```javascript
[
  {
    id: 1234567890,
    name: "Banana",
    price: 800,
    quantity: 2
  },
  {
    id: 1234567891,
    name: "Cenoura",
    price: 600,
    quantity: 1
  }
]
```

### Benefícios:
- ✅ Dados persistem ao recarregar página
- ✅ Sincroniza entre abas/janelas abertas
- ✅ Funciona offline
- ✅ Sem servidor necessário

---

## 🎨 Página de Carrinho

A página `sec_page/carrinho/carrinho.html` agora exibe:

1. **Lista de Produtos**
   - Nome do produto
   - Preço unitário
   - Quantidade (com botões +/-)
   - Botão Remover

2. **Total do Carrinho**
   - Cálculo automático
   - Formatado em Kwanza (Kz)

3. **Formulário de Entrega**
   - Nome, Email, Telefone
   - Município, Bairro
   - Validação de dados

4. **Botões de Ação**
   - Enviar Pedido via WhatsApp
   - Limpar Carrinho

---

## 📤 Pedido via WhatsApp

Quando o usuário clica em "ENVIAR PEDIDO VIA WHATSAPP":

1. Valida todos os dados do formulário
2. Formata mensagem com:
   - Dados do cliente
   - Endereço de entrega
   - Lista de itens
   - Total a pagar
3. Abre WhatsApp Web com mensagem pré-preenchida
4. Limpa o carrinho após envio

**Número WhatsApp Configurável**: Edite em `script/cart-page.js` linha 92:
```javascript
const numeroWhatsApp = '244935850464'; // Alterar este número
```

---

## 🔄 Sincronização em Tempo Real

### Entre Abas/Janelas
Quando você adiciona um produto em uma aba, a outra aba atualiza automaticamente (se aberta).

### Evento Disparado
```javascript
window.dispatchEvent(new Event('cartUpdated'));
```

### Listeners Ativados
- `window.addEventListener('storage', ...)` - Sincroniza entre abas
- `window.addEventListener('cartUpdated', ...)` - Sincroniza na mesma aba

---

## 🎯 Uso na Prática

### Adicionar Produto (Home ou Produtos)
```javascript
addToCart('Banana', 800);
// Resultado:
// - Adiciona à lista
// - Atualiza contador no header
// - Mostra notificação
// - Salva no localStorage
```

### Visualizar Carrinho
Clique no ícone 🛒 no header → vai para `sec_page/carrinho/carrinho.html`

### Finalizar Pedido
1. Preencha o formulário
2. Clique em "ENVIAR PEDIDO VIA WHATSAPP"
3. WhatsApp abre com mensagem formatada
4. Envie ao atendente

---

## 🔒 Validação de Dados

O formulário valida:
- ✅ Nome (mínimo 3 caracteres)
- ✅ Telefone (9 dígitos)
- ✅ Município (obrigatório)
- ✅ Bairro (mínimo 2 caracteres)
- ✅ Carrinho não vazio

Se algum campo estiver inválido, mostra alerta.

---

## 📱 Notificações Visuais

### Quando Adiciona Produto
```
[✓] Banana adicionado ao carrinho!
```
Aparece por 3 segundos no canto superior direito

### Cores do Sistema
- **Verde** (#1b5e1f): Sucesso, primário
- **Laranja** (#ffa000): Destaque, preço
- **Vermelho** (#f44336): Remover, ação negativa

---

## 🚀 Testando o Sistema

1. **Teste na Home**
   - Adicione alguns produtos
   - Recarregue a página
   - Produtos devem ainda estar no carrinho ✅

2. **Teste em Produtos**
   - Adicione mais produtos
   - Verifique contador atualizado ✅

3. **Teste Carrinho**
   - Vá para a página de carrinho
   - Todos os produtos devem aparecer ✅
   - Experimente +/- quantidade
   - Experimente remover item

4. **Teste Entre Abas**
   - Abra 2 abas do site
   - Adicione produto em uma aba
   - Outra aba atualiza automaticamente ✅

---

## 🔧 Ajustes Futuros (Recomendações)

1. **Backend**: Implementar sistema de pedidos no servidor
2. **Pagamento**: Integrar gateway de pagamento (Stripe, PayPal)
3. **Admin**: Dashboard para gerenciar pedidos
4. **Email**: Enviar confirmação por email
5. **SMS**: Notificar cliente via SMS
6. **Analytics**: Rastrear produtos mais vendidos

---

## 📞 Suporte

Para alterar o número WhatsApp:
- Edite `script/cart-page.js`
- Procure por: `const numeroWhatsApp = '244935850464'`
- Substitua pelo seu número

Para adicionar mais produtos:
- Edite os botões `onclick="addToCart('Nome', preco)"`
- O sistema automáticamente gerenciará tudo

---

**Desenvolvido com ❤️ para BILANGA Smart**
