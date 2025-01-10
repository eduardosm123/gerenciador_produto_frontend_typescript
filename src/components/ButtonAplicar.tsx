
import React from "react"  


type ButtonAplicarProps = {
    msg: string
}

const ButtonAplicar: React.FC<ButtonAplicarProps> = ({ msg = 'Aplicar'}) => {
    return (
        <button  className="btn btn-success w-100 ">{msg}</button>
    )
};

export default ButtonAplicar;