import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
//Layouts
import LayoutPublic from './layouts/LayoutPublic';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutClient from './layouts/LayoutClient';
//Public Pages
import PageHome from './pagepublic/PageHome';
import ProtectedRoutes from './pageauth/ProtectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Auth Pages
import Login from './pageauth/Login';
import Register from './pageauth/Register';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPublic/>}>
          <Route index element={<PageHome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/admin" element={<LayoutAdmin/>}>
            <Route index element={<PageHome/>} />
          </Route>
          <Route path="/client" element={<LayoutClient/>}>
            <Route index element={<PageHome/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}
