import React, { useEffect, useState } from 'react'
import axios from 'axios'; // Importar axios
import Sidebar from './Sidebar'
import AuthUser from "../pageauth/AuthUser"; // Importar AuthUser

const UserAll = () => {

    const [users, setUsers] = useState()
    const { getToken } = AuthUser(); // Obtener getToken de AuthUser

    useEffect(() => {
        getUserAll();
    },[])

    const getUserAll = async () => {
        const token = getToken(); // Obtener el token de autenticación
        try {
            const response = await axios.get('http://localhost:8000/api/v1/admin/user', {
                headers: {
                    'Authorization': `Bearer ${token}` // Usar el token obtenido
                }
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
        <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
            <Sidebar />
            <div className="p-6 sm:w-9/12">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">NAME</th>
                            <th className="px-4 py-2">ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !users ? (
                                <tr>
                                    <td colSpan="3">...Loading</td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">{user.id}</td>
                                        <td className="px-4 py-2 border">{user.name}</td>
                                        <td className="px-4 py-2 border">
                                            <button className="px-2 py-1 mr-2 text-white bg-blue-500 rounded">EDIT</button>
                                            <button className="px-2 py-1 text-white bg-red-500 rounded">DELETE</button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default UserAll
