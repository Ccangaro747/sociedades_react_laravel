import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthUser from "./AuthUser";

const Register = () => {
    const { getToken } = AuthUser();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    const submitRegistro = async (e) => {
        e.preventDefault();

        await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post(
                    "/api/v1/auth/register",
                    { name, email, password },
                    {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "X-CSRF-TOKEN": response.data.csrfToken,
                        },
                    },
                )
                .then((data) => {
                    if (data.data.success) {
                        navigate("/login");
                    } else {
                        setMessage(
                            "Error en el registro. Por favor, inténtelo de nuevo.",
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error al registrarse:", error);
                    setMessage(
                        "Error en el registro. Por favor, inténtelo de nuevo.",
                    );
                });
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2
                    className="mb-6 text-3xl font-bold text-center"
                    style={{ color: "#777372" }}
                >
                    Registro
                </h2>
                <form onSubmit={submitRegistro}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:bg-white focus:border-green-400"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:bg-white focus:border-green-400"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:bg-white focus:border-green-400"
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Enviar
                        </button>
                        <p className="mt-4 text-center text-red-600">
                            {message}
                        </p>
                    </div>
                    <div className="text-xs text-center">
                        Al registrarte, aceptas nuestros{" "}
                        <Link
                            to="/terminos-y-condiciones"
                            className="text-blue-500 underline"
                        >
                            Términos y Condiciones
                        </Link>
                        .
                    </div>
                    <div className="mt-4 text-xs text-center">
                        <Link
                            to="/forgot-password"
                            className="text-blue-500 underline"
                        >
                            Olvidé mi contraseña
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
