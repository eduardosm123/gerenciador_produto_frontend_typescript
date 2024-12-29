import { createSlice } from "@reduxjs/toolkit";
import { Categoria, CategoriaForm, CategoriaList } from "../../types/categoriaTypes.ts";


interface ICategoria {
    categoriasList: CategoriaList,
    categoriaForm: CategoriaForm,
    categoriaProduto: Categoria
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
    },
    categoriaProduto: {} as Categoria
    
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
            state.categoriaForm.create.name = payload
        },
        definirCategoriaFormUpdateAndReadInicial: (state, { payload }) => {
            state.categoriaForm.updateAndRead = payload
        },
        definirCategoriaProduto: (state, { payload }) => {
            state.categoriaProduto = payload
        },
        definirCategoriaFormUpdateAndReadName: (state, { payload }) => {
            state.categoriaForm.updateAndRead.name = payload
        },        
        limparListaCategoria: (state) => {
            state.categoriasList.lista = [];
            state.categoriasList.pages = 1;
            state.categoriasList.totalPages = 1;
        },
        limparFormularioCreate: (state) => { 
            state.categoriaForm.create.name = ''
        },
        limparFormularioUpdateAndRead: (state) => { 
            state.categoriaForm.updateAndRead.__v = ''
            state.categoriaForm.updateAndRead.name = ''
            state.categoriaForm.updateAndRead.createdAt = ''
            state.categoriaForm.updateAndRead.updatedAt = ''
        }
    }
})

export const { definirLista, 
    limparListaCategoria, limparFormularioCreate, 
    limparFormularioUpdateAndRead, definirTotalPage, 
    definirPage, definirCategoriaFormCreate, 
    definirCategoriaFormUpdateAndReadInicial, 
    definirCategoriaProduto,
    definirCategoriaFormUpdateAndReadName } = categoriaSlice.actions