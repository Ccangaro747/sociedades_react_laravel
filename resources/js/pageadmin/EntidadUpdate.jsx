import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";

const EntidadUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getToken } = AuthUser();
    const [formData, setFormData] = useState({
        nombre: "",
        orden: "",
        publicado: false,
        file: null,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        getEntidadById();
    }, []);

    const getEntidadById = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/admin/entidad/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setFormData({
                nombre: response.data.nombre,
                orden: response.data.orden,
                publicado: response.data.publicado,
                file: null,
            });
        } catch (error) {
            setError("Error al obtener la entidad.");
            console.error("Error al obtener la entidad:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();
        try {
            await axios.put(
                `http://localhost:8000/api/v1/admin/entidad/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/admin/entidad");
        } catch (error) {
            console.error("Error al actualizar la entidad:", error);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <form onSubmit={submitUpdate}>
                        <div className="mb-3">
                            <div className="mt-3">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        checked={formData.publicado}
                                        onChange={handleInputChange}
                                        type="checkbox"
                                        role="switch"
                                        id="publicado"
                                        name="publicado"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="publicado"
                                    >
                                        Publicado?
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="nombre" className="sm:w-4/12">
                                Nombre:
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="sm:w-4/12">
                            <label htmlFor="orden">Orden</label>
                            <input
                                className="form-control"
                                name="orden"
                                value={formData.orden}
                                onChange={handleInputChange}
                                type="number"
                            />
                        </div>
                        <div className="flex mt-3 space-x-4">
                            <Link
                                to={-1}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700"
                            >
                                ← Back
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                            >
                                Actualizar Entidad
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EntidadUpdate;
