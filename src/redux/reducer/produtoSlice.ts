import { createSlice } from "@reduxjs/toolkit";
import { Produto, ProdutoForm, ProdutoLista } from "../../types/produtoTypes.ts";

interface IProduto {
    produtosList: ProdutoLista,
    produtoForm: ProdutoForm
}

const initialState: IProduto = {
    produtosList: {
        lista: [] as Produto[],
        pages: 1,
        totalpages: 1
    },
    produtoForm: {} as ProdutoForm
}

export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        definirListaProdutos: (state, { payload }) => {
            state.produtosList.lista = payload
        },
        definirTotalPageProdutos: (state, { payload }) => {
            state.produtosList.totalpages = payload
        },
        definirPageProdutos: (state, { payload }) => {
            state.produtosList.pages = payload
        },
        definirProdutoFormCreate: (state, { payload }) => {
            /*
            const { campo, valor } = payload;
            state.produtoForm.create[campo] = valor;
            state.produtoForm.create[campo] = valor;
            */

        },
        limparFormularioCreateProduto: (state) => {
            state.produtoForm.create = initialState.produtoForm.create
        },
        definirCategoriaCreateProduto: (state, { payload }) => {
            state.produtoForm.create.category.name = payload;
        },
        definirProdutoFormUpdateAndReadInicial: (state, { payload }) => {
            state.produtoForm.updateAndRead = payload;
        },
        definirProdutoFormUpdateAndRead: (state, { payload }) => {
             /*
            const { campo, valor } = payload;
            state.produtoForm.updateAndRead[campo] = valor;
            */
        },
        definirCategoriaDoProdutorFormUpdateAndRead: (state, { payload }) => {
            state.produtoForm.updateAndRead.category.name = payload
        },
        limparFormularioDeProdutoUpdateAndRead: (state, { payload }) => {
            state.produtoForm.updateAndRead = initialState.produtoForm.updateAndRead
        }
    }
})

export const { definirListaProdutos,
    definirTotalPageProdutos,
    definirPageProdutos,
    definirProdutoFormCreate,
    limparFormularioCreateProduto,
    definirCategoriaCreateProduto,
    definirProdutoFormUpdateAndReadInicial,
    definirProdutoFormUpdateAndRead,
    definirCategoriaDoProdutorFormUpdateAndRead,
    limparFormularioDeProdutoUpdateAndRead } = produtoSlice.actions