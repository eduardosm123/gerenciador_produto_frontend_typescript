import { createSlice } from "@reduxjs/toolkit";
import {   ProdutoForm, ProdutoListaAndRead, ProdutoFormCreate, ListaDeProdutos } from "../../types/produtoTypes.ts";

interface IProduto {
    listaDeProdutos: ListaDeProdutos,
    produtoForm: ProdutoForm
}

const initialState: IProduto = {
    produtoForm: {
        create: {} as ProdutoFormCreate,
        update: {} as ProdutoListaAndRead,
        read: {} as ProdutoListaAndRead
    },
    listaDeProdutos: {
        lista: [] as ProdutoListaAndRead[],
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
            state.produtoForm.update._id = payload
        },
        definirUpdateAndRead_name: (state, { payload }) => {
            state.produtoForm.update.name = payload
        },
        definirUpdateAndRead_price: (state, { payload }) => {
            state.produtoForm.update.price = payload
        },
        definirUpdateAndRead_description: (state, { payload }) => {
            state.produtoForm.update.description = payload
        },
        definirUpdateAndRead_categoryId: (state, { payload }) => {
            state.produtoForm.update.categoryId._id = payload
        },
        definirUpdateAndRead_createdAt: (state, { payload }) => {
            state.produtoForm.update.createdAt = payload
        },
        definirUpdateAndRead_updatedAt: (state, { payload }) => {
            state.produtoForm.update.updatedAt = payload
        },
        definirProdutoFormUpdateInicial: (state, { payload }) => {
            state.produtoForm.update = payload
        },
        definirProdutoFormReadInicial: (state, { payload }) => {
            state.produtoForm.read = payload
        },
        limparUpdate: (state) => { 
            state.produtoForm.update._id = ''
            state.produtoForm.update.updatedAt = ''
            state.produtoForm.update.createdAt = ''
            state.produtoForm.update.description = ''
            state.produtoForm.update.name = ''
            state.produtoForm.update.price = 0
            state.produtoForm.update.updatedAt = '' 
            state.produtoForm.update.categoryId._id = ''
            state.produtoForm.update.categoryId.name = ''   
        },
        limparRead: (state) => { 
           state.produtoForm.read.categoryId._id = ''
           state.produtoForm.read.categoryId.name = ''
           state.produtoForm.read.description = ''
           state.produtoForm.read.price = 0
           state.produtoForm.read.name = ''   
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
    limparUpdate,
    limparRead,
    definirListaDeProdutos_lista,
    definirListaDeProdutos_pages,
    definirProdutoFormUpdateInicial,
    definirProdutoFormReadInicial,
    definirListaDeProdutos_totalpages } = produtoSlice.actions