
import ButtonRead from "../components/ButtonRead";
import ButtonDelete from "../components/ButtonDelete";
import { useEffect } from 'react';


import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduto, getProdutoPaginado } from "../API/produto";
import { definirListaDeProdutos_lista, definirListaDeProdutos_pages, definirListaDeProdutos_totalpages, limparListaProdutos } from "../redux/reducer/produtoSlice";
import ButtonEdit from '../components/ButtonEdit';




export default function ListProdutos() {
    const data = useSelector((state: RootState) => state.produto.listaDeProdutos.lista)
    const totalPages = useSelector((state: RootState) => state.produto.listaDeProdutos.totalpages)
    const page = useSelector((state: RootState) => state.produto.listaDeProdutos.pages)

    const dispatch = useDispatch();

    useEffect(() => {
        async function getProductProdutosLocal() {
            try {
                const res: any = await getProdutoPaginado(page)
                dispatch(definirListaDeProdutos_lista(res.data.produtos))
                dispatch(definirListaDeProdutos_totalpages(res.data.totalPages))
            } catch (error) {
                console.log(error)
            }
        }
        getProductProdutosLocal()
    }, [page]);



    const handleDelete = (id: string) => {
        const confirm = window.confirm("Você tem certeza que quer deletar?")
        if (confirm) { 
            async function deleteProdutoLocal() {
                try {
                    await deleteProduto(id)
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
            deleteProdutoLocal()
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            dispatch(definirListaDeProdutos_pages(page - 1))
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(definirListaDeProdutos_pages(page + 1))
        }
    }

    const limparProduto = () => {
        dispatch(limparListaProdutos())
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <h1>Lista de Produtos</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="d-flex  justify-content-end">
                    <div className="d-flex justify-content-end">
                        <Link to="/produtos/create" className="btn btn-success">Adicionar Produto</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={"/"} className="btn btn-primary ms-3" onClick={limparProduto}>Voltar</Link>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data != null && data.length > 0 ? data.map((registro, key) => (
                            <tr key={key}>
                                <td>{registro._id}</td>
                                <td>{registro.name}</td>
                                <td>{registro.price}</td>
                                <td>{registro.description}</td>
                                {registro.categoryId ? <td>{registro.categoryId.name}</td> : <td>sem categoria</td>}
                                <td>
                                    <ButtonRead id={registro._id} link={'/produtos/read'} />
                                    <ButtonEdit id={registro._id} link="/produtos/update" />
                                    <ButtonDelete func={() => handleDelete(registro._id)} />
                                </td>

                            </tr>
                        )) :
                            <tr>
                                <td>
                                    <h1>Não tem dados</h1>
                                </td>
                            </tr>}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page === totalPages}>Próxima</button>
                </div>
            </div>
        </div>

    )
}