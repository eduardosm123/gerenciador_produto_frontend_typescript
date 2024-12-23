
import React from "react" 
import { Link } from "react-router-dom";


type ButtonEditProps = {
    id: string,
    link: string
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ id, link}) => {
    return (
       <Link to={`${link}/${id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
    )
};

export default ButtonEdit;