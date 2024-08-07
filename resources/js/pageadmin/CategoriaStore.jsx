import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import { Link, useNavigate } from "react-router-dom";

const CategoriaStore = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [orden, setOrden] = useState("");
    const [urlfoto, setUrlfoto] = useState("");
    const navigate = useNavigate();
    const { getToken } = AuthUser();

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setUrlfoto(e.target.result);
        };
    };

    const submitStore = async (e) => {
        e.preventDefault();
        const token = getToken();

        let formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('orden', orden);
        formData.append('urlfoto', urlfoto);

        try {
            await axios.post(
                `http://localhost:8000/api/v1/admin/categoria`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/admin/categoria");
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <form onSubmit={submitStore}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="sm:w-4/12">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-4/12">
                            <label>Orden</label>
                            <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='number'/>
                        </div>
                        <div className='mt-3'>
                            <label>Descripción:</label>
                            <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label>Imagen:</label>
                            <input className="form-control" type="file" onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="flex mt-3 space-x-4">
                        <Link to={-1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">
                                ← Back
                            </Link>
                            <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Crear Categoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoriaStore;
