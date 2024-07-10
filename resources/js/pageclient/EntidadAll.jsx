import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const EntidadAll = () => {
    const [entidades, setEntidades] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const entidadesPerPage = 4;
    const { getToken } = AuthUser();
    const [reloadData, setReloadData] = useState(false); // Estado para forzar la recarga de datos

    useEffect(() => {
        getEntidadAll();
    }, [reloadData]); // Recargar datos cuando reloadData cambie

    const getEntidadAll = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/client/entidad",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setEntidades(response.data);
        } catch (error) {
            console.error("Error al obtener las entidades:", error);
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const currentEntidades = entidades.slice(
        currentPage * entidadesPerPage,
        (currentPage + 1) * entidadesPerPage,
    );

    const _deleteEntidadById = async (id) => {
        const isDelete = window.confirm(
            "¿Estás seguro de eliminar esta entidad?",
        );
        if (isDelete) {
            const token = getToken();
            try {
                await axios.delete(
                    `http://localhost:8000/api/v1/client/entidad/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setReloadData(!reloadData); // Forzar la recarga de datos
            } catch (error) {
                console.error("Error al eliminar la entidad:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <Link
                        to={"/client/entidad/create"}
                        className="inline-block px-4 py-2 text-white no-underline bg-blue-500 rounded hover:bg-blue-700"
                    >
                        Crear Entidad
                    </Link>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th className="px-4 py-2">ORDEN</th>
                                <th className="px-4 py-2">NAME</th>
                                <th className="px-4 py-2">ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!currentEntidades.length ? (
                                <tr>
                                    <td colSpan="3">
                                        <div className="flex justify-center">
                                            <BeatLoader
                                                color="#32CD32"
                                                loading={true}
                                                size={15}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentEntidades.map((entidad, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">
                                            {entidad.orden}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {entidad.nombre}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                                <Link
                                                    to={`/client/entidad/edit/${entidad.id}`}
                                                    className="text-white no-underline"
                                                >
                                                    Editar
                                                </Link>
                                            </button>
                                            <button
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                                onClick={() =>
                                                    _deleteEntidadById(
                                                        entidad.id,
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Siguiente"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(
                            entidades.length / entidadesPerPage,
                        )}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={
                            "pagination flex justify-center space-x-4"
                        }
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        previousLinkClassName={"text-gray-500 text-sm mr-2"}
                        nextLinkClassName={"text-gray-500 text-sm ml-2"}
                        pageLinkClassName={"text-gray-500 text-sm"}
                    />
                </div>
            </div>
        </div>
    );
};

export default EntidadAll;
