import { FormEvent } from 'react';

import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { postCategoria } from '../API/categoria';
import { definirCategoriaFormCreate, limparFormularioCreate } from '../redux/reducer/categoriaSlice';
import ButtonAplicar from '../components/ButtonAplicar';
import { Link } from 'react-router-dom';

export default function CreateCategoria() {

    const values = useSelector((state: RootState) => state.categoria.categoriaForm.create)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            postCategoria(values)
            dispatch(limparFormularioCreate())
            navigate("/categoria")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Adicionar Categoria</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome da categoria:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da categoria"
                            value={values.name}
                            onChange={e => dispatch(definirCategoriaFormCreate(e.target.value))} />
                    </div>
                    <ButtonAplicar msg="Cadastrar"/> 
                    <Link to={"/categoria"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}