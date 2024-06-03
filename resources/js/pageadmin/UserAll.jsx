import React from 'react'
import Sidebar from './Sidebar'

const UserAll = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
        <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
            <Sidebar />
            <div className="p-6 sm:w-9/12">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="px-4 py-2">ORDEN</th>
                            <th className="px-4 py-2">NAME</th>
                            <th className="px-4 py-2">ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border">1</td>
                            <td className="px-4 py-2 border">John</td>
                            <td className="px-4 py-2 border">
                                <button className="px-2 py-1 mr-2 text-white bg-blue-500 rounded">EDIT</button>
                                <button className="px-2 py-1 text-white bg-red-500 rounded">DELETE</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default UserAll