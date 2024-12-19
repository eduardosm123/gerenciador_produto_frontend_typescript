
import React from "react" 
import { Link } from "react-router-dom";


type ButtonEditProps = {
    id: string,
    link: string,
    read: boolean
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ id, link, read = false }) => {
    return (
        read ? <Link to={`${link}/${id}`} className="btn btn-success">Editar</Link>
            : <Link to={`${link}/${id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
    )
};

export default ButtonEdit;