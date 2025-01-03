export type Produto = {
    _id: string,
    name: string,
    price: number,
    description: string,
    categoryId: string,
    createdAt: string,
    updatedAt: string,
}

export type ProdutoListaAndRead = {
    _id: string,
    name: string,
    price: number,
    description: string,
    categoryId: {
        _id: string,
        name: string
    },
    createdAt: string,
    updatedAt: string,
}

export type ListaDeProdutos = {
    lista: ProdutoListaAndRead[],
    pages: number,
    totalpages: number
}

export type ProdutoFormCreate = {
    name: string,
    price: number,
    description: string,
    categoryId: string
}



export type ProdutoForm = {
    create: ProdutoFormCreate,
    update: ProdutoListaAndRead,
    read: ProdutoListaAndRead
}