

export type CategoriaList  = {
    lista: Categoria[],
    pages: number,
    totalPages: number
}


export type Categoria = {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    __v: string
}


export type CategoriaForm = {
    create: {
        name: string
    },
    updateAndRead: Categoria
}