import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App'
import RootLayout from "../layout/Rootlayout";
import Home  from "../Page/Home";
import TKB from "../Page/Tkb";
import Class from "../Page/Class"
import Test from "../Page/Test";
const router = createBrowserRouter([
  {
    path: "/login",
    element:<App></App>,
  },
  {
    path: "/",
    element:<RootLayout/>,
    children:[
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/tkb",
        element:<TKB/>
      },
      {
        path: "/class",
        element:<Class></Class>
      },
      {
        path : "/test",
        element:<Test></Test>
      }
    ]
  },
]);

const AppRouter = ()=>{
    return(
         <RouterProvider router={router} />
    )
}

export default AppRouter