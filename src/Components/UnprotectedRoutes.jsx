import { Navigate, Outlet } from "react-router-dom";

const token = localStorage.getItem("token");
function UnprotectedRoutes() {

  if (!token) {
    return <Outlet />;
  }

  return <Navigate to="/home" replace />;
}

export default UnprotectedRoutes;