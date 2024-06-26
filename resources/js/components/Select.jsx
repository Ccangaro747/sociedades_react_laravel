import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthUser from "../pageauth/AuthUser";

const Select = ({ data, selected }) => {
    const [options, setOptions] = useState([]);
    const { getToken } = AuthUser();

    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = async () => {
        const token = getToken(); 
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/admin/categoria",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setOptions(response.data);
        } catch (error) {
            console.error("Error al obtener las opciones:", error);
        }
    };

    return (
        <select className='form-control' value={data} onChange={(e) => selected(e.target.value)}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.nombre}
                </option>
            ))}
            <option value=""></option>
        </select>
    );
};

export default Select;
