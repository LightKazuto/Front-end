import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
    const isLogin = localStorage.getItem('token') === 'authenticated';
    return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoutes;