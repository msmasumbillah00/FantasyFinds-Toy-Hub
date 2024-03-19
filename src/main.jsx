import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './layout/Main/Main';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserContextProvider from './context/UserContextProvider';
import Profile from './pages/Profile/Profile';
import Products from './pages/Home/Products/Products';
import DataContextProvider from './context/DataContextProvider';
import Catagories from './pages/Catagories/Catagories';


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
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/catagories/:id",
        element: <Catagories></Catagories>
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
