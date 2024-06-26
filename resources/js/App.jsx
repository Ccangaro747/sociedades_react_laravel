// Importamos las librerías necesarias
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los layouts
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";

// Importamos las páginas públicas
import Home from "./pagepublic/Home";
import Categorias from "./pagepublic/Categorias";
import Categoria from "./pagepublic/Categoria";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";

// Importamos los componentes de react-router-dom y el hook useNavigate
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

// Importamos las páginas de autenticación
import Login from "./pageauth/Login";
import Register from "./pageauth/Register";
import PanelAdmin from "./pageadmin/PanelAdmin";
import ForgotPassword from "./pageauth/ForgotPassword";

// Importamos las páginas para el rol ADMIN
import UserAll from "./pageadmin/UserAll";
import UserUpdate from "./pageadmin/UserUpdate";
import CategoriaAll from "./pageadmin/CategoriaAll";
import CategoriaStore from "./pageadmin/CategoriaStore";
import CategoriaUpdate from "./pageadmin/CategoriaUpdate";
import EntidadAll from "./pageadmin/EntidadAll";
import EntidadUpdate from "./pageadmin/EntidadUpdate";

// Importamos las páginas para el rol CLIENT
import PanelClient from "./pageclient/PanelClient";
import EntidadAllClient from "./pageclient/EntidadAll";
import EntidadStoreClient from "./pageclient/EntidadStore";
import EntidadUpdateClient from "./pageclient/EntidadUpdate";

// Importamos la página NotFound
import NotFound from "./pagepublic/NotFound";




// Creamos un componente para redirigir al usuario a "/admin/user"
const RedirectToUser = () => {
    let navigate = useNavigate();
    React.useEffect(() => {
        navigate("/admin/user");
    }, [navigate]);
    return null;
};
// Creamos un componente para redirigir al usuario a "/client/entidad"
const RedirectToClientEntity = () => {
    let navigate = useNavigate();
    React.useEffect(() => {
        navigate("/client/entidad");
    }, [navigate]);
    return null;
};

// Definimos el componente principal de la aplicación
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutPublic />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route index element={<Home />} />
                    <Route path='/categorias' element={<Categorias/>} />
                    <Route path='/categorias/:slug' element={<Categoria/>} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route index element={<RedirectToUser />} />
                        <Route path="user" element={<UserAll />} />
                        <Route path="user/edit/:id" element={<UserUpdate />} />
                        <Route path="categoria" element={<CategoriaAll />} />
                        <Route path="categoria/create" element={<CategoriaStore />} />
                        <Route path="categoria/edit/:id" element={<CategoriaUpdate />} />
                        <Route path="entidad" element={<EntidadAll />} />
                        <Route path="entidad/edit/:id" element={<EntidadUpdate />}/>
                    </Route>
                    <Route path="/client" element={<LayoutClient />}>
                        <Route index element={<RedirectToClientEntity />} />
                        <Route path="entidad" element={<EntidadAllClient />} />

                        <Route path="entidad/create" element={<EntidadStoreClient/>}/>
                        <Route path='entidad/edit/:id' element={<EntidadUpdateClient/>} />
                        <Route path="entidad/create" element={<EntidadStoreClient/>} />
                        <Route path="entidad/edit/:id" element={<EntidadUpdateClient />}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

// Exportamos el componente principal
export default App;

// Renderizamos la aplicación en el elemento con id "root"
if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    Index.render(<App />);
}
