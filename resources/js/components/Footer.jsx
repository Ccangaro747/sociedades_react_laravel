import React from "react";

const Footer = () => {
    return (
        <footer className="w-full p-4 bg-white shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="flex items-center justify-center w-full md:w-auto">
                    <a
                        className="text-gray-600 no-underline hover:text-black hover:no-underline"
                        href="#"
                    >
                        © 2024 Municipalidad de Mercedes. Todos los derechos
                        reservados.
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
