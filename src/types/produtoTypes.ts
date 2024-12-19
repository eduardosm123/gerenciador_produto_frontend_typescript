export type Produto = {
    _id: string,
    name: string,
    price: number,
    description: string,
    category: CategoriaProduto,
    createdAt: string,
    updatedAt: string,
}

export type CategoriaProduto = {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export type ProdutoLista = {
    lista: Produto[],
    pages: number,
    totalpages: number
}

export type ProdutoFormCreate = {
    name: string,
    price: number,
    description: number,
    category: {
        name: string
    }
}

export type ProdutoForm = {
    create: ProdutoFormCreate,
    updateAndRead: Produto
}