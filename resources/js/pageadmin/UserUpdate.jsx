import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config';
import Sidebar from './Sidebar';

const UserUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [name, setName] = useState("");
    const [aprobado, setAprobado] = useState(false);

   useEffect(()=>{
    const getUserById = async()=>{
        Config.getUserById(id)
        .then(({data})=>{
            setName(data.name)
            setAprobado(data.aprobado)
        })
    };
    getUserById();
   },[])

   const submitUpdate = async (ev)=>{
    ev.preventDefault()
    await Config.getUserUpdate({aprobado},id)
    navigate('/admin/user')

   }

  return (
    <div className="container bg-light">
        <div className='row'>
        <Sidebar/>
        <div className="mt-3 mb-3 col-sm-9">
            <div className="card">
                <div className="card-header">EDITAR USER</div>
                <div className="card-body">
                <form onSubmit={submitUpdate} >
                    <div className="col-sm-12">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="mt-3 col-sm-12">
                        <div className="form-check form-switch">
                            <input className="form-check-input" checked={aprobado} onChange={(e)=>setAprobado(!aprobado)} type="checkbox" role="switch" id="aprobado"/>
                            <label className="form-check-label" htmlFor='aprobado'>Aprobado</label>
                        </div>
                    </div>
                    <div className="mt-3 btn-group">
                    <Link to={-1} className="btn btn-secondary" >← Back </Link>
                    <button type='submit' className="btn btn-primary">Actualizar User</button>
                    </div>
                </form>

                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserUpdate
