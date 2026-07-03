//FUNÇÃO PARA RENDERIZAR O CONTEÚDO NA PAGE PEDIDOS

document.addEventListener("DOMContentLoaded", carregarPedidos);
let listaPedidos = [];

async function carregarPedidos(){

    try{

        const response = await fetch(
            "http://localhost:8080/pedidos/todos"
        );

        const pedidos = await response.json();

        listaPedidos = pedidos;
        
        renderizarPedidos(listaPedidos);

        preencherCards(listaPedidos);

    }catch(e){

        console.log(e);

    }

}

function renderizarPedidos(lista){

    const tbody = document.getElementById("tbodyPedidos");

    tbody.innerHTML = "";

    lista.forEach(pedido=>{

        tbody.innerHTML += criarLinhaPedido(pedido);

   

    });

}

//função dos cards
function preencherCards(lista){

    document.getElementById("totalPedidos").textContent = lista.length;

    document.getElementById("pedidosPendentes").textContent =
        lista.filter(p => p.status === "PENDENTE").length;

    document.getElementById("pedidosProcessando").textContent =
        lista.filter(p => p.status === "PROCESSANDO").length;

    document.getElementById("pedidosEntregues").textContent =
        lista.filter(p => p.status === "ENTREGUE").length;

    document.getElementById("pedidosCancelados").textContent =
        lista.filter(p => p.status === "CANCELADO").length;

    const total = lista.reduce(
        (soma, pedido) => soma + pedido.total,
        0
    );

    document.getElementById("valorTotal").textContent =
        total.toLocaleString() + " Kz";

}






function criarLinhaPedido(pedido){

    return `

        <tr>

            <td>${pedido.id}</td>

            <td>${pedido.cliente}</td>

            <td>${pedido.telefone}</td>

            <td>${pedido.dataPedido}</td>

            <td>${pedido.dataEntrega}</td>

            <td>${pedido.itensPedido.reduce(
    (total, item) => total + item.quantidade,
    0)}</td>

            <td>${pedido.total} Kz</td>
            <td>  ${criarStatus(pedido)} </td>

            

            <td>

                ${criarAcoes(pedido)}
                
                ${criarBotaoCancelar(pedido)}
            
            </td>

        </tr>

    `;

}

function criarStatus(pedido){

    switch(pedido.status){

        case "PENDENTE":

            return `

                <button
                    class="status pendente"
                    onclick="alterarStatus(${pedido.id},'PROCESSANDO')">

                    Processar

                </button>

            `;

        case "PROCESSANDO":

            return `

                <button
                    class="status processando"
                    onclick="alterarStatus(${pedido.id},'ENTREGUE')">

                    Entregar

                </button>

            `;

        case "ENTREGUE":

            return `

                <span class="status entregue">

                    Entregue

                </span>

            `;

        case "CANCELADO":

            return `

                <span class="status cancelado">

                    Cancelado

                </span>

            `;

    }

}

async function alterarStatus(id, status){

    if(!confirm(`Deseja alterar o status para ${status}?`))
        return;

    try{

        const response = await fetch(

            `http://localhost:8080/pedidos/${id}/status`,

            {

                method:"PATCH",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    status:status

                })

            }

        );

        if(!response.ok){

            throw new Error("Erro ao atualizar o pedido.");

        }

        carregarPedidos();

    }

    catch(e){

        alert(e.message);

    }

}

function criarBotaoCancelar(pedido){

    if(
        pedido.status==="PENDENTE" ||
        pedido.status==="PROCESSANDO"
    ){

        return `

           
        `;

    }

    return "";

}


//AÇÕES DE CADA PEDIDO

function criarAcoes(pedido){

    switch(pedido.status){

        case "PENDENTE":

            return `

                <div class="acoes">

                    <button
                        class="btnVer"
                        onclick="verPedido(${pedido.id})">

                         👁
                    </button>

                    <button
                        class="btnProcessar"
                        onclick="alterarStatus(${pedido.id}, 'PROCESSANDO')">

                        ▶
                    </button>

                    <button
                        class="btnCancelar"
                        onclick="alterarStatus(${pedido.id}, 'CANCELADO')">

                        ✖
                    </button>

                </div>

            `;

        case "PROCESSANDO":

            return `

                <div class="acoes">

                    <button
                        class="btnVer"
                        onclick="verPedido(${pedido.id})">

                        👁
                    </button>

                    <button
                        class="btnEntregar"
                        onclick="alterarStatus(${pedido.id}, 'ENTREGUE')">

                        🚚
                    </button>

                    <button
                        class="btnCancelar"
                        onclick="alterarStatus(${pedido.id}, 'CANCELADO')">

                        ✖
                    </button>

                </div>

            `;

        case "ENTREGUE":

            return `

                <div class="acoes">

                    <button
                        class="btnVer"
                        onclick="verPedido(${pedido.id})">

                        👁
                    </button>

                </div>

            `;

        case "CANCELADO":

            return `

                <div class="acoes">

                    <button
                        class="btnVer"
                        onclick="verPedido(${pedido.id})">

                        👁
                    </button>

                </div>

            `;

    }

}

//VER PEDIDO


async function verPedido(id){

    const response = await fetch(

        `http://localhost:8080/pedidos/${id}`

    );

    const pedido = await response.json();

    preencherModal(pedido);

    document
        .getElementById("modalPedido")
        .classList.remove("oculto");

}

function preencherModal(pedido){

    mPedido.textContent = pedido.id;

    mCliente.textContent = pedido.cliente;

    mTelefone.textContent = pedido.telefone;

    mEndereco.textContent = pedido.endereco;

    mDataPedido.textContent = pedido.dataPedido;

    mDataEntrega.textContent = pedido.dataEntrega;

    mStatus.textContent = pedido.status;

    mValor.textContent =
        (pedido.total ?? 0).toLocaleString() + " Kz";

    listaProdutosPedido.innerHTML = "";

    pedido.itensPedido.forEach(item=>{

        listaProdutosPedido.innerHTML += `

            <tr>

                <td>${item.produtoNome}</td>

                <td>${item.quantidade}</td>

                <td>${item.precoUnitario} Kz</td>

                <td>${item.subtotal} Kz</td>

            </tr>

        `;

    });

}

modalPedido.addEventListener("click",(e)=>{

    if(e.target===modalPedido){

        modalPedido.classList.add("oculto");

    }

});


//FILTRO DE PEDIDOS
document
.getElementById("pesquisar")
.addEventListener("input", filtrarPedidos);

document
.getElementById("status")
.addEventListener("change", filtrarPedidos);

const inicio =
    document.getElementById("dataInicio").value;

const fim =
    document.getElementById("dataFim").value;

function filtrarPedidos(){

    const texto =
        pesquisar.value.toLowerCase();

    const status =
        document.getElementById("status").value;

    let filtrados = listaPedidos;

    if(texto){

        filtrados = filtrados.filter(p =>

            p.cliente.toLowerCase().includes(texto) ||

            p.telefone.includes(texto)

        );

    }

    if(status){

        filtrados = filtrados.filter(

            p => p.status === status

        );

    }

    renderizarPedidos(filtrados);

    preencherCards(filtrados);

}

//FUNÇÃO PARA EXPORTAR PEDIDOS PARA EXCEL e PDF
document
    .getElementById("btnExcel")
    .addEventListener("click", exportarExcel);

document
    .getElementById("btnPDF")
    .addEventListener("click", exportarPDF);

    function exportarExcel() {

    const dados = listaPedidos.map(pedido => {

        const quantidade = pedido.itensPedido.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        return {

            "Pedido": pedido.id,
            "Cliente": pedido.cliente,
            "Telefone": pedido.telefone,
            "Endereço": pedido.endereco,
            "Data Pedido": pedido.dataPedido,
            "Data Entrega": pedido.dataEntrega,
            "Status": pedido.status,
            "Itens": quantidade,
            "Total (Kz)": pedido.total

        };

    });

    const ws = XLSX.utils.json_to_sheet(dados);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Pedidos"
    );

    XLSX.writeFile(
        wb,
        "Relatorio_Pedidos.xlsx"
    );

}


async function exportarPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.setFillColor(26,127,55);
    doc.rect(0,0,210,30,"F");

    //IMAGEM DO LOGO
    

    //TEXTO DO PDF
    doc.setTextColor(255);

    doc.setFontSize(22);

    doc.text("BILANGA SMART",40,15);

    doc.setFontSize(10);

    doc.text("Sistema de Gestão Comercial",40,22);


    //DATA DE EMISSÃO DO PDF
    
const hoje = new Date();

doc.setTextColor(80);

doc.setFontSize(10);

doc.text(

"Emitido em: " +

hoje.toLocaleString(),

15,

40

);


// ==========================
    // Calcula os indicadores
    // ==========================

    const pendentes = listaPedidos.filter(p => p.status === "PENDENTE").length;

    const processando = listaPedidos.filter(p => p.status === "PROCESSANDO").length;

    const entregues = listaPedidos.filter(p => p.status === "ENTREGUE").length;

    const cancelados = listaPedidos.filter(p => p.status === "CANCELADO").length;

    const valorTotal = listaPedidos.reduce(
        (total, pedido) => total + (pedido.total || 0),
        0
    );

    // ==========================
    // Função para desenhar cards
    // ==========================

    function card(x, y, titulo, valor) {

        doc.setFillColor(245,245,245);

        doc.roundedRect(x, y, 42, 22, 3, 3, "F");

        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(titulo, x + 3, y + 7);

        doc.setFontSize(16);
        doc.setTextColor(26,127,55);
        doc.text(String(valor), x + 3, y + 17);
    }

    // ==========================
    // Desenha os cards
    // ==========================

    card(15,50,"Pedidos",listaPedidos.length);

    card(62,50,"Pendentes",pendentes);

    card(109,50,"Processando",processando);

    card(156,50,"Entregues",entregues);

    card(15,77,"Cancelados",cancelados);

    card(62,77,"Valor Total",valorTotal.toLocaleString() + " Kz");
    card(

15,

77,

"Valor Total",

valorTotal.toLocaleString()+" Kz"

);

doc.setDrawColor(210);

doc.line(

15,

105,

195,

105

);

    const tabela = listaPedidos.map(pedido => {

        const quantidade = pedido.itensPedido.reduce(
            (total, item) => total + item.quantidade,
            0
        );

        return [

            pedido.id,

            pedido.cliente,

            quantidade,

            pedido.status,

            pedido.total.toLocaleString() + " Kz"

        ];

    });

    doc.autoTable({

        startY:45,

        head:[

            [

                "Pedido",

                "Cliente",

                "Itens",

                "Status",

                "Total"

            ]

        ],

        body:tabela,

        styles:{

            fontSize:10

        },

        headStyles:{

            fillColor:[26,127,55],
            textColor:255,

            fontStyle:"bold"

        },
        alternateRowStyles:{

    fillColor:[247,247,247]

}

    });

    const paginas = doc.internal.getNumberOfPages();

for(let i=1;i<=paginas;i++){

    doc.setPage(i);

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(

        "Bilanga Smart",

        15,

        290

    );

    doc.text(

        "Página "+i+" de "+paginas,

        165,

        290

    );

}

    doc.save("Relatorio_Pedidos.pdf");

}

