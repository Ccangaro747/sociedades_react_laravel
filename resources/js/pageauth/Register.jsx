import React from 'react'

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="mb-5 text-2xl font-bold text-gray-900">Registro</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                    </div>
                    <div className="mb-6">
                        <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
