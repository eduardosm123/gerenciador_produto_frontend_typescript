import { configureStore } from "@reduxjs/toolkit";
import { categoriaSlice } from "./reducer/categoriaSlice";
import { produtoSlice } from "./reducer/produtoSlice";

const store = configureStore({
    reducer: {
        categoria: categoriaSlice.reducer,
        produto: produtoSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;