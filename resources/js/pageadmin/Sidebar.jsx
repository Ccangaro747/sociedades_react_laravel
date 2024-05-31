import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="pt-12 pb-12 sm:w-1/4">
            <div>
                <NavLink
                    to={`/admin`}
                    className="block p-3 my-2 no-underline bg-gray-200 border rounded"

                >
                    Home
                </NavLink>
                <NavLink
                    to={`/admin/user`}
                    className="block p-3 my-2 no-underline bg-gray-200 border rounded"

                >
                    User
                </NavLink>
                <NavLink
                    to={`/admin/categoria`}
                    className="block p-3 my-2 no-underline bg-gray-200 border rounded"

                >
                    Categoria
                </NavLink>
                <NavLink
                    to={`/admin/empresa`}
                    className="block p-3 my-2 no-underline bg-gray-200 border rounded"
                    
                >
                    Empresa
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

