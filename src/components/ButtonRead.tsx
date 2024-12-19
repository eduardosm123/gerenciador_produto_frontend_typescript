import React from "react" 
import { Link } from "react-router-dom";


type ButtonReadProps = {
    id: string,
    link: string
}

const ButtonRead: React.FC<ButtonReadProps> = ({ id, link }) => {
    return (
        <Link to={`${link}/${id}`} className="btn btn-sm btn-info me-2">Ler</Link>
    )
};

export default ButtonRead