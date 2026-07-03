
     
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
    setupCadastroButton()
    setupProductButtons()
})


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



function gerarFactura(pedido) {

    const total = pedido.itensPedido.reduce(
        (soma, item) => soma + item.subtotal,
        0
    )

    const numeroFactura = `FA-${String(pedido.id).padStart(5, '0')}`

    const conteudoFactura = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px;">

            <div style="display:flex; justify-content:space-between; border-bottom:2px solid #333; padding-bottom:10px;">
                
                <div>
                    <img src="../../icon/logo.png"
                         style="width:120px;">
                    <p>Factura de Venda</p>
                </div>

                <div style="text-align:right;">
                    <h3>${numeroFactura}</h3>
                    <p>${pedido.dataPedido}</p>
                </div>

            </div>

            <br>

            <h3>Dados do Cliente</h3>

            <p><strong>Cliente:</strong> ${pedido.cliente}</p>
            <p><strong>Telefone:</strong> ${pedido.telefone}</p>
            <p><strong>Endereço:</strong> ${pedido.endereco}</p>

            <br>

            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="border:1px solid #ccc; padding:8px;">Produto</th>
                        <th style="border:1px solid #ccc; padding:8px;">Preço</th>
                        <th style="border:1px solid #ccc; padding:8px;">Qtd</th>
                        <th style="border:1px solid #ccc; padding:8px;">Subtotal</th>
                    </tr>
                </thead>

                <tbody>

                    ${pedido.itensPedido.map(item => `
                        <tr>
                            <td style="border:1px solid #ccc; padding:8px;">
                                ${item.produtoNome}
                            </td>

                            <td style="border:1px solid #ccc; padding:8px;">
                                ${formatCurrency(item.precoUnitario)}
                            </td>

                            <td style="border:1px solid #ccc; padding:8px;">
                                ${item.quantidade}
                            </td>

                            <td style="border:1px solid #ccc; padding:8px;">
                                ${formatCurrency(item.subtotal)}
                            </td>
                        </tr>
                    `).join('')}

                </tbody>
            </table>

            <div style="text-align:right; margin-top:20px;">
                <h2>Total: ${formatCurrency(total)}</h2>
            </div>

        </div>
    `

    const janela = window.open('', '_blank')

    janela.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Factura</title>
            <link rel="shortcut icon" href="../../icon/favicon.ico" type="image/x-icon">
        </head>
        <body>
            ${conteudoFactura}
        </body>
        </html>
    `)

    janela.document.close()

    setTimeout(() => {
        janela.print()
    }, 500)
}


function setupInvoiceButtons() {
    document.querySelectorAll('.invoice-btn').forEach((botao) => {
        botao.addEventListener('click', () => {
            const id = Number(botao.dataset.index)
           const venda = pedidos.find(
    pedido => pedido.id === id
);
            if (venda) {
                gerarFactura(venda, indice)
            }
        })
    })
}

if(container.classList.contains('containerVendas')){
    container.innerHTML = `<h2>Em construção...</h2>`
    setupInvoiceButtons()
}else{
    container.innerHTML =  `
       
                        <h2>Em construção...</h2>                    
        
`
}



//FUNÇÃO QUE RENDERIZA (enviar para api)
import {criarProduto, getProdutos, editarProduto, eliminarProduto, getPedidos} from './server.js'


const produtos = await getProdutos()
const pedidos = await getPedidos()

function setupCadastroButton() {

    const btn = document.getElementById("submitCadastro");
    if (!btn) return;

    btn.addEventListener("click", async () => {

        const nome = document.getElementById("inome");
        const categoria = document.getElementById("icategoria");
        const preco = document.getElementById("ipreco");
        const unidade = document.getElementById("iunidade");
        const estado = document.getElementById("iestado");
        const descricao = document.getElementById("idescricao");
        const imagem = document.getElementById("iproduto-image");

        // Remove estilos de erro anteriores
        document.querySelectorAll(".input-error").forEach(el => {
            el.classList.remove("input-error");
        });

        const erros = [];

        // Nome
        if (!nome.value.trim()) {
            erros.push("Informe o nome do produto.");
            nome.classList.add("input-error");
        }

        // Categoria
        if (!categoria.value) {
            erros.push("Selecione uma categoria.");
            categoria.classList.add("input-error");
        }

        // Preço
        if (!preco.value || Number(preco.value) <= 0) {
            erros.push("Informe um preço válido.");
            preco.classList.add("input-error");
        }

        // Unidade
        if (!unidade.value) {
            erros.push("Selecione a unidade.");
            unidade.classList.add("input-error");
        }

        // Estado
        if (!estado.value || estado.value === "Estado do produto") {
            erros.push("Selecione o estado do produto.");
            estado.classList.add("input-error");
        }

        // Descrição
        if (!descricao.value.trim()) {
            erros.push("Informe a descrição.");
            descricao.classList.add("input-error");
        }

        // Imagem
        if (!imagem.files.length) {
            erros.push("Selecione uma imagem.");
            imagem.classList.add("input-error");
        }

        // Se houver erros
        if (erros.length > 0) {
            alert(erros.join("\n"));
            return;
        }

        const produto = {
            nome: nome.value.trim(),
            categoria: categoria.value,
            preco: Number(preco.value),
            unidade: unidade.value,
            estado: estado.value,
            descricao: descricao.value.trim()
        };

        const formData = new FormData();

        Object.entries(produto).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("imagem", imagem.files[0]);

        try {

            btn.disabled = true;
            btn.textContent = "Cadastrando...";

            const resposta = await criarProduto(formData);

            console.log(resposta);

            mostrarMensagem(
    "sucesso",
    "Produto cadastrado com sucesso!"
);

            document.getElementById("formCadastrar").reset();

        } catch (erro) {

            console.error(erro);

            mostrarMensagem(
    "erro",
    "Não foi possível cadastrar o produto."
);

        } finally {

            btn.disabled = false;
            btn.textContent = "Adicionar Produto";

        }

    });

}

setupCadastroButton()
//PARA OS ERRO
function mostrarMensagem(tipo, mensagem){

    const box = document.getElementById("mensagemFormulario");

    box.className = "";

    box.classList.add(tipo);

    box.textContent = mensagem;

    box.style.display = "block";

    setTimeout(()=>{

        box.style.display = "none";

    },5000);

}


// FUNÇÃO PARA EDITAR E ELIMINAR PRODUTOS
function setupProductButtons() {
    document.querySelectorAll('.btn-editar').forEach((botao) => {
        botao.addEventListener('click', (e) => {
            e.preventDefault()
            const produtoId = botao.dataset.id
            const produtoCompleto = produtos.find(p => p.id == produtoId)
            if (produtoCompleto) {
                abrirModalEditar(produtoCompleto)
            }
        })
    })

    document.querySelectorAll('.btn-eliminar').forEach((botao) => {
        botao.addEventListener('click', (e) => {
            e.preventDefault()
            const produtoId = botao.dataset.id
            const produtoNome = botao.dataset.titulo
            
            if (confirm(`Tem certeza que deseja eliminar o produto "${produtoNome}"?`)) {
                eliminarProdutoAPI(produtoId, produtoNome)
            }
        })
    })
}

// Modal para editar produto
function abrirModalEditar(produto) {
    const modal = document.createElement('div')
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        ">
            <h2>Editar Produto</h2>
            <form id="formEditarProduto">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Nome do Produto:</label>
                    <input type="text" id="edt_nome" value="${produto.nome}" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Categoria:</label>
                    <select id="edt_categoria" required style="width: 100%; padding: 8px; margin-top: 5px;">
                        <option value="Frutas" ${produto.categoria === 'Frutas' ? 'selected' : ''}>Frutas</option>
                        <option value="Hortaliças" ${produto.categoria === 'Hortaliças' ? 'selected' : ''}>Hortaliças</option>
                        <option value="Legumes" ${produto.categoria === 'Legumes' ? 'selected' : ''}>Legumes</option>
                        <option value="Tubérculos e Raízes" ${produto.categoria === 'Tubérculos e Raízes' ? 'selected' : ''}>Tubérculos e Raízes</option>
                        <option value="Cereais e Grãos" ${produto.categoria === 'Cereais e Grãos' ? 'selected' : ''}>Cereais e Grãos</option>
                        <option value="Leguminosas" ${produto.categoria === 'Leguminosas' ? 'selected' : ''}>Leguminosas</option>
                        <option value="Temperos e Condimentos" ${produto.categoria === 'Temperos e Condimentos' ? 'selected' : ''}>Temperos e Condimentos</option>
                        <option value="Oleaginosas" ${produto.categoria === 'Oleaginosas' ? 'selected' : ''}>Oleaginosas</option>
                        <option value="Produtos Processados do Campo" ${produto.categoria === 'Produtos Processados do Campo' ? 'selected' : ''}>Produtos Processados do Campo</option>
                        <option value="Produtos Orgânicos" ${produto.categoria === 'Produtos Orgânicos' ? 'selected' : ''}>Produtos Orgânicos</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Preço (Kz):</label>
                    <input type="number" id="edt_preco" value="${produto.preco}" min="0" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Estado:</label>
                    <select id="edt_estado" required style="width: 100%; padding: 8px; margin-top: 5px;">
                        <option value="true" ${produto.estado === true || produto.estado === 'true' ? 'selected' : ''}>Disponível</option>
                        <option value="false" ${produto.estado === false || produto.estado === 'false' ? 'selected' : ''}>Indisponível</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Descrição:</label>
                    <textarea id="edt_descricao" required style="width: 100%; padding: 8px; margin-top: 5px; min-height: 100px;">${produto.descricao}</textarea>
                </div>

                <div class="form-group" style="margin-bottom: 15px;">
                    <label>Imagem:</label>
                    <input type="file" id="edt_imagem" accept="image/*" style="width: 100%; padding: 8px; margin-top: 5px;">
                    <p style="font-size: 12px; color: #666; margin-top: 5px;">Deixe em branco para manter a imagem atual</p>
                </div>

                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                    <button type="button" id="btnCancelarEditar" style="padding: 10px 20px; background: #ccc; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
                    <button type="button" id="btnSalvarEditar" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Salvar Alterações</button>
                </div>
            </form>
        </div>
    `

    document.body.appendChild(modal)

    document.getElementById('btnCancelarEditar').addEventListener('click', () => {
        modal.remove()
    })

    document.getElementById('btnSalvarEditar').addEventListener('click', async () => {
        const produtoAtualizado = {
            nome: document.getElementById('edt_nome').value,
            categoria: document.getElementById('edt_categoria').value,
            preco: Number(document.getElementById('edt_preco').value),
            estado: document.getElementById('edt_estado').value === 'true',
            descricao: document.getElementById('edt_descricao').value
        }

        const fileInput = document.getElementById('edt_imagem')
        
        try {
            const formData = new FormData()
            Object.entries(produtoAtualizado).forEach(([key, value]) => formData.append(key, value))
            
            if (fileInput.files[0]) {
                formData.append('imagem', fileInput.files[0])
            }

            const resposta = await editarProduto(produto.id, formData)
            console.log('Produto atualizado:', resposta)
            alert('Produto atualizado com sucesso!')
            modal.remove()
            location.reload()
        } catch (erro) {
            console.error(erro)
            alert('Erro ao atualizar produto: ' + erro.message)
        }
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove()
        }
    })
}

// Função para eliminar produto
async function eliminarProdutoAPI(produtoId, produtoNome) {
    try {
        await eliminarProduto(produtoId)
        console.log('Produto eliminado:', produtoNome)
        alert('Produto eliminado com sucesso!')
        location.reload()
    } catch (erro) {
        console.error(erro)
        alert('Erro ao eliminar produto: ' + erro.message)
    }
}


function renderizar(page){
    switch(page){

        case 'cadastrar':
            return  `
            <div class="sidebar-card">
            <h3>Registo de Nova Entrada</h3>
            <div id="mensagemFormulario"></div>

            <form id="formCadastrar">
            <div class="form-group">
            <input id="inome" required type="text" placeholder="Nome do produto">
            <select required name="categoria" id="icategoria" class="select-categoria">
                <option value="">Selecione uma categoria</option>
                <option value="Frutas">Frutas</option>
                <option value="Hortaliças">Hortaliças</option>
                <option value="Legumes">Legumes</option>
                <option value="Tubérculos e Raízes">Tubérculos e Raízes</option>
                <option value="Cereais e Grãos">Cereais e Grãos</option>
                <option value="Leguminosas">Leguminosas</option>
                <option value="Temperos e Condimentos">Temperos e Condimentos</option>
                <option value="Oleaginosas">Oleaginosas</option>
                <option value="Produtos Processados do Campo ">Produtos Processados do Campo </option>
                <option value="Produtos Orgânicos">Produtos Orgânicos</option>
            </select>
            </div>


            <div class="form-group">
            <input required id="ipreco" type="number" min="0" placeholder="Preço em Kwanza">

            <select id="iunidade">
                <option value="KG">Kg</option>
                <option value="G">Gramas</option>
                <option value="UN">Unidade</option>
                <option value="CX">Caixa</option>
                <option value="SACO">Saco</option>
                <option value="LITRO">Litro</option>
            </select>

            
            
            </div>

            <div class="form-group">
            <input required type="file" name="produto-image" id="iproduto-image" placeholder="Insira a imagem">
            <select required id="iestado" name="estado">
            <option >Estado do produto</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
            </select>
            </div>
            
            <div class="form-group">
            
            <textarea name="descricao" id="idescricao" placeholder="Descrição do produto"></textarea>
            </div>
            

            <button type="button" class="btn-submit" id="submitCadastro"
>Adicionar Produto</button>
            </form>
            </div>
            `
        case 'stock':
            container.classList.add('product-grid')
        return produtos.map(el => `
        <div class="product-card">
                    <img src="http://localhost:8080${el.imagemUrl}">
                    <div class="product-info">
                        <h3>${el.nome}</h3>
                        <p class="price">${el.preco} Kz / ${el.unidade}</p>
                        <button class="btn-publicar" data-titulo="${el.nome}" data-preco="${el.preco}" >Publicar</button>
                        <button class="btn-editar" data-id="${el.id}" data-titulo="${el.nome}" data-preco="${el.preco}" >Editar</button>
                        <button class="btn-eliminar" data-id="${el.id}" data-titulo="${el.nome}" data-preco="${el.preco}" >Eliminar</button>

                    </div>
        </div>
`).join('')
    
        case 'produtosPublicados':
            container.classList.add('product-grid')
            return "<h2>Page tubercule em construção...</h2>"
            
        case 'produtosporPublicar':
            container.classList.add('product-grid')
            return "<h2>Page horticulas em construção...</h2>"
        
        default:
            return '<h2>Nada encontrado</h2>'
    }

}






