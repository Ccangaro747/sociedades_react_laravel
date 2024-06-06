import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import axios from "axios";

const Login = () => {
    const { setToken, getToken } = AuthUser();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    //Necesitamos que solamente esté el usuario que no tiene ninguna autenticación es decir cualquier visitante pueda ver el login
    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    //Tambien como en el caso de Register, tenemos que enviar un formulario
    const submitLogin = async (e) => {
        e.preventDefault();

        // Primero, obtenemos la cookie CSRF
        await axios.get("/sanctum/csrf-cookie").then((response) => {
            // Luego, hacemos la solicitud de login
            axios.post("/api/v1/auth/login", { email, password }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': response.data.csrfToken // Aquí enviamos el token CSRF
                }
            }).then((data) => {
                if (data.data.success) {
                    console.log(data);
                    // Si el login es exitoso, guardamos el token de autenticación
                    setToken(
                        data.data.user,
                        data.data.token,
                        data.data.user.roles[0].name,
                    );
                    navigate("/");
                } else {
                    setMessage("Error al iniciar sesión");
                }
            }).catch((error) => {
                console.error('Error al iniciar sesión:', error);
            });
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="flex justify-center text-2xl font-bold text-center text-gray-600">
                    Iniciar Sesión
                    {/*
                    <img
                    src="/logo-2.png"
                    alt=""
                    className="w-24 h-auto mx-auto"
                    />
                    */}
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={submitLogin}
                        >
                            Ingresar
                        </button>
                        <p className="mt-2 text-center">{message}</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
