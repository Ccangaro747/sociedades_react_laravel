import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
    return (
        <div>
            <h1>Admin</h1>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutAdmin;
