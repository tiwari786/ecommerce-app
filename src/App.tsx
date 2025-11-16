import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/product/:id",
          element: <ProductDetails />
        },
        {
          path: "/cart",
          element: <Cart />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
