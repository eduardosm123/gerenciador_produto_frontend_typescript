import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getCategoria } from "../API/categoria"
import { getProdutoById, updateProduto } from "../API/produto"
import { definirProdutoFormUpdateInicial, definirUpdateAndRead_categoryId, definirUpdateAndRead_description, definirUpdateAndRead_name, definirUpdateAndRead_price, limparUpdate } from "../redux/reducer/produtoSlice"
import { definirLista } from "../redux/reducer/categoriaSlice"

import { FormEvent } from 'react';
import { Produto } from "../types/produtoTypes" 

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
                     
                    if (res && typeof res === 'object' && 'data' in res) {
                        dispatch(definirProdutoFormUpdateInicial(res.data))

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

        async function atualizarProduto() {
            try {
                await updateProduto(id as string, {
                    _id: data._id,
                    categoryId: data.categoryId._id,
                    createdAt: data.createdAt,
                    description: data.description,
                    name: data.name,
                    price: data.price,
                    updatedAt: data.updatedAt
                } as Produto)

            } catch (error) {
                console.log(error)
            }
        }
        atualizarProduto()
        navigate("/produtos")
    }
    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(limparUpdate())
        navigate("/produtos")
    }

    if (!data || !data.categoryId || !categorias || !data.categoryId._id) {
        return <div> Carregando ... </div>
    }

    return  (
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
                                onChange={e => dispatch(definirUpdateAndRead_name(e.target.value))} />
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label htmlFor="price">Preço do Produtos:</label>
                            <input type="number"
                                name="price"
                                className="form-control"
                                placeholder="Digite o preço"
                                value={data.price}
                                onChange={e => dispatch(definirUpdateAndRead_price(e.target.value))} />
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label htmlFor="description">Descrição do Produtos:</label>
                            <input type="text"
                                name="description"
                                className="form-control"
                                placeholder="Digite a descrição do produto"
                                value={data.description}
                                onChange={e => dispatch(definirUpdateAndRead_description(e.target.value))} />
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label htmlFor="category">Categoria do Produto:</label>
                            <select
                                name="category"
                                className="form-control"
                                value={data.categoryId._id}
                                onChange={e => dispatch(definirUpdateAndRead_categoryId(e.target.value))}> 
                                {categorias.map((categoria, index) => (
                                    <option key={index} value={categoria._id}>{categoria.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-success">Aplicar</button>
                        <button onClick={voltar} className="btn btn-primary ms-3">Voltar</button>
                    </form>
                </div>
            </div>
        )  
}