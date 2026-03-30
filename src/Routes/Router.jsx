import { useRoutes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("../Pages/LoginPage"));
const AllProductLayout = lazy(() => import("../Pages/AllProduct"));
const SingleProduct = lazy(() => import("../Pages/SingleProduct"));
const CartPage = lazy(() => import("../Pages/CartPage"));
// const Checkout = lazy(() => import("../Pages/Checkout"));

import ProtectedRoutes from "../Components/ProtectedRoutes";
import UnprotectedRoutes from "../Components/UnprotectedRoutes";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UnprotectedRoutes />,
      children: [
        {
          path: "",
          element: (
              <LoginPage />
          ),
        },
      ],
    },
    { 
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <Navigate to="products" replace />,
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<h3>Loading products...</h3>}>
              <AllProductLayout />
            </Suspense>
          ),
        },
        {
          path: "products/:id",
          element: (
            <Suspense fallback={<h3>Loading product...</h3>}>
              <SingleProduct />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<h3>Loading cart...</h3>}>
              <CartPage />
            </Suspense>
          ),
        },
      ],
    },
    {
  // path: "checkout",
  // element: (
  //   <Suspense fallback={<h3>Loading checkout...</h3>}>
  //     <Checkout />
  //   </Suspense>
  // ),
},
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default Router;