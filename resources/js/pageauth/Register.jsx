import React, { useEffect, useState } from 'react'
import Config from '../Config';
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

        Config.getRegister({name,email,password})
        .then(({data})=>{
            if(data.success){
                navigate("/login")
            }
        })

    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="mb-5 text-2xl font-bold text-center text-gray-900">Registro</h2>
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
                        <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button" onClick={submitRegistro}>
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
