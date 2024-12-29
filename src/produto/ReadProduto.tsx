import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProdutoById } from "../API/produto";
import { definirProdutoFormReadInicial, limparRead } from "../redux/reducer/produtoSlice";
import ButtonEdit from "../components/ButtonEdit";

export default function ReadProduto() {

    const data = useSelector((state: RootState) => state.produto.produtoForm.read)
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
                        dispatch(definirProdutoFormReadInicial(res.data))
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
        dispatch(limparRead())
        navigate("/produtos")
    }
    return id && typeof id === 'string' && data ? (<div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
            <h3>Detalhe do Produto</h3>
            <div className="mb-2">
                <strong>ID: {data._id}</strong>
            </div>
            <div className="mb-2">
                <strong>Nome: {data.name}</strong>
            </div>
            <div className="mb-2">
                <strong>Preço: {data.price}</strong>
            </div>
            <div className="mb-2">
                <strong>Descrição: {data.description}</strong>
            </div>
            <div className="mb-2">
                {data.categoryId ? <strong>Categoria: {data.categoryId.name} </strong> : <strong> Sem categoria </strong>}
            </div>
            <div className="mb-2">
                <strong>Data de criação: {data.createdAt}</strong>
            </div>
            <div className="mb-2">
                <strong>Data de Atualização: {data.updatedAt}</strong>
            </div> 
            <ButtonEdit id={id} link="/produtos/update" />
            <button onClick={voltar} className="btn btn-sm btn-primary me-2">Voltar</button>
        </div>
    </div>) : <div></div>;
}