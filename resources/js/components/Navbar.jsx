import React from "react";
import AuthUser from "../pageauth/AuthUser";
import Config from '../Config'

const Navbar = () => {
    const {getRol, getLogout, getToken } = AuthUser();

    const logoutUser = () => {
        const token = getToken(); // Obtén el token de autenticación

        axios.post("/api/v1/auth/logout", {}, {
            headers: {
                'Authorization': `Bearer ${token}` // Envía el token en la cabecera de la solicitud
            }
        }).then((response) => {
            console.log(response)
            getLogout();
        }).catch((error) => {
            console.log(error);
        });
    };

    const renderLinks = () => {
        if (getToken()) {
            return [
                <li className="mr-3" key="admin">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href={`/${getRol()}`}
                    >
                        Administracion
                    </a>
                </li>,
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
        <nav className="w-full p-2 mt-0 bg-gray-800">
            <div className="container flex flex-wrap items-center mx-auto">
                <div className="flex justify-center w-full font-extrabold text-white md:w-1/2 md:justify-start">
                    <a
                        className="text-white no-underline hover:text-white hover:no-underline"
                        href="#"
                    >
                        Navbar
                    </a>
                </div>
                <div className="flex content-center justify-between w-full pt-2 md:w-1/2 md:justify-end">
                    <ul className="flex items-center justify-between flex-1 list-reset md:flex-none">
                        <li className="mr-3">
                            <a
                                className="inline-block px-4 py-2 text-white no-underline"
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
                                Categorias
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
