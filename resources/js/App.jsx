import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
//Layouts
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";
//Public Pages
import PageHome from "./pagepublic/PageHome";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
//Auth Pages
import Login from "./pageauth/Login";
import Register from "./pageauth/Register";
import PanelAdmin from "./pageadmin/PanelAdmin";
import PageClient from "./pageclient/PageClient";

//rol ADMIN Pages
import UserAll from "./pageadmin/UserAll";
import UserUpdate from "./pageadmin/UserUpdate";

const RedirectToUser = () => {
    let navigate = useNavigate();
    React.useEffect(() => {
        navigate("/admin/user");
    }, [navigate]);
    return null;
};

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

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(<App />);
}
