import React from "react";
import Sidebar from "./Sidebar";

const PanelAdmin = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <h1 className="text-2xl font-semibold text-center">PanelAdmin</h1>
                </div>
            </div>
        </div>
    );
};

export default PanelAdmin;
