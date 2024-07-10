import React from "react";
import Sidebar from "./Sidebar";

const PanelAdmin = () => {
    const containerClasses = "flex flex-col items-center justify-center min-h-screen sm:flex-row";
    const innerContainerClasses = "container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row";
    const contentClasses = "p-6 sm:w-9/12";

    return (
        <div className={containerClasses}>
            <div className={innerContainerClasses}>
                <Sidebar />
                <div className={contentClasses}>
                    <h1 className="text-2xl font-semibold text-center">PanelAdmin</h1>
                </div>
            </div>
        </div>
    );
};

export default PanelAdmin;
