import { createSlice } from "@reduxjs/toolkit";
import { ProductToReceive, ProductList, ProductToSend, ProductToUpdate } from "../../types/produtoTypes.ts";

interface IProduto {
    productList: ProductList,
    produtoForm: {
        receive: ProductToReceive,
        send: ProductToSend,
        update: ProductToUpdate
    }
}

const initialState: IProduto = {
    produtoForm: {
        receive: {} as ProductToReceive,
        update: {} as ProductToUpdate,
        send: {} as ProductToSend
    },
    productList: {
        list: [] as ProductToReceive[],
        pages: 1,
        totalpages: 1
    }
}

export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        setProductList: (state, { payload }) => {
            state.productList = { ...state.productList, ...payload }
        },
        setProductToReceive: (state, { payload }) => {
            state.produtoForm.receive = { ...state.produtoForm.receive, ...payload }
        },
        setProductToUpdate: (state, { payload }) => {
            state.produtoForm.update = { ...state.produtoForm.update, ...payload }
        },
        setProductToSend: (state, { payload }) => {
            state.produtoForm.send = { ...state.produtoForm.send, ...payload }
        },
        clearProductToReceive: (state) => {
            state.produtoForm.receive = {} as ProductToReceive
        },
        clearProductToSend: (state) => {
            state.produtoForm.send = {} as ProductToSend
        },
        clearProductToUpdate: (state) => {
            state.produtoForm.update = {} as ProductToUpdate
        },
        clearProductList: (state) => {
            state.productList.list = [] as ProductToReceive[],
            state.productList.pages = 1,
            state.productList.totalpages = 1
        },
    }
})

export const { setProductList, clearProductList, clearProductToReceive, clearProductToSend, clearProductToUpdate, setProductToReceive, setProductToSend, setProductToUpdate } = produtoSlice.actions