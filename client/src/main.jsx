import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import store from "./redux/store.js"
import { Provider } from "react-redux"
import App from "./App.jsx"
import "./index.css"
import Home from "./pages/Home.jsx"
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider stire={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
