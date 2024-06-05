import React, { useEffect, useState } from "react";
import axios from "axios"; // Importar axios
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser"; // Importar AuthUser
import { BeatLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [aprobado, setAprobado] = useState(false);
    const { getToken } = AuthUser(); // Obtener getToken de AuthUser

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const token = getToken(); // Obtener el token de autenticación
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/admin/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Usar el token obtenido
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
        const token = getToken(); // Obtener el token de autenticación
        try {
            await axios.put(
                `http://localhost:8000/api/v1/admin/user/${id}`,
                { name, aprobado },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Usar el token obtenido
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
                        <div className="col-sm-12">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-3 col-sm-12">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    checked={aprobado}
                                    onChange={(e) => setAprobado(!aprobado)}
                                    type="checkbox"
                                    role="switch"
                                    id="aprobado"
                                />
                                <label className="form-check-label" htmlFor="aprobado">
                                    Aprobado
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 btn-group">
                            <Link to={-1} className="btn btn-secondary">
                                ← Back
                            </Link>
                            <button type="submit" className="btn btn-primary">
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
