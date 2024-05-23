import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
    return (
        <div>
            <h1>Client</h1>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutClient;
