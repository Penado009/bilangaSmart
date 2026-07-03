import {getProdutos} from './server.js'

const produtos = await getProdutos()

const productGrid = document.querySelector(".product-grid")

if (productGrid) {
    productGrid.innerHTML = produtos.map(el => `
        <div class="product-card">
                    <img src="http://localhost:8080${el.imagemUrl}">
                    <div class="product-info">
                        <h3>${el.nome}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add"  onclick="addToCart(${el.id}, '${el.nome}', ${el.preco})">🛒 Adicionar</button>
                    </div>
        </div>
`).join('')
}





