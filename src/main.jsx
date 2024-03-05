import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Buscar from './pages/buscar/Buscar.jsx'
import Registrar from './pages/registrar/Registrar.jsx'
import RegistrarVenda from './pages/registrar/registrarVenda/RegistrarVenda.jsx'
import RegistrarProduto from './pages/registrar/registrarProduto/RegistrarProduto.jsx'
import RegistrarCliente from './pages/registrar/registrarCliente/RegistrarCliente.jsx'
import BuscarVenda from './pages/buscar/buscarVenda/BuscarVenda.jsx'
import BuscarProduto from './pages/buscar/buscarProduto/BuscarProduto.jsx'
import BuscarCliente from './pages/buscar/buscarCliente/BuscarCliente.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/buscar",
    element: <Buscar />,
  },
  {
    path: "/registrar",
    element: <Registrar/>,
  },
  {
    path: "/registrarPedido",
    element: <RegistrarVenda/>,
  },
  {
    path: "/registrarProduto",
    element: <RegistrarProduto/>,
  },
  {
    path: "/registrarCliente",
    element: <RegistrarCliente/>,
  },
  {
    path: "/buscarPedido",
    element: <BuscarVenda/>,
  },
  {
    path: "/buscarProduto",
    element: <BuscarProduto/>,
  },
  {
    path: "/buscarCliente",
    element: <BuscarCliente/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
