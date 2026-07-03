const API_URL = 'http://localhost:8080'

async function api(path, options = {}) {
    const url = `${API_URL}${path}`
    const { headers = {}, body, ...rest } = options

    const config = {
        headers: {
            ...headers
        },
        ...rest
    }

    if (body instanceof FormData) {
        config.body = body
        // let the browser set the multipart boundary header automatically
    } else if (body !== undefined && typeof body !== 'string' && !(body instanceof URLSearchParams)) {
        config.headers['Content-type'] = config.headers['Content-type'] || 'application/json'
        config.body = JSON.stringify(body)
    } else {
        config.body = body
    }

    const res = await fetch(url, config)

    if (!res.ok) {
        const erro = await res.json().catch(() => ({}))
        throw new Error(erro.message || `Erro ${res.status}`)
    }

    return res.status === 204 ? null : await res.json()
}

//GET - BUSCAR TUDO
export const getProdutos = () => api('/produtos')

//GET - BUSCAR 1 PRODUTO
export const getProduto = (id) => api(`/produtos/${id}`)

//POST - CRIAR PRODUTO
export const criarProduto = (dados) => api('/produtos', {
     method: 'POST',
    body: dados
})

//PUT - EDITAR PRODUTO
export const editarProduto = (id, dados) =>
    api(`/produtos/${id}`, {
        method: 'PUT',
        body: dados
    })

//DELETE - ELIMINAR
export const eliminarProduto = (id) => api(`/produtos/${id}`, {
    method: 'DELETE'
})


//GET - BUSCAR PEDIDOS
export const getPedidos = () => api('/pedidos/todos')

//PEDIDOS
export const criarPedido = (dados) =>
    api('/pedidos', {
        method: 'POST',
        body: dados
    })

export default api