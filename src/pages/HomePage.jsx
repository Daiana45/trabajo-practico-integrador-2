import { useFetch } from '../hooks/useFetch';
import { Navbar } from '../components/Navbar';

export const HomePage = () => {
    // Usamos nuestro custom hook para traer los artículos
    const { data: articles, isLoading, error } = useFetch('http://localhost:3005/api/articles');

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Artículos Publicados
                </h1>

                {/* Estado de Carga */}
                {isLoading && (
                    <p className="text-blue-500 text-lg">Cargando artículos...</p>
                )}

                {/* Estado de Error */}
                {error && (
                    <p className="text-red-500 text-lg">Error: {error}</p>
                )}

                {/* Lista vacía */}
                {!isLoading && !error && articles?.length === 0 && (
                    <p className="text-gray-600">No hay artículos publicados aún.</p>
                )}

                {/* Renderizado de la lista con map() y key estable */}
                <div className="grid gap-4">
                    {!isLoading && !error && articles?.map(article => (
                        <div key={article._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {article.excerpt}
                            </p>
                            <p className="text-sm text-gray-400">
                                Autor: {article.author?.username || 'Desconocido'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};