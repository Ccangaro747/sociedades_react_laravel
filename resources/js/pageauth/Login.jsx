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

        await axios.get("/sanctum/csrf-cookie").then((response) => {
            //Autenticación
            Config.getLogin({ email, password }).then((data) => {
                if (data.data.success) {
                    console.log(data);
                    setToken(
                        data.data.user,
                        data.data.token,
                        data.data.user.roles[0].name,
                    );
                } else {
                    setMessage("Usuario o contraseña incorrectos");
                }
            });
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="flex justify-center text-2xl font-bold text-center text-gray-900">
                    <img
                        src="/logo-2.png"
                        alt=""
                        className="w-24 h-auto mx-auto"
                    />
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
                            Enviar

                        </button>
                        <p className="mt-2 text-center">{message}</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
