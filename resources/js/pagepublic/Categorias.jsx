import React, { useEffect, useState } from 'react'
import Config from '../Config';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, [])

  const getCategorias = async () => {
    const response = await Config.CategoriaAll();
    setCategorias(response.data);
  }

  return (
    <div className="container py-5 mx-auto">
      <div className="flex justify-center">
        <div className="w-4/5">
          <h1 className="mb-8 text-3xl font-bold text-center">CATEGORIAS</h1>
          <div className="flex flex-wrap -mx-4">
            {categorias.map((categoria) => (
              <div className="w-full px-4 mb-8 sm:w-1/3" key={categoria.id}>
                <div className="overflow-hidden bg-white rounded-lg shadow-md">
                  <div className="p-4">
                    <img src={`/img/categoria/${categoria.urlfoto}`} className="block w-full h-auto mx-auto" alt={categoria.nombre} />
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <a href={`/categorias/${categoria.slug}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white no-underline bg-green-600 border border-transparent rounded-md hover:bg-green-700">{categoria.nombre}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categorias
