// Modal.jsx
import React from 'react';

const Modal = ({ entidad, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
                {/* Contenido del modal */}
                <div className="relative flex flex-col w-full p-8 bg-white rounded-lg shadow-lg">
                    <button
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <svg
                            className="w-6 h-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{entidad.nombre}</h2>
                        {entidad.urlfoto && (
                            <div className="my-4">
                                <img
                                    src={entidad.urlfoto}
                                    alt={entidad.nombre}
                                    className="rounded-lg shadow-md"
                                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                                />
                            </div>
                        )}
                        <p className="mt-2">{entidad.email}</p>
                        <p className="mt-2">{entidad.descripcion}</p>
                        <p className="mt-2">{entidad.telefono}</p>
                        <p className="mt-2">{entidad.direccion}</p>
                        <p className="mt-2">{entidad.website}</p>
                        <p className="mt-2">{entidad.facebook}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
