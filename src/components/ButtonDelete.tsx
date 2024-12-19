
import React from "react" 


type ButtonDeleteProps = {
    func: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ func }) => {
    return (
        <button onClick={func} className="btn btn-sm btn-danger">Deletar</button>
    )
};

export default ButtonDelete;