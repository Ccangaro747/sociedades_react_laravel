import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AuthUser from "../pageauth/AuthUser";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const CategoriaAll = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const categoriesPerPage = 4;

    const { getToken } = AuthUser();

    useEffect(() => {
        getCategoryAll();
    }, []);

    const getCategoryAll = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/admin/categoria",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setCategories(response.data);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const currentCategories = categories.slice(
        currentPage * categoriesPerPage,
        (currentPage + 1) * categoriesPerPage,
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">NAME</th>
                                <th className="px-4 py-2">ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!currentCategories.length ? (
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
                                currentCategories.map((categoria, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">
                                            {categoria.orden}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {categoria.nombre}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                                <Link
                                                    to={`/admin/category/edit/${categoria.id}`}
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
                        pageCount={Math.ceil(
                            categories.length / categoriesPerPage,
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

export default CategoriaAll;
