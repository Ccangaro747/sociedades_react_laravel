import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
    const navigate = useNavigate(); // Importamos el hook useNavigate para redireccionar a diferentes rutas

    // Funciones para obtener el token, usuario y rol del sessionStorage
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const token = JSON.parse(tokenString);
        return token;
    };

    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        const user = JSON.parse(userString);
        return user;
    };
    const getRol = () => {
        const rolString = sessionStorage.getItem("rol");
        const rol = JSON.parse(rolString);
        return rol;
    };
    // Estados locales para token, usuario y rol, inicializados con los valores del sessionStorage
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());
    // Función para guardar el token, usuario y rol en sessionStorage y actualizar los estados locales
    const saveToken = (user, token, rol) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("rol", JSON.stringify(rol));

        setUser(user);
        setToken(token);
        setRol(rol);

        // rol : admin | client

        // Redirección a las rutas correspondientes según el rol del usuario
        if (getRol() === "admin") navigate("/admin");
        if (getRol() === "client") navigate("/client");
    };
    // Función para cerrar sesión, limpiando el sessionStorage y redirigiendo a la página de inicio
    const getLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };
    // Retornamos un objeto con las funciones y valores relevantes para ser utilizados por otros componentes
    return {
        setToken: saveToken, // Función para establecer el token
        token, // Valor del token
        user, // Valor del usuario
        rol, // Valor del rol
        getToken, // Función para obtener el token
        getRol, // Función para obtener el rol
        getUser, // Función para obtener el usuario
        getLogout, // Función para cerrar sesión
    };
};

export default AuthUser;
