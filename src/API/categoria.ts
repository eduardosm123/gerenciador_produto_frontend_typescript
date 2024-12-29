import axios from "axios";
import { Categoria } from "../types/categoriaTypes";
const apiURL = import.meta.env.VITE_API_URL


export const postCategoria = (novaCategoria: { name: string }) => {
    try {
        axios.post(`${apiURL}/category`, novaCategoria)
        return novaCategoria;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const getCategoriaPaginada = async (page: number) => {
    try {
        const resposta = await axios.get(`${apiURL}/category/${page}&10`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getCategoria = async () => {
    try {
        const resposta = await axios.get(`${apiURL}/category`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getCategoriaById = async (id: string) => {
    try {
        const resposta = await axios.get(`${apiURL}/category/${id}`)
        return resposta;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const deleteCategoria = async (id: string) => {
    try {
        const resposta = await axios.delete(`${apiURL}/category/${id}`);
        return resposta
    } catch (error) {
        console.log(error)
    }
}


export const updateCategory = async (id: string, data: Categoria) => {
    try {
        await axios.put(`${apiURL}/category/${id}`, data);
    } catch (error) {
        console.log(error)
    }
}