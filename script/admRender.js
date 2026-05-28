
     
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
    setupInvoiceButtons()
})


//CONTEUDO PARA AREA STOCK
const produt = [
    {url: '../../sec_page/produtos/milho.jpg', titulo: "Mix de Vegetais", preco: 1500},
    {url: '../../sec_page/produtos/milho.jpg', titulo: "Bananas Seleccionadas", preco: 800},
    {url: '../../sec_page/produtos/milho.jpg', titulo: "Cenouras Premium", preco: 500},
    {url: '../../sec_page/produtos/milho.jpg', titulo: "Lote Mercado", preco: 2500},
    {url: '../../sec_page/produtos/milho.jpg', titulo: "Couve", preco: 600},
]

const precoPorProduto = {
    "Banana": 800,
    "Feijão": 1200,
    "Batata": 700,
    "Ginguba": 950,
    "Rama": 450,
    "Couve": 600,
    "Tomate": 700,
    "Cenoura": 500,
    "Gimboa": 1100,
    "Maçã": 1300,
    "Pimento": 850,
    "Pipino": 750,
    "Buba": 900,
    "Muteta": 650,
    "Safu": 700,
    "Repolho": 550,
    "Gindungo": 620
}
               
//PARA QUE O CONTAINER NÃO COMEÇE FAZIO
//ESTOU A USAR CONDIÇÃO PARA RENDERIZAR VENDAS
const dat = new Date().toLocaleString('pt-BR')
const infor =[
    {nome: "Saldanha Sousa", email: "sal@gmail.com", produtos: ["Banana", "Feijão"], valor: 2000, numero: 9000000, municipio: "Rangel", Bairro: "Rangel", data: dat},
    {nome: "Bernardo Sousa", email: "be@gmail.com", produtos: ["Batata", "Ginguba", "Rama"], valor: 6000, numero: 9210000, municipio: "Cacuaco", Bairro: "5 M", data: dat},
    {nome: "Avelino Simão", email: "av@gmail.com", produtos: ["Couve", "Tomate", "Cenoura"], valor: 3000, numero: 9220000, municipio: "Viana", Bairro: "Ponte partida", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Fernando Domingos", email: "fern@gmail.com", produtos: ["Gimboa", "Maçã", "Pimento", "Pipino"], valor: 7000, numero: 9345000, municipio: "Cazenga", Bairro: "Tank", data: dat},
    {nome: "Stela Vasco", email: "stel@gmail.com", produtos: ["Buba", "Muteta", "Safu", "Repolho", "Gindungo"], valor: 9000, numero: 92341400, municipio: "Kilamba", Bairro: "Rua 23", data: dat}
    
]

function formatCurrency(valor) {
    return `${Number(valor).toLocaleString('pt-BR')} Kz`
}

function obterItensDaVenda(venda) {
    const produtos = Array.isArray(venda.itens) ? venda.itens : venda.produtos.map((produto, index) => ({
        nome: produto,
        precoUnitario: precoPorProduto[produto] ?? 0,
        quantidade: (venda.quantidades && venda.quantidades[index]) ? venda.quantidades[index] : 1
    }))

    return produtos.map(item => ({
        ...item,
        subtotal: item.precoUnitario * item.quantidade
    }))
}

function gerarFactura(venda, indice) {
    const itens = obterItensDaVenda(venda)
    const total = itens.reduce((acumulador, item) => acumulador + item.subtotal, 0)
    const numeroFactura = `FA-${String(indice + 1).padStart(3, '0')}`

    const conteudoFactura = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #222;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 20px;">
                <div>
                    <div class="logo" style="background-color: #395e3965;">
            <img src="../../icon/logo.png" style="width: 100px; height: 50px; margin: 0; padding: 0; cursor: pointer;" alt="">
        </div>
                    <p style="margin: 4px 0 0; color: #555;">Factura de venda</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold;">${numeroFactura}</p>
                    <p style="margin: 4px 0 0;">${venda.data}</p>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <p style="margin: 0; font-weight: bold;">Cliente: ${venda.nome}</p>
                <p style="margin: 4px 0 0;">Email: ${venda.email}</p>
                <p style="margin: 4px 0 0;">Telefone: ${venda.numero}</p>
                <p style="margin: 4px 0 0;">Município: ${venda.municipio} | Bairro: ${venda.Bairro}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background: #f2f2f2; text-align: left;">
                        <th style="padding: 10px; border: 1px solid #ccc;">Produto</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Preço unitário</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Quantidade</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itens.map(item => `
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ccc;">${item.nome}</td>
                            <td style="padding: 10px; border: 1px solid #ccc;">${formatCurrency(item.precoUnitario)}</td>
                            <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${item.quantidade}</td>
                            <td style="padding: 10px; border: 1px solid #ccc;">${formatCurrency(item.subtotal)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="text-align: right; border-top: 2px solid #333; padding-top: 12px;">
                <p style="margin: 0; font-size: 18px;"><strong>Total pago:</strong> ${formatCurrency(total)}</p>
            </div>
        </div>
    `

    const janela = window.open('', '_blank', 'width=800,height=700')
    if (!janela) {
        alert('O navegador bloqueou a janela da factura. Permita pop-ups para gerar a factura.')
        return
    }

    janela.document.write('<!DOCTYPE html><html><head><title>Factura</title><meta charset="UTF-8"></head><body>' + conteudoFactura + '</body></html>')
    janela.document.close()
    janela.focus()
    setTimeout(() => janela.print(), 500)
}

function setupInvoiceButtons() {
    document.querySelectorAll('.invoice-btn').forEach((botao) => {
        botao.addEventListener('click', () => {
            const indice = Number(botao.dataset.index)
            const venda = infor[indice]
            if (venda) {
                gerarFactura(venda, indice)
            }
        })
    })
}

if(container.classList.contains('containerVendas')){
    container.innerHTML = `
        <div class="contTab">
           <table  >
            
        <tr>
           
            <th>Nome</th>
            <th>Email</th>
            <th>Produtos</th>
            <th>Valor</th>
            <th>Telefone</th>
            <th>Município</th>
            <th>Bairro</th>
            <th>Data</th>
            <th>Factura</th>
                   
        </tr>
        ${infor.map((dados, index) =>`
        <tr>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
            <td>
            <select name="" id="" style="width: 100%; padding: 10px;">
                
                   
                    ${dados.produtos.map(prod => `<option value="" disabled  >${prod}</option>`).join("")}
            
                </select> 
         
            </td>

            <td>${dados.valor}</td>
            <td>${dados.numero}</td>
            <td><address>${dados.municipio}</address></td>
            <td><address>${dados.Bairro}</address></td>
            <td>${dados.data}</td>
            <td class="invoice-btn" data-index="${index}">Gerar</td>
        </tr>
         `).join("")}
    </table>
        </div>
    `
    setupInvoiceButtons()
}else{
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
}



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

        //  PARA RENDERIZAR NA PAGE VENDAS TAMBÉM

            case "diaria":
                return `
                    <div class="contTab">
           <table  >
            
        <tr>
           
            <th>Nome</th>
            <th>Email</th>
            <th>Produtos</th>
            <th>Valor</th>
            <th>Telefone</th>
            <th>Município</th>
            <th>Bairro</th>
            <th>Data</th>
            <th>Factura</th>
                   
        </tr>
        ${infor.map(dados =>`
        <tr>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
            <td>
            <select name="" id="" style="width: 100%; padding: 10px;">
                
                   
                    ${dados.produtos.map(prod => `<option value="" disabled  >${prod}</option>`).join("")}
            
                </select> 
         
            </td>

            <td>${dados.valor}</td>
            <td>${dados.numero}</td>
            <td><address>${dados.municipio}</address></td>
            <td><address>${dados.Bairro}</address></td>
            <td>${dados.data}</td>
            <td class="invoice-btn" data-index="${index}">Gerar</td>
        </tr>
         `).join("")}
    </table>
        </div>
                `
            case "mensal":
                    return '<h2>Aguardando tabela de vendas mensais...</h2>'
            case "anual":
                return '<h2>Aguardando tabela de vendas anual...</h2>'
            case "relatio":   
                return '<h2>Aguardando tabela de relatório...</h2>'
        default:
            return '<h2>Nada encontrado</h2>'
    }
}

     
  

   
     



