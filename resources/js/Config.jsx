import axios from "axios";

const base_api_url="http://localhost:8000/api/v1";

//Route

export default{
    //Auth
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`,data), // Se crea en el Register.jsx, se podría eliminar o dejar de referencia
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`,data), // Se crea en el Login.jsx, se podría eliminar o dejar de referencia
    getLogout:(data)=>axios.post(`${base_api_url}/auth/logout`,data), //Se crea en el Navbar.jsx, se podría eliminar o dejar de referencia


    // Rol Admin
    getUserAll:()=>axios.get(`${base_api_url}/admin/user`), //Se crea en el UserAll.jsx, se podría eliminar o dejar de referencia
    getUserById:(id)=>axios.get(`${base_api_url}/admin/user/${id}`), //Se crea en el UserUpdate.jsx, se podría eliminar o dejar de referencia
    getUserApdate:(data,id)=>axios.put(`${base_api_url}/admin/user/${id}`,data), //Se crea en el UserUpdate.jsx, se podría eliminar o dejar de referencia

    getCategoriaAll:()=>axios.get(`${base_api_url}/admin/categoria`), //Se crea en el CategoriaAll.jsx, se podría eliminar o dejar de referencia
    getCategoriaStore:(data)=>axios.post(`${base_api_url}/admin/categoria`,data), //Se crea en el CategoriaStore.jsx, se podría eliminar o dejar de referencia
    getCategoriaById:(id)=>axios.get(`${base_api_url}/admin/categoria/${id}`), //Se crea en el CategoriaUpdate.jsx, se podría eliminar o dejar de referencia
    getCategoriaUpdate:(data,id)=>axios.put(`${base_api_url}/admin/categoria/${id}`,data), //Se crea en el CategoriaUpdate.jsx, se podría eliminar o dejar de referencia
    getCategoriaDeleteById:(id)=>axios.delete(`${base_api_url}/admin/categoria/${id}`), //Se crea en el CategoriaAll.jsx, se podría eliminar o dejar de referencia

    getEntidadAll:()=>axios.get(`${base_api_url}/admin/entidad`), //Se crea en el EntidadAll.jsx, se podría eliminar o dejar de referencia
    getEntidadById:(id)=>axios.get(`${base_api_url}/admin/entidad/${id}`), //Se crea en el EntidadUpdate.jsx, se podría eliminar o dejar de referencia
    getEntidadUpdate:(data,id)=>axios.put(`${base_api_url}/admin/entidad/${id}`,data), //Se crea en el EntidadUpdate.jsx, se podría eliminar o dejar de referencia

    // Rol Client
    getEntidadAllClient:()=>axios.get(`${base_api_url}/client/entidad`), //Se crea en el EntidadAll.jsx --> pageclient, se podría eliminar o dejar de referencia
    getEntidadStoreClient:(data)=>axios.post(`${base_api_url}/client/entidad`,data), //Se crea en el EntidadStore.jsx --> pageclient, se podría eliminar o dejar de referencia
}
