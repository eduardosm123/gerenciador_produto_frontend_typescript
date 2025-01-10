import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProdutoById } from "../API/produto";
import { setProductToReceive, clearProductToReceive } from "../redux/reducer/produtoSlice";
import ButtonEdit from "../components/ButtonEdit";
import { apiImage } from "../API/produto";

export default function ReadProduto() {

    const data = useSelector((state: RootState) => state.produto.produtoForm.receive)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();

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
                        dispatch(setProductToReceive(res.data))
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProdutoByIdLocal()
    }, [])


    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(clearProductToReceive())
        navigate("/produtos")
    }
    return id && typeof id === 'string' && data ? (<div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h3>Detalhe do Produto</h3>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>ID: {data._id}</strong>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <img src={`${apiImage}/${data.image}`} alt="imagem do produto" className="img-fluid w-25 w-sm-25 w-md-50 w-lg-75"/>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>Nome: {data.name}</strong>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>Preço: {data.price}</strong>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>Descrição: {data.description}</strong>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                {data.categoryId ? <strong>Categoria: {data.categoryId.name} </strong> : <strong> Sem categoria </strong>}
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>Data de criação: {data.createdAt}</strong>
            </div>
            <div className="mb-2" style={{ wordWrap: 'break-word' }}>
                <strong>Data de Atualização: {data.updatedAt}</strong>
            </div> 
            
            <div className='row'>
                    <div className="col-md-5 col-lg-3 col-sm-5 m-1">  <ButtonEdit id={id} link="/produtos/update" className="btn btn-success w-100"/></div>
                    <div className="col-md-5 col-lg-3 col-sm-5 m-1">
                        <button onClick={voltar} className="btn btn-primary w-100">Voltar</button>
                    </div>
                </div>
        </div>
    </div>) : <div></div>;
}

