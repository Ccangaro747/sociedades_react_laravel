import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthUser from "./AuthUser";

const ProtectedRoutes = () => {
    // Obtenemos la función getToken del objeto que devuelve AuthUser
    const { getToken } = AuthUser();
    // Si el token no existe (es decir, el usuario no está autenticado), redirigimos a la página de inicio de sesión
    if (!getToken()) {
        return <Navigate to={"/login"} />;
    }
    // Si el token existe (es decir, el usuario está autenticado), renderizamos los componentes de las rutas anidadas
    return <Outlet />;
};

export default ProtectedRoutes;
