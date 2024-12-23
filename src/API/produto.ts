import axios from "axios"
import { ProdutoFormCreate } from "../types/produtoTypes"
import { Produto } from "../types/produtoTypes"
const apiURL = import.meta.env.VITE_API_URL


export const postProduto = (novoProduto:ProdutoFormCreate) => {
    try {
        axios.post(`${apiURL}/product`, novoProduto)
        return novoProduto;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const getProdutoPaginado = async (page: number) => {
    try {
        const resposta = await axios.get(`${apiURL}/product/${page}&10`)
         
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const getProdutoById = async (id: string) => {
    try {
        const resposta = await axios.get(`${apiURL}/product/${id}`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateProduto = async (id: string, data: Produto ) => {
    try {
        await axios.put(`${apiURL}/product/${id}`, data);
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduto = async (id: string) => {
    try {
        await axios.delete(`${apiURL}/product/${id}`);
    } catch (error) {
        console.log(error)
    }
}