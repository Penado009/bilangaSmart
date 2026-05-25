const API_URL = 'http://localhost:8080/api'

async function api(path, options = {}) {
    const url = `${API_URL}${path}`

    const config = {
        headers: {
            'Content-type': 'application/json',
            ...options.headers
        },
        ...options
    }
    
        const res =await fetch(url, config)

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
    body: JSON.stringify(dados)
})

//PUT - EDITAR PRODUTO
export const editarProduto = (id, dados) => api(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
})

//DELETE - ELIMINAR
export const eliminarProduto = (id) => api(`/produtos/${id}`, {
    method: 'DELETE'
})

export default api