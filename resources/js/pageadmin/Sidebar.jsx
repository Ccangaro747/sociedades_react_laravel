import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="pt-12 pb-12 sm:w-1/4">
            <div>
                <NavLink
                    to={`/admin/user`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline transition duration-500 ease-in-out transform bg-white rounded-lg shadow-lg group ring-1 hover:scale-105"
                >
                    Usuarios
                </NavLink>
                <NavLink
                    to={`/admin/categoria`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline transition duration-500 ease-in-out transform bg-white rounded-lg shadow-lg group ring-1 hover:scale-105"
                >
                    Categoría
                </NavLink>
                <NavLink
                    to={`/admin/entidad`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline transition duration-500 ease-in-out transform bg-white rounded-lg shadow-lg group ring-1 hover:scale-105"
                >
                    Entidad
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
