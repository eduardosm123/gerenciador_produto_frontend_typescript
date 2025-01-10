
import React from "react" 
import { Link } from "react-router-dom";


type ButtonEditProps = {
    id: string,
    link: string,
    className?: string,
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ id, link, className = "btn btn-sm btn-primary"}) => {
    return (
       <Link to={`${link}/${id}`} className={className}>Editar</Link>
    )
};

export default ButtonEdit;