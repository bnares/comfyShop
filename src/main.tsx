import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
import { store } from './store.tsx'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <App />
     <ToastContainer position='top-center'/>
  </Provider>
   
  
)
