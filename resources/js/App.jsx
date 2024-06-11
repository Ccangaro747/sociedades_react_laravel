// Importamos las librerías necesarias
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los layouts
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";

// Importamos las páginas públicas
import PageHome from "./pagepublic/PageHome";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";

// Importamos los componentes de react-router-dom y el hook useNavigate
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

// Importamos las páginas de autenticación
import Login from "./pageauth/Login";
import Register from "./pageauth/Register";
import PanelAdmin from "./pageadmin/PanelAdmin";
import PageClient from "./pageclient/PageClient";

// Importamos las páginas para el rol ADMIN
import UserAll from "./pageadmin/UserAll";
import UserUpdate from "./pageadmin/UserUpdate";
import CategoriaAll from "./pageadmin/CategoriaAll";
import CategoriaStore from "./pageadmin/CategoriaStore";
import CategoriaUpdate from "./pageadmin/CategoriaUpdate";
import EntidadAll from "./pageadmin/EntidadAll";
import EntidadUpdate from "./pageadmin/EntidadUpdate";

// Creamos un componente para redirigir al usuario a "/admin/user"
const RedirectToUser = () => {
    let navigate = useNavigate();
    React.useEffect(() => {
        navigate("/admin/user");
    }, [navigate]);
    return null;
};

// Definimos el componente principal de la aplicación
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutPublic />}>
                    <Route index element={<PageHome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route index element={<RedirectToUser />} />
                        <Route path="user" element={<UserAll />} />
                        <Route path="user/edit/:id" element={<UserUpdate />} />
                        <Route path="categoria" element={<CategoriaAll />} />
                        <Route path="categoria/create" element={<CategoriaStore />} />
                        <Route path='categoria/edit/:id' element={<CategoriaUpdate/>} />
                        <Route path='entidad' element={<EntidadAll/>} />
                        <Route path="entidad/edit/:id" element={<EntidadUpdate />} />
                    </Route>
                    <Route path="/client" element={<LayoutClient />}>
                        <Route index element={<PageHome />} />
                        <Route index element={<PageClient />} />
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
