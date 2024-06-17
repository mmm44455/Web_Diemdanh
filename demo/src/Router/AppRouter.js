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
import Diemdanh from "../Page/DiemDanh";
import DefaultPage from "../Page/Default-page"
import CreateAcc from "../Page/CreateAcc"
import TrainFace from "../Page/TrainFace";
import Stulist from "../Page/ListStu"
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
        path:"/listStu",
        element:<Stulist ></Stulist>
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
          path:"/diemdanh",
          element:<Diemdanh/>
      },
      {
          path:"/default-page",
          element:<DefaultPage></DefaultPage>
      },
      {
          path:"/createAcc",
          element:<CreateAcc></CreateAcc>
      },
      {
        path : "/test",
        element:<Test></Test>
      },{
        path:"/trainFace",
        element:<TrainFace/>
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