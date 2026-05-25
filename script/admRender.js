
     
//FAZER A TROCA DE CONTEÚDO NA PAGE PRODUTOS CLICANDO NO MENU
const container = document.getElementById('icontainerCadastrar')
const menuProDash = document.getElementById('inavProDash')

menuProDash.addEventListener('click', (e) =>{
    if(e.target.tagName !== 'A') return

    e.preventDefault()
    const page = e.target.dataset.page


    document.querySelectorAll('#inavProDash a').forEach(a => a.classList.remove('ative'))
    e.target.classList.add('ative')

    document.getElementById('icontainerCadastrar').classList.remove('product-grid')

    container.innerHTML = renderizar(page)
})


//CONTEUDO PARA AREA STOCK
const produt = [
    {url: '../sec_page/produtos/milho.jpg', titulo: "Mix de Vegetais", preco: 1500},
    {url: 'DR.jpg', titulo: "Bananas Seleccionadas", preco: 800},
    {url: 'DR.jpg', titulo: "Cenouras Premium", preco: 500},
    {url: 'DR.jpg', titulo: "Lote Mercado", preco: 2500},
    {url: 'DR.jpg', titulo: "Couve", preco: 600},
]
               
//PARA QUE O CONTAINER NÃO COMEÇE FAZIO
container.innerHTML = produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');

//FUNÇÃO QUE RENDERIZA
function renderizar(page){
    switch(page){

        case 'cadastrar':
            return  `
            <div class="sidebar-card">
            <h3>Registo de Nova Entrada</h3>
            <form>
            <div class="form-group">
            <input type="text" placeholder="Nome do produto">
            <input type="text" placeholder="Categoria">
            </div>
            
            <div class="form-group"> 
            <input type="number" min="0" placeholder="Quantidade">
            <input type="number" min="0" placeholder="Preço em Kwanza">
            </div>
            
            <div class="form-group">
            <select name="estado" id="iestado">
            <option >Estado do produto</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
            </select>
            <input type="date">
            </div>
            
            <div class="form-group">
            <input type="file" name="produto-image" id="iproduto-image" placeholder="Insira a imagem">
            <textarea name="descricao" id="idescricao" class="descricao"></textarea>
            </div>
            <button type="button" class="btn-submit">Adicionar Produto</button>
            </form>
            </div>
            `
        case 'stock':
            container.classList.add('product-grid')
        return produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');
    
        case 'tubercule':
            container.classList.add('product-grid')
            return produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');
        case 'frutos':
             container.classList.add('product-grid')
            return produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');

            
        case 'horticulas':
            container.classList.add('product-grid')
            return produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');
        case 'vegetais':
             container.classList.add('product-grid')
            return produt.map(el => `
        <div class="product-card">
                    <img src="${el.url}">
                    <div class="product-info">
                        <h3>${el.titulo}</h3>
                        <p class="price">${el.preco} Kz / kg</p>
                        <button class="btn-add" data-titulo="${el.titulo}" data-preco="${el.preco}" >🛒 Adicionar</button>
                    </div>
        </div>
`).join('');
        default:
            return '<h2>Nada encontrado</h2>'
    }
}

     
  

   
     



