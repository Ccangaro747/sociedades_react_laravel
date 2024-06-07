import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoriaUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [orden, setOrden] = useState("")
    const [menu, setMenu] = useState(false)
    const [urlfoto, setUrlfoto] = useState("foto.jpg")
    const [file, setFile] = useState("")

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setFile(e.target.result);
        };
    };
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
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setNombre(response.data.nombre);
            setDescripcion(response.data.descripcion);
            setOrden(response.data.orden);
            setMenu(response.data.menu);
            setUrlfoto(response.data.urlfoto);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        const token = getToken();
        const body = {
            nombre,
            descripcion,
            orden,
            menu,
            urlfoto: file
        };
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/admin/categoria/${id}`,
                body,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            if (response.data.status === 'success') {
                navigate('/admin/categorias');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <form onSubmit={submitUpdate}>
                        <div className="mb-3">
                        <div className="mt-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" checked={menu} onChange={(e)=>setMenu(!menu)} type="checkbox" role="switch" id="menu"/>
                                        <label className="form-check-label" htmlFor='menu'>Portada?</label>
                                    </div>
                                </div>
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
                            <img src={`/img/categoria/${urlfoto}`} loading='lazy' className="img-fluid img-thumbnail"/>
                            <input className="form-control" type="file" onChange={(e) => handleInputChange(e)} />
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
