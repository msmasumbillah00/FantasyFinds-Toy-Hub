import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './layout/Main/Main';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserContextProvider from './context/UserContextProvider';
import Products from './pages/Home/Products/Products';
import DataContextProvider from './context/DataContextProvider';
import Catagories from './pages/Catagories/Catagories';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import MyToyes from './pages/MyToyes/MyToyes';
import PrivateRout from './components/PrivateRout/PrivateRout';
import Myorders from './pages/Myorders/Myorders';
import OrderDetails from './pages/Myorders/OrderDetails/OrderDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <Products></Products>
          },
          {
            path: "/page/:id",
            element: <Products></Products>
          }
        ]
      },
      {
        path: "/home",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>
      },
      {
        path: "/productDetails/:Id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.Id}`)
      },
      {
        path: "/catagories/:id",
        element: <Catagories></Catagories>,
        loader: ({ params }) => fetch(`http://localhost:5000/catagories/${params.id}`)
      },
      {
        path: "/myToys",
        element: <PrivateRout><MyToyes></MyToyes></PrivateRout>
      },
      {
        path: "/orders",
        element: <PrivateRout><Myorders></Myorders></PrivateRout>
      },
      {
        path: "/orders/:id",
        element: <OrderDetails></OrderDetails>
      }

    ]
  },
  {
    path: "*",
    element: <h1 className='text-8xl'>Page not found</h1>
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
)
