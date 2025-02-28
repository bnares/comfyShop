import React from 'react'
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorElement } from './components'

//loaders
import {loader as landingLoader} from "./pages/Landing";
import {loader as singleProductLoader} from "./pages/SingleProduct";
import {loader as productsLoader} from "./pages/Products"
import {loader as checkoutLoader} from "./pages/Checkout"
import {loader as OrdersLOader} from "./pages/Orders";

//actions
import {action as registerAction} from "./pages/Register"
import {action as loginAction} from "./pages/Login";
import {action as checkoutAction} from "./components/CheckoutForm"
import { store } from './store';



const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element:<Landing />,
        errorElement:<ErrorElement />,
        loader:landingLoader, //Loader w React Router to funkcja używana do pobierania danych przed załadowaniem komponentu przypisanego do danej trasy (route). Służy do asynchronicznego pobierania danych (np. z API), zanim komponent zostanie wyrenderowany
      },
      {
        path:"products",
        element:<Products />,
        errorElement: <ErrorElement />,
        loader:productsLoader
      },
      {
        path:"products/:id",
        element:<SingleProduct />,
        errorElement:<ErrorElement />,
        loader:singleProductLoader,
      },
      {
        path:"cart",
        element:<Cart />
      },
      {
        path:"about",
        element:<About />
      },
      {
        path:"checkout",
        element:<Checkout />,
        action: checkoutAction(store),
        loader: checkoutLoader(store),
        
      },
      {
        path:"orders",
        element:<Orders />,
        loader: OrdersLOader(store)
      },
    ]
  },
  {
    path:"/login",
    element:<Login />,
    errorElement: <Error />,
    action: loginAction(store), //passing store where we have all app data to have acces to all actions from login method 
  },
  {
    path:"/register",
    element:<Register />,
    errorElement:<Error />,
    action: registerAction //Gdy użytkownik wysyła formularz <Form> z metodą POST, PUT, PATCH lub DELETE, React Router przekierowuje dane do funkcji action określonej dla danego route’a
  }

])

const App = () => {
  return (
   <RouterProvider router={router} />
  )
}

export default App
