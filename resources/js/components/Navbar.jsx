import React, { useState, useEffect } from "react";
import axios from 'axios';  // Importar axios
import AuthUser from "../pageauth/AuthUser";

const Navbar = () => {
    const { getRol, getLogout, getToken, user } = AuthUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logoutUser = async () => {
        const token = getToken();
        setLoading(true);
        setError(null);
        try {
            await axios.post("/api/v1/auth/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getLogout();
        } catch (error) {
            setError('Error al cerrar sesión');
        } finally {
            setLoading(false);
        }
    };

    const renderLinks = () => {
        if (getToken()) {
            return [
                <li className="mr-3" key="admin">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href={`/${getRol()}`}
                    >
                        Administración {user && `| ${user.name}`}
                    </a>
                </li>,
                <li className="mr-3" key="logout">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href="#"
                        onClick={logoutUser}
                    >
                        {loading ? 'Cerrando sesión...' : 'Logout'}
                    </a>
                </li>
            ];
        } else {
            return (
                <li className="mr-3" key="login">
                    <a
                        className="inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 hover:text-underline"
                        href="/login"
                    >
                        Login
                    </a>
                </li>
            );
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
                        <img src="/logo.png" alt="Logo" className="object-contain h-20 w-30" />
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
            {error && <div className="text-red-500">{error}</div>}
        </nav>
    );
};

export default Navbar;
