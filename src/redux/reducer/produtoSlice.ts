import { createSlice } from "@reduxjs/toolkit";
import { Produto, ProdutoForm, ProdutoLista, ProdutoFormCreate, ListaDeProdutos } from "../../types/produtoTypes.ts";

interface IProduto {
    listaDeProdutos: ListaDeProdutos,
    produtoForm: ProdutoForm
}

const initialState: IProduto = {
    produtoForm: {
        create: {} as ProdutoFormCreate,
        updateAndRead: {} as Produto
    },
    listaDeProdutos: {
        lista: [] as ProdutoLista[],
        pages: 1,
        totalpages: 1
    }
}

export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        // cadastro de produtos
        definirProdutoFormCreate_name: (state, { payload }) => {
            state.produtoForm.create.name = payload
        },
        definirProdutoFormCreate_price: (state, { payload }) => {
            state.produtoForm.create.price = payload
        },
        definirProdutoFormCreate_description: (state, { payload }) => {
            state.produtoForm.create.description = payload
        },
        definirProdutoFormCreate_categoryId: (state, { payload }) => {
            state.produtoForm.create.categoryId = payload
        },
        limparProdutoFormCreate: (state) => {
            state.produtoForm.create.name = ''
            state.produtoForm.create.categoryId = ''
            state.produtoForm.create.description = ''
            state.produtoForm.create.price = 0
        },
        // atualizar e ler produtos
        definirUpdateAndRead_id: (state, { payload }) => {
            state.produtoForm.updateAndRead._id = payload
        },
        definirUpdateAndRead_name: (state, { payload }) => {
            state.produtoForm.updateAndRead.name = payload
        },
        definirUpdateAndRead_price: (state, { payload }) => {
            state.produtoForm.updateAndRead.price = payload
        },
        definirUpdateAndRead_description: (state, { payload }) => {
            state.produtoForm.updateAndRead.description = payload
        },
        definirUpdateAndRead_categoryId: (state, { payload }) => {
            state.produtoForm.updateAndRead.categoryId = payload
        },
        definirUpdateAndRead_createdAt: (state, { payload }) => {
            state.produtoForm.updateAndRead.createdAt = payload
        },
        definirUpdateAndRead_updatedAt: (state, { payload }) => {
            state.produtoForm.updateAndRead.updatedAt = payload
        },
        limparUpdateAndRead: (state) => { 
            state.produtoForm.updateAndRead._id = ''
            state.produtoForm.updateAndRead.categoryId = ''
            state.produtoForm.updateAndRead.createdAt = ''
            state.produtoForm.updateAndRead.description = ''
            state.produtoForm.updateAndRead.name = ''
            state.produtoForm.updateAndRead.price = 0
            state.produtoForm.updateAndRead.updatedAt = ''    
        },
        // lista de produtos
        definirListaDeProdutos_lista: (state, { payload }) => {
            state.listaDeProdutos.lista = payload
        },
        definirListaDeProdutos_pages: (state, { payload }) => {
            state.listaDeProdutos.pages = payload
        },
        definirListaDeProdutos_totalpages: (state, { payload }) => {
            state.listaDeProdutos.totalpages = payload
        },
        limparListaProdutos: (state) => { 
            state.listaDeProdutos.lista = []
            state.listaDeProdutos.pages = 1
            state.listaDeProdutos.totalpages = 1
        },
    }
})

export const { limparListaProdutos, definirProdutoFormCreate_name,
    definirProdutoFormCreate_price,
    definirProdutoFormCreate_description,
    definirProdutoFormCreate_categoryId,
    limparProdutoFormCreate,
    definirUpdateAndRead_id,
    definirUpdateAndRead_name,
    definirUpdateAndRead_price,
    definirUpdateAndRead_description,
    definirUpdateAndRead_categoryId,
    definirUpdateAndRead_createdAt,
    definirUpdateAndRead_updatedAt,
    limparUpdateAndRead,
    definirListaDeProdutos_lista,
    definirListaDeProdutos_pages,
    definirListaDeProdutos_totalpages } = produtoSlice.actions