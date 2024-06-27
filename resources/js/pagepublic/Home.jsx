import React, { useEffect } from "react";
import Config from "../Config";
const Home = () => {
    const [entidad, setEntidades] = React.useState([]);

    useEffect(() => {
        getEntidades();
    }, []);

    const getEntidades = async () => {
        const response = await Config.getEntidades(5);
        setEntidades(response.data);
    };

    return (
        <div className="container pt-20 pb-20 mx-auto">
            <div className="flex justify-center">
                <div className="sm:w-8/12">
                    <h1 className="text-3xl font-bold text-center">
                        DIRECTORIO DE ENTIDADES
                    </h1>

                    <div className="mt-5 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            {entidad.map((entidad) => {
                                return (
                                    <div className="mt-6" key={entidad.id}>
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold">
                                                {entidad.nombre}
                                            </h2>
                                            <p className="mt-2">
                                                {entidad.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
