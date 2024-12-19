import { createSlice } from "@reduxjs/toolkit";
import { Categoria, CategoriaForm, CategoriaList } from "../../types/categoriaTypes.ts";


interface ICategoria {
    categoriasList: CategoriaList,
    categoriaForm: CategoriaForm
}

const initialState: ICategoria = {
    categoriasList: {
        lista: [] as Categoria[],
        pages: 1,
        totalPages: 1
    },
    categoriaForm: {
        create: {
            name: ''
        },
        updateAndRead: {} as Categoria
    }

}

export const categoriaSlice = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        definirLista: (state, { payload }) => {
            state.categoriasList.lista = payload
        },
        definirTotalPage: (state, { payload }) => {
            state.categoriasList.totalPages = payload
        },
        definirPage: (state, { payload }) => {
            state.categoriasList.pages = payload
        },
        definirCategoriaFormCreate: (state, { payload }) => {
            state.categoriaForm.create = payload
        },
        definirCategoriaFormUpdateAndReadInicial: (state, { payload }) => {
            state.categoriaForm.updateAndRead = payload
        },
        definirCategoriaFormUpdateAndReadName: (state, { payload }) => {
            state.categoriaForm.updateAndRead.name = payload
        },        
        limparLista: (state) => {
            state.categoriasList.lista = initialState.categoriasList.lista;
        },
        limparFormularioCreate: (state) => {
            state.categoriaForm.create = initialState.categoriaForm.create;
        },
        limparFormularioUpdateAndRead: (state) => {
            state.categoriaForm.updateAndRead = initialState.categoriaForm.updateAndRead;
        }
    }
})

export const { definirLista, 
    limparLista, limparFormularioCreate, 
    limparFormularioUpdateAndRead, definirTotalPage, 
    definirPage, definirCategoriaFormCreate, 
    definirCategoriaFormUpdateAndReadInicial, 
    definirCategoriaFormUpdateAndReadName } = categoriaSlice.actions