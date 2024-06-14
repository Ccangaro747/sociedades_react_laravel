import React, { useEffect, useState } from "react";
import Config from "../Config";

const Select = ({ data, selected }) => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = async () => {
        const response = await Config.getCategoriaAll();
        setOptions(response.data);
    };
    return (
        <select className='form-control' value={data} onChange={(e)=>{selected(e.target.value)}}>
            {options.map((option) => {
                return (
                    <option key={option.id} value={option.id}>
                        {option.nombre}
                    </option>
                );
            })}
            <option value=""></option>
        </select>
    );
};

export default Select;
