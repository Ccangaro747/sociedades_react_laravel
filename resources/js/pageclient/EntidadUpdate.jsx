
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import Select from "../components/Select";

const EntidadUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getToken } = AuthUser();
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [website, setWebsite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [orden, setOrden] = useState("");
    const [urlfoto, setUrlfoto] = useState("");
    const [categoria_id, setCategoria_id] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            try {
                const result = await axios.get(
                    `http://localhost:8000/api/v1/admin/categoria`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setCategorias(result.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchData();
    }, [getToken]);

    useEffect(() => {
        const fetchEntidad = async () => {
            const token = getToken();
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/v1/client/entidad/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setNombre(data.nombre);
                setEmail(data.email);
                setOrden(data.orden);
                setDescripcion(data.descripcion);
                setTelefono(data.telefono);
                setDireccion(data.direccion);
                setWebsite(data.website);
                setFacebook(data.facebook);
                setUrlfoto(data.urlfoto);
                setCategoria_id(data.categoria_id);
            } catch (error) {
                console.error("Error al obtener la entidad:", error);
            }
        };

        fetchEntidad();
    }, [id, getToken]);

    const handleInputChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setUrlfoto(e.target.result);
        };
    };

    const getCategoriaId = (v) => {
        setCategoria_id(v);
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        const token = getToken();

        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("orden", orden);
        formData.append("urlfoto", urlfoto);
        formData.append("categoria_id", categoria_id);
        formData.append("email", email);
        formData.append("telefono", telefono);
        formData.append("direccion", direccion);
        formData.append("website", website);
        formData.append("facebook", facebook);

        try {
            await axios.put(
                `http://localhost:8000/api/v1/client/entidad/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/client/entidad");
        } catch (error) {
            console.error("Error al actualizar la entidad:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto mt-5 mb-5 overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <form onSubmit={submitUpdate}>
                        <div className="mb-4">
                            <label
                                htmlFor="nombre"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="descripcion"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                rows="4"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="orden"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Orden
                            </label>
                            <input
                                type="number"
                                id="orden"
                                name="orden"
                                value={orden}
                                onChange={(e) => setOrden(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="urlfoto"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                URL de Foto
                            </label>
                            <input
                                type="text"
                                id="urlfoto"
                                name="urlfoto"
                                value={urlfoto}
                                onChange={(e) => setUrlfoto(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="categoria"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Categoría
                            </label>
                            <Select
                                id="categoria"
                                name="categoria"
                                value={categoria_id}
                                onChange={(e) => getCategoriaId(e.target.value)}
                                options={categorias}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="telefono"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="direccion"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="website"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Sitio Web
                            </label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="facebook"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Facebook
                            </label>
                            <input
                                type="text"
                                id="facebook"
                                name="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="file"
                                className="block mb-2 text-sm font-bold text-gray-700"
                            >
                                Cargar Imagen
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={(e) => handleInputChange(e)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                        >
                            Guardar cambios
                        </button>
                        <Link
                            to="/client/entidad"
                            className="inline-block px-4 py-2 ml-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EntidadUpdate;





