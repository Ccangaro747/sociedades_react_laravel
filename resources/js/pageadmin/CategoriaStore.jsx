import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Config from '../Config'

const CategoriaStore = () => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState("")
    const [orden, setOrden] = useState("")
    const [urlfoto, setUrlfoto] = useState("")
    const navigate = useNavigate()

    const handleInputChange= async(e) =>{
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e)=>{
            setUrlfoto(e.target.result)
        }
    }

    const submitStore = async(e) =>{
        e.preventDefault();
        await Config.getCategoriaStore({nombre,descripcion,orden,urlfoto})
        navigate('/admin/categoria')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
            <div className="container flex flex-col-reverse mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:flex-row">
                <Sidebar />
                <div className="p-6 sm:w-9/12">
                    <form onSubmit={submitStore}>
                        <div className='flex flex-col sm:flex-row'>
                            <div className="sm:w-8/12">
                                <label>Nombre</label>
                                <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text'/>
                            </div>
                            <div className="sm:w-4/12">
                                <label>Orden</label>
                                <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='number'/>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label>Descripción:</label>
                            <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                        <div className='mt-3'>
                            <label>Imagen:</label>
                            <input className="form-control" type="file" onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="flex mt-5 space-x-4">
                            <Link to={-1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700" >← Back </Link>
                            <button type='submit' className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Crear Categoria</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoriaStore
