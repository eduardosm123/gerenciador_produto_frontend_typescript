import axios from "axios" 
export const apiURL = import.meta.env.VITE_API_URL
export const apiImage = import.meta.env.VITE_API_IMAGE

export const postProduto = (novoProduto: FormData) => {
    try {
        axios.post(`${apiURL}/product`, novoProduto, {
            headers: {
                'Content-Type': 'multipart/form-data', // Importante para envio de arquivos
            },
        })
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

export const updateProduto = async (id: string, formdata: FormData) => {
    try {
        await axios.put(`${apiURL}/product/${id}`, formdata,  {
            headers: {
                 'Content-Type': 'multipart/form-data'
            }
        });
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