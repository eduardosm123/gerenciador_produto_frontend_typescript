 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// paginas 
import Home from './Home.tsx'
import ListCategoria from './categoria/ListCategoria.tsx'
import CreateCategoria from './categoria/CreateCategoria.tsx'
import ReadCategoria from './categoria/ReadCategoria.tsx'
import UpdateCategoria from './categoria/UpdateCategoria.tsx'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import ListProdutos from './produto/ListProduto.tsx'
import CreateProduto from './produto/CreateProduto.tsx'
import ReadProduto from './produto/ReadProduto.tsx'
import UpdateProdutos from './produto/UpdateProduto.tsx'

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categoria" element={<ListCategoria />}></Route>
        <Route path="/categoria/create" element={<CreateCategoria />}></Route>
        <Route path="/categoria/read/:id" element={<ReadCategoria />}></Route>
        <Route path="/categoria/update/:id" element={<UpdateCategoria />}></Route>
        <Route path="/produtos" element={<ListProdutos />}></Route>
        <Route path="/produtos/create" element={<CreateProduto />}></Route>
        <Route path="/produtos/read/:id" element={<ReadProduto />}></Route>
        <Route path="/produtos/update/:id" element={<UpdateProdutos />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
