 
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <div className="d-flex  justify-content-center">
                <div className="d-flex justify-content-end">
                    <Link to="/produtos" className="btn btn-success">Produtos</Link>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="/categoria" className="btn btn-primary ms-3">Categoria</Link>
                </div>
            </div>
        </div>
    )
}