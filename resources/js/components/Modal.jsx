import React from "react";
import noFotoImage from "../../../public/nofoto.png";

const Modal = ({ entidad, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-3xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                {/* Botón de cierre */}
                <button
                    className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="p-6">
                    <div className="flex flex-col items-center">
                        {/* Imagen */}
                        <div className="w-48 h-48 mb-4 overflow-hidden rounded-full">
                            <img
                                src={entidad.urlfoto || noFotoImage} //Utilziando noFotoImage si entidad.urlfoto está vacío
                                alt={entidad.nombre}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.target.src = noFotoImage;
                                }} // Mostrando noFotoImage si hay un error al cargar la imagen
                            />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold">
                            {entidad.nombre}
                        </h2>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Email:
                            </label>
                            <input
                                type="text"
                                value={entidad.email}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Descripción:
                            </label>
                            <input
                                type="text"
                                value={entidad.descripcion}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Teléfono:
                            </label>
                            <input
                                type="text"
                                value={entidad.telefono}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Dirección:
                            </label>
                            <input
                                type="text"
                                value={entidad.direccion}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Website:
                            </label>
                            <input
                                type="text"
                                value={entidad.website}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Facebook:
                            </label>
                            <input
                                type="text"
                                value={entidad.facebook}
                                readOnly
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
