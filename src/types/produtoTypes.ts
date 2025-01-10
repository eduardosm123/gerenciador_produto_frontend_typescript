 

export type ProductList = {
    list: ProductToReceive[],
    pages: number,
    totalpages: number
}



export type ProductToSend = {
    name: string,
    price: number,
    description: string,
    categoryId: string,
    image: string,
    imageFile: File
}

export type ProductToReceive = {
    _id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    categoryId: {
        _id: string,
        name: string
    },
    createdAt: string,
    updatedAt: string,
    __v: number
}


export type ProductToUpdate = {
    _id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    imageFile: File,
    categoryId: {
        _id: string,
        name: string
    },
    createdAt: string,
    updatedAt: string,
    __v: number
}