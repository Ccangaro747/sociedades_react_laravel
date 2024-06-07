import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoriaUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        orden: "",
        menu: false,
        file: null,
    });
    const [error, setError] = useState("");
    const { getToken } = AuthUser();

    useEffect(() => {
        getCategoriaById();
    }, []);

    const getCategoriaById = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/admin/categoria/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setFormData({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
                orden: response.data.orden,
                menu: response.data.menu,
                file: null,
            });
        } catch (error) {
            setError("Error al obtener la categoría.");
            console.error("Error al obtener la categoría:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('orden', formData.orden);
        formDataToSend.append('menu', formData.menu);
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }

        try {
            await axios.put(
                `http://localhost:8000/api/v1/admin/categoria/${id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            navigate("/admin/categoria");
        } catch (error) {
            setError("Error al actualizar la categoría.");
            console.error("Error al actualizar la categoría:", error);
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
                                        checked={formData.menu}
                                        onChange={handleInputChange}
                                        type="checkbox"
                                        role="switch"
                                        id="menu"
                                        name="menu"
                                    />
                                    <label className="form-check-label" htmlFor='menu'>Portada?</label>
                                </div>
                            </div>
                            <label htmlFor="nombre" className="sm:w-4/12">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="sm:w-4/12">
                            <label htmlFor="orden">Orden</label>
                            <input
                                className='form-control'
                                name="orden"
                                value={formData.orden}
                                onChange={handleInputChange}
                                type='number'
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                className='form-control'
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="file">Imagen:</label>
                            {formData.file && (
                                <img
                                    src={URL.createObjectURL(formData.file)}
                                    alt="Vista previa"
                                    className="img-fluid img-thumbnail"
                                />
                            )}
                            <input
                                className="form-control"
                                type="file"
                                name="file"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    file: e.target.files[0],
                                })}
                            />
                        </div>
                        <div className="flex mt-3 space-x-4">
                            <Link to={-1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">
                                ← Back
                            </Link>
                            <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Actualizar Categoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriaUpdate;
