import React, { useEffect, useState } from "react";
import axios from "axios"; // Importar axios
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser"; // Importar AuthUser
import ReactPaginate from "react-paginate"; // Importar ReactPaginate
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const UserAll = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const usersPerPage = 4; // Usuarios por página

    const { getToken } = AuthUser(); // Obtener getToken de AuthUser

    useEffect(() => {
        getUserAll();
    }, []);

    const getUserAll = async () => {
        const token = getToken(); // Obtener el token de autenticación
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/admin/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Usar el token obtenido
                    },
                },
            );

            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Función para manejar el cambio de página
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Obtener los usuarios para la página actual
    const currentUsers = users.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage,
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">NAME</th>
                                <th className="px-4 py-2">ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!currentUsers.length ? (
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
                                currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">
                                            {user.id}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                                <Link
                                                    to={`/admin/user/edit/${user.id}`}
                                                    className="text-white no-underline"
                                                >
                                                    Editar
                                                </Link>
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
                        pageCount={Math.ceil(users.length / usersPerPage)}
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

export default UserAll;
