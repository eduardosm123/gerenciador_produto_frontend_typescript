import React from "react"
import { useParams } from "react-router-dom";
 
import { useEffect } from "react";
import ButtonEdit from "../components/ButtonEdit";
 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { definirCategoriaFormUpdateAndReadInicial, limparFormularioUpdateAndRead } from "../redux/reducer/categoriaSlice";
import { getCategoriaById } from "../API/categoria";
import { RootState } from "../redux/store";
import { Categoria } from "../types/categoriaTypes";
 

export default function ReadCategoria() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state: RootState) => state.categoria.categoriaForm.updateAndRead)
    const { id } = useParams();


    // valida que o id chegou e é uma string
    useEffect(()=> {
        if(!id || typeof id != 'string') {
            navigate("/categoria")
        }
    }, [id, navigate])

    useEffect(() => {
        async function getCategoriaLocal() {
            try {
                if (id) {
                    const res = await getCategoriaById(id);
                    if (res && typeof res === 'object' && 'data' in res) {
                        dispatch(definirCategoriaFormUpdateAndReadInicial((res as { data: Categoria }).data))
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

        getCategoriaLocal();
    }, []);

    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(limparFormularioUpdateAndRead())
        navigate("/categoria")
    }

    return id && typeof id === 'string' ? (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h3>Detalhe da Categoria</h3>
                <div className="mb-2">
                    <strong>ID: {data._id}</strong>
                </div>
                <div className="mb-2">
                    <strong>Nome: {data.name}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de criação: {data.createdAt}</strong>
                </div>
                <div className="mb-2">
                    <strong>Data de Atualização: {data.updatedAt}</strong>
                </div>
                <ButtonEdit id={id} link="/categoria/update"  />
                <button onClick={voltar} className="btn btn-sm btn-primary me-2">Voltar</button>
            </div>
        </div>
    ) : <div></div>;
}