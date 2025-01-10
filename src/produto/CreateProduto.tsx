import { clearProductToSend, setProductToSend } from "../redux/reducer/produtoSlice"
import { FormEvent } from 'react';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postProduto } from "../API/produto";
import { getCategoria } from "../API/categoria";
import { RootState } from "../redux/store";
import { definirLista, limparListaCategoria } from "../redux/reducer/categoriaSlice";
import ButtonAplicar from "../components/ButtonAplicar";


export default function CreateProduto() {

    const values = useSelector((state: RootState) => state.produto.produtoForm.send)
    const categorias = useSelector((state: RootState) => state.categoria.categoriasList.lista)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function getCategoryLocal() {
            try {
                const res: any = await getCategoria()
                dispatch(definirLista(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        getCategoryLocal()
    }, []);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", values.name)
            console.log(values)
            formData.append("price", values.price.toString())
            formData.append("description", values.description)
            formData.append("categoryId", values.categoryId)
            formData.append('image', values.imageFile)
            postProduto(formData)
            dispatch(limparListaCategoria())
            dispatch(clearProductToSend())
            navigate("/produtos")
        } catch (error) {
            console.log(error)
        }
    }

    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(clearProductToSend())
        navigate("/produtos")
    }
    return (<div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h1>Adicionar Produtos</h1>
            <form onSubmit={handleSubmit}  >
                <div className="mb-2 d-flex flex-column">
                    <label htmlFor="name">Nome do Produtos:</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        placeholder="Digite o nome da Produtos"
                        value={values.name}
                        onChange={e => dispatch(setProductToSend({ name: e.target.value }))} />
                </div>
                <div className="mb-2 d-flex flex-column">
                    <label htmlFor="price">Preço do Produtos:</label>
                    <input type="number"
                        name="price"
                        className="form-control"
                        placeholder="Digite o preço"
                        value={values.price}
                        onChange={e => dispatch(setProductToSend({ price: e.target.value }))} />
                </div>
                <div className="mb-2 d-flex flex-column">
                    <label htmlFor="description">Descrição do Produtos:</label>
                    <input type="text"
                        name="description"
                        className="form-control"
                        placeholder="Digite a descrição do produto"
                        value={values.description}
                        onChange={e => dispatch(setProductToSend({ description: e.target.value }))} />
                </div>
                <div className="mb-2 d-flex flex-column">
                    <label htmlFor="category">Categoria do Produto:</label>
                    <select
                        name="category"
                        className="form-control"
                        value={values.categoryId}
                        onChange={e => dispatch(setProductToSend({ categoryId: e.target.value }))}>
                        <option value={""}>Escolha a categoria</option>
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
                            dispatch(setProductToSend({ imageFile: files[0] }))
                            dispatch(setProductToSend({ image: files[0].name }))
                        }
                    }} />
                    <small className="text-muted mt-2">{values.image}</small>
                </div>
                <div className='row'>
                    <div className="col-md-5 col-lg-3 col-sm-5 m-1"> <ButtonAplicar msg="Cadastrar" /></div>
                    <div className="col-md-5 col-lg-3 col-sm-5 m-1">
                        <button onClick={voltar} className="btn btn-primary w-100">Voltar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>)
}