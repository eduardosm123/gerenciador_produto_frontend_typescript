import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getCategoria } from "../API/categoria"
import { getProdutoById, updateProduto } from "../API/produto"


import {
    setProductToUpdate, clearProductToUpdate
} from "../redux/reducer/produtoSlice"

import { definirLista } from "../redux/reducer/categoriaSlice"

import { FormEvent } from 'react';
import ButtonAplicar from "../components/ButtonAplicar"

export default function UpdateProdutos() {

    const data = useSelector((state: RootState) => state.produto.produtoForm.update)
    const dispatch = useDispatch()
    const categorias = useSelector((state: RootState) => state.categoria.categoriasList.lista)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || typeof id != 'string') {
            navigate("/categoria")
        }
    }, [id, navigate])

    useEffect(() => {
        async function getProdutoByIdLocal() {
            try {
                if (id) {
                    const res = await getProdutoById(id);
                    console.log(res)
                    if (res && typeof res === 'object' && 'data' in res) {
                        dispatch(setProductToUpdate(res.data))

                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProdutoByIdLocal()
    }, [id, dispatch])

    useEffect(() => {
        async function getCategoriaLocal() {
            try {
                const res = await getCategoria()

                if (res && typeof res === 'object' && 'data' in res && data) {
                    dispatch(definirLista(res.data))

                }
            } catch (error) {
                console.log(error)
            }
        }
        getCategoriaLocal()
    }, [dispatch])

    const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        async function updateProdutoLocal() {
            try {
                const formData = new FormData();
                formData.append("name", data.name)
                formData.append("price", data.price.toString())
                formData.append("description", data.description)
                formData.append("categoryId", data.categoryId._id)
                formData.append('image', data.imageFile)
                await updateProduto(id as string, formData)

            } catch (error) {
                console.log(error)
            }
        }
        updateProdutoLocal()
        navigate("/produtos")
    }
    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(clearProductToUpdate())
        navigate("/produtos")
    }

    if (!data || !data.categoryId || !categorias || !data.categoryId._id) {
        return <div> Carregando ... </div>
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Editar Produto</h1>
                <form onSubmit={handleUpdate} >
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome do Produtos:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da Produtos"
                            value={data.name}
                            onChange={e => dispatch(setProductToUpdate({ name: e.target.value }))} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="price">Preço do Produtos:</label>
                        <input type="number"
                            name="price"
                            className="form-control"
                            placeholder="Digite o preço"
                            value={data.price}
                            onChange={e => dispatch(setProductToUpdate({ price: e.target.value }))} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="description">Descrição do Produtos:</label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            placeholder="Digite a descrição do produto"
                            value={data.description}
                            onChange={e => dispatch(setProductToUpdate({ description: e.target.value }))} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="category">Categoria do Produto:</label>
                        <select
                            name="category"
                            className="form-control"
                            value={data.categoryId._id}
                            onChange={e => dispatch(setProductToUpdate({ categoryId: { _id: e.target.value } }))}>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria._id}>{categoria.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="formFile" className="form-label">Upload File</label>
                        <input className="form-control" type="file" id="formFile" onChange={e => {
                            const files = e.target.files;

                            if (files && files[0]) {
                                dispatch(setProductToUpdate({ imageFile: files[0] }))
                                dispatch(setProductToUpdate({ image: files[0].name }))
                            }
                        }} />
                        <small className="text-muted mt-2">{data.image}</small>
                    </div> 

                    <div className='row'>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1"> <ButtonAplicar msg="Editar" /></div>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1">
                            <button onClick={voltar} className="btn btn-primary w-100">Voltar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}