import React from "react";
import axios from 'axios';  // Importar axios
import AuthUser from "../pageauth/AuthUser";

const Navbar = () => {
    const { getRol, getLogout, getToken, user} = AuthUser();

    // Definimos una función llamada 'logoutUser'
    const logoutUser = () => {

        const token = getToken(); // Obtenemos el token de autenticación del usuario actual llamando a la función 'getToken'

        // Hacemos una solicitud POST a la ruta '/api/v1/auth/logout' del servidor
        axios.post("/api/v1/auth/logout", {}, {
            // Incluimos el token de autenticación en las cabeceras de la solicitud
            headers: {
                'Authorization': `Bearer ${token}` // Envía el token en la cabecera de la solicitud
            }
        // Si la solicitud es exitosa, el servidor responderá con una respuesta
        }).then((response) => {
            console.log(response);
            // Llamamos a la función 'getLogout' que probablemente se encarga de actualizar el estado de la aplicación
            // para reflejar que el usuario ha cerrado la sesión
            getLogout();
        }).catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
    };

    // Esta función se encarga de renderizar los enlaces de la barra de navegación
    const renderLinks = () => {
        // Comprueba si el usuario está autenticado (si hay un token)
        if (getToken()) {
            // Si el usuario está autenticado, se devuelven dos enlaces: Administración y Logout
            return [
                // Enlace a la página de administración. El destino de este enlace se determina
                // por el rol del usuario autenticado (obtenido con getRol())
                // Se utiliza key en react para identificar de forma única a cada elemento de la lista
                <li className="mr-3" key="admin">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href={`/${getRol()}`}
                    >
                        Administración | {user.name}
                    </a>
                </li>,
                // Enlace para cerrar la sesión del usuario. Al hacer clic en este enlace,
                // se llama a la función logoutUser
                <li className="mr-3" key="logout">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href="#"
                        onClick={logoutUser}
                    >
                        Logout
                    </a>
                </li>
            ];
        } else {
                // Si el usuario no está autenticado, se devuelve un solo enlace a la página de inicio de sesión
            return [
                <li className="mr-3" key="login">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href="/login"
                    >
                        Login
                    </a>
                </li>
            ];
        }
    };

    return (
        <nav className="w-full p-2 mt-0 bg-white shadow-md">
            <div className="container flex flex-wrap items-center mx-auto">
                <div className="flex justify-center w-full font-extrabold text-white md:w-1/2 md:justify-start">
                    <a
                        className="text-white no-underline hover:text-black hover:no-underline"
                        href="#"
                    >
                        <img src="/logo.png" alt="Logo" className="object-contain h-20 w-30"/>
                    </a>
                </div>
                <div className="flex content-center justify-between w-full pt-2 md:w-1/2 md:justify-end">
                    <ul className="flex flex-col items-center justify-between flex-1 list-reset md:flex-none md:flex-row">
                        <li className="mr-3">
                            <a
                                className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li className="mr-3">
                            <a
                                className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                                href="/categorias"
                            >
                                Categorías
                            </a>
                        </li>
                        {renderLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
