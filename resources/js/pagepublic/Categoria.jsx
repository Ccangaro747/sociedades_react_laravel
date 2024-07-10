import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Modal from "../components/Modal";
import { BeatLoader } from "react-spinners";

const Categoria = () => {
    const { slug } = useParams();
    const [modal, setModal] = useState(false);
    const [datamodal, setDatamodal] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [entidades, setEntidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategoria = async () => {
            try {
                const response = await Config.CategoriaBySlug(slug);
                if (response.data) {
                    setCategoria(response.data.categoria);
                    setEntidades(response.data.entidades || []);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error al obtener la categoría:", error);
            } finally {
                setLoading(false);
            }
        };
        getCategoria();
    }, [slug, navigate]);

    const showModal = (e, entidad) => {
        e.preventDefault();
        setModal(true);
        setDatamodal(entidad);
    };

    const closeModal = () => {
        setModal(false);
    };

    return (
        <div className="container pt-20 pb-20 mx-auto">
            <div className="flex justify-center">
                <div className="sm:w-8/12">
                    <h1 className="text-3xl font-bold text-center">
                        Entidades de {categoria?.nombre}
                    </h1>
                    <div className="mt-5 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            {loading ? (
                                <div className="flex justify-center">
                                    <BeatLoader
                                        color="#32CD32"
                                        loading={true}
                                        size={15}
                                    />
                                </div>
                            ) : !entidades.length ? (
                                <div className="flex justify-center">
                                    <p>No se encontraron entidades.</p>
                                </div>
                            ) : (
                                entidades.map((entidad) => (
                                    <div
                                        className="mt-6 cursor-pointer"
                                        key={entidad.id}
                                        onClick={(e) => showModal(e, entidad)}
                                    >
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
                    {modal && datamodal && (
                        <Modal entidad={datamodal} onClose={closeModal} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categoria;
