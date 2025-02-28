import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/user/UserSlice"

export const store = configureStore({ //Store to centralne miejsce, gdzie przechowywany jest cały stan aplikacji. Jest to globalny magazyn, który przechowuje dane, a komponenty mogą go odczytywać i aktualizować za pomocą akcji (actions).
    reducer:{ //Reducer to czysta funkcja, która określa, jak zmienia się stan aplikacji w odpowiedzi na akcje (actions) wysyłane do Redux Store.
        cartState: cartReducer,
        userState:userReducer
    }
})