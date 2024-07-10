import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import Select from "../components/Select";

const EntidadUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getToken } = AuthUser();

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        orden: 0,
        descripcion: "",
        telefono: "",
        direccion: "",
        website: "",
        facebook: "",
        urlfoto: "",
        categoria_id: "",
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
                `http://localhost:8000/api/v1/client/entidad/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const { data } = response;
            setFormData({
                nombre: data.nombre || "",
                email: data.email || "",
                orden: data.orden || 0,
                descripcion: data.descripcion || "",
                telefono: data.telefono || "",
                direccion: data.direccion || "",
                website: data.website || "",
                facebook: data.facebook || "",
                urlfoto: data.urlfoto || "",
                categoria_id: data.categoria_id || "",
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

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                file: reader.result,
            });
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();
        try {
            await axios.put(
                `http://localhost:8000/api/v1/client/entidad/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/client/entidad");
        } catch (error) {
            console.error("Error al actualizar la entidad:", error);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto mt-5 mb-5 overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <form onSubmit={submitUpdate} className="w-full">
                        <div className="mb-3">
                            <div>
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
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Teléfono</label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Dirección</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Orden</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="orden"
                                    value={formData.orden}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Categoría</label>
                                <Select
                                    selec={formData.categoria_id}
                                    selected={(v) =>
                                        setFormData({
                                            ...formData,
                                            categoria_id: v,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Website</label>
                                <input
                                    className="form-control"
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Facebook</label>
                                <input
                                    className="form-control"
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1">
                                    Descripción:
                                </label>
                                <textarea
                                    className="form-control"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Imagen:</label>
                                {formData.urlfoto && (
                                    <img src={`/img/entidad/${formData.urlfoto}`} loading="lazy"
                                        width={200}
                                        height={200}
                                        className="img-fluid img-thumbnail"
                                        onError={(e) => e.target.src = '/nofoto.png'}
                                    />
                                )}
                                <input
                                    className="w-full form-input"
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                />
                            </div>
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
