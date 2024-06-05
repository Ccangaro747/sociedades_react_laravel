import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [aprobado, setAprobado] = useState(false);
    const { getToken } = AuthUser();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/admin/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setName(response.data.name);
            setAprobado(response.data.aprobado);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();
        try {
            await axios.put(
                `http://localhost:8000/api/v1/admin/user/${id}`,
                { name, aprobado },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/admin/user");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <form onSubmit={submitUpdate}>
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <div className="flex items-center">
                                <input
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    checked={aprobado}
                                    onChange={(e) => setAprobado(!aprobado)}
                                    type="checkbox"
                                    id="aprobado"
                                />
                                <label className="block ml-2 text-sm text-gray-900" htmlFor="aprobado">
                                    Aprobado
                                </label>
                            </div>
                        </div>
                        <div className="flex mt-3 space-x-4">
                            <Link to={-1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">
                                ← Back
                            </Link>
                            <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-gray-700">
                                Actualizar User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
