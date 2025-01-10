import React from "react"
import { Link, useParams } from "react-router-dom";
 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
 
import { definirCategoriaFormUpdateAndReadName, definirCategoriaFormUpdateAndReadInicial, limparFormularioUpdateAndRead } from "../redux/reducer/categoriaSlice";
import { getCategoriaById, updateCategory } from "../API/categoria";
import { RootState } from "../redux/store";
import { Categoria } from "../types/categoriaTypes";
import { FormEvent } from 'react';
import ButtonAplicar from "../components/ButtonAplicar";

export default function UpdateCategoria() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state: RootState) => state.categoria.categoriaForm.updateAndRead)
    const { id } = useParams();


    // valida que o id chegou e é uma string
    useEffect(() => {
        if (!id || typeof id != 'string') {
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
    }, [dispatch]);


    const voltar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(limparFormularioUpdateAndRead())
        navigate("/categoria")
    }

    const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
         
        async function updateCategoriaLocal() {
            try {
                if (id) {
                    const currentDate = new Date();
                    const dateTime = currentDate.toISOString();
                    await updateCategory(id, { name: data.name, __v: data.__v, _id: data._id, createdAt: data.createdAt, updatedAt: dateTime})
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateCategoriaLocal()
        navigate("/categoria")
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Editar Categoria</h1>
                <form onSubmit={handleUpdate}>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome da categoria:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da categoria"
                            onChange={e => dispatch(definirCategoriaFormUpdateAndReadName(e.target.value))}
                            value={data.name} />
                    </div>  
                    <div className='row'>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1"><ButtonAplicar msg="Editar" /></div>
                        <div className="col-md-5 col-lg-3 col-sm-5 m-1">
                         
                        <Link onClick={voltar} to={"/categoria"} className="btn btn-primary w-100 " >Voltar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}