const productGrid = document.querySelector('.product-grid')
const produt = [
    {url: '../imagens/TR.jpg', titulo: "Mix de Vegetais", preco: 1500},
    {url: 'DR.jpg', titulo: "Bananas Seleccionadas", preco: 800},
    {url: 'DR.jpg', titulo: "Cenouras Premium", preco: 500},
    {url: 'DR.jpg', titulo: "Lote Mercado", preco: 2500},
    {url: 'DR.jpg', titulo: "Couve", preco: 600},
]


productGrid.innerHTML = produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('')

productGrid.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-add')){
        const titulo = e.target.dataset.titulo
        const preco = e.target.dataset.preco
        addToCart(titulo, preco)
    }
})
