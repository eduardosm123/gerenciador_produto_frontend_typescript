
import ButtonRead from "../components/ButtonRead";
import ButtonDelete from "../components/ButtonDelete";
import { useEffect } from 'react';


import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduto, getProdutoPaginado } from "../API/produto";
import { setProductList, clearProductList } from "../redux/reducer/produtoSlice";
import ButtonEdit from '../components/ButtonEdit';
import { apiImage } from "../API/produto";



export default function ListProdutos() {
    const data = useSelector((state: RootState) => state.produto.productList.list)
    const totalPages = useSelector((state: RootState) => state.produto.productList.totalpages)
    const page = useSelector((state: RootState) => state.produto.productList.pages)

    const dispatch = useDispatch();

    useEffect(() => {
        async function getProductProdutosLocal() {
            try {
                const res: any = await getProdutoPaginado(page)
                dispatch(setProductList({ list: res.data.produtos }))
                dispatch(setProductList({ totalpages: res.data.totalPages }))
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

            dispatch(setProductList({ pages: page - 1 }))
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setProductList({ pages: page + 1 }))
        }
    }

    const limparProduto = () => {
        dispatch(clearProductList())
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light  ">
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
                <div className="table-responsive mt-1">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr >
                                <th>ID</th>
                                <th>Imagem</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data != null && data.length > 0 ? data.map((product, key) => (
                                <tr key={key}>
                                    <td>{product._id}</td>
                                    <td className="w-25 w-sm-50 w-md-50 w-lg-75"> <img src={`${apiImage}/${product.image}`} alt="imagem do produto" className="img-thumbnail w-50" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    {product.categoryId ? <td>{product.categoryId.name}</td> : <td>sem categoria</td>}
                                    <td>
                                        <div className="d-flex justify-content-between">
                                            <ButtonRead id={product._id} link={'/produtos/read'} />
                                            <ButtonEdit id={product._id} link="/produtos/update" />
                                            <ButtonDelete func={() => handleDelete(product._id)} />
                                        </div>
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
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page === totalPages}>Próxima</button>
                </div>
            </div>
        </div>

    )
}