
import React from "react"  


type ButtonAplicarProps = {
    msg: string
}

const ButtonAplicar: React.FC<ButtonAplicarProps> = ({ msg = 'Aplicar'}) => {
    return (
        <button  className="btn btn-success">{msg}</button>
    )
};

export default ButtonAplicar;