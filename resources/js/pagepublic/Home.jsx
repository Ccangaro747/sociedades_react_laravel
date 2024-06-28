import React, { useEffect, useState } from "react";
import Config from "../Config";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";

const Home = () => {
    const [entidades, setEntidades] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const entidadesPerPage = 5;

    useEffect(() => {
        getEntidades();
    }, []);

    const getEntidades = async () => {
        try {
            const response = await Config.getEntidades(1000);
            setEntidades(response.data);
        } catch (error) {
            console.error("Error al obtener las entidades:", error);
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const entidadesFiltradas = entidades.filter((entidad) =>
        entidad.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    );

    const currentEntidades = entidadesFiltradas.slice(
        currentPage * entidadesPerPage,
        (currentPage + 1) * entidadesPerPage,
    );

    return (
        <div className="container pt-20 pb-20 mx-auto">
            <div className="flex justify-center">
                <div className="sm:w-8/12">
                    <h1 className="text-3xl font-bold text-center">
                        DIRECTORIO DE ENTIDADES
                    </h1>
                    {/* Input de búsqueda */}
                    <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Buscar entidad..."
                            className="w-full px-4 py-2 border rounded shadow"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    {/* Tarjetas de entidades */}
                    <div className="mt-5 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            {!currentEntidades.length ? (
                                <div className="flex justify-center">
                                    <BeatLoader
                                        color="#32CD32"
                                        loading={true}
                                        size={15}
                                    />
                                </div>
                            ) : (
                                currentEntidades.map((entidad) => (
                                    <div className="mt-6" key={entidad.id}>
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold">
                                                {entidad.nombre}
                                            </h2>
                                            <p className="mt-2">
                                                {entidad.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Siguiente"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(
                            entidadesFiltradas.length / entidadesPerPage,
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

export default Home;
