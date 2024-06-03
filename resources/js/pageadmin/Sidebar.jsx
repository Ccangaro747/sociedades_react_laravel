import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="pt-12 pb-12 sm:w-1/4">
            <div>
                <NavLink
                    to={`/admin/user`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline bg-white rounded-lg shadow-lg group ring-1"
                >
                    User
                </NavLink>
                <NavLink
                    to={`/admin/categoria`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline bg-white rounded-lg shadow-lg group ring-1"
                >
                    Categoría
                </NavLink>
                <NavLink
                    to={`/admin/empresa`}
                    className="block max-w-xs p-6 mx-auto my-2 space-y-3 text-black no-underline bg-white rounded-lg shadow-lg group ring-1"
                >
                    Entidad
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;

/*
Con Bootstrap.
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="pt-3 pb-3 col-sm-3">
            <div className="list-group">
                <NavLink
                    to={`/admin`}
                    className="p-3 my-2 no-underline bg-gray-200 border rounded list-group-item"
                    activeClassName="active"
                >
                    Home
                </NavLink>
                <NavLink
                    to={`/admin/user`}
                    className="p-3 my-2 no-underline bg-gray-200 border rounded list-group-item"
                    activeClassName="active"
                >
                    User
                </NavLink>
                <NavLink
                    to={`/admin/categoria`}
                    className="p-3 my-2 no-underline bg-gray-200 border rounded list-group-item"
                    activeClassName="active"
                >
                    Categoria
                </NavLink>
                <NavLink
                    to={`/admin/empresa`}
                    className="p-3 my-2 no-underline bg-gray-200 border rounded list-group-item"
                    activeClassName="active"
                >
                    Empresa
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;

*/
