import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitForgotPassword = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/v1/auth/forgot-password", { email });
            setMessage("Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico.");
            setError("");
        } catch (error) {
            setError("Error al enviar el enlace de restablecimiento de contraseña. Por favor, verifica tu correo electrónico e inténtalo de nuevo.");
            setMessage("");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
                    Olvidé mi contraseña
                </h2>
                <form onSubmit={submitForgotPassword}>
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
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Enviar enlace
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-green-500">{message}</p>}
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
