import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const Register = () => {
    const { getToken } = AuthUser()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        if(getToken()){
          navigate("/")
        }
    },[])

    const submitRegistro = async(e) =>{
        e.preventDefault();

        // Primero, obtenemos la cookie CSRF
        await axios.get("/sanctum/csrf-cookie").then((response) => {
            // Luego, hacemos la solicitud de registro
            axios.post("/api/v1/auth/register", { name, email, password }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': response.data.csrfToken // Aquí enviamos el token CSRF
                }
            }).then((data) => {
                if (data.data.success) {
                    navigate("/login")
                }
            }).catch((error) => {
                console.error('Error al registrarse:', error);
            });
        });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="flex justify-center text-2xl font-bold text-center text-gray-600">Registro</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <button className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline" type="button" onClick={submitRegistro}>
                            Enviar
                        </button>
                    </div>
                    <div className="text-xs text-center">
                        Al registrarte, aceptas nuestros <a href="/terminos-y-condiciones" className="text-blue-500 underline">Términos y Condiciones</a>.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
