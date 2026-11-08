import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Inicializamos el hook con los campos que necesita el backend
    const { values, handleInputChange } = useForm({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // ¡Obligatorio para que el navegador guarde la cookie!
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Credenciales incorrectas');
            }

            // Si la respuesta es 200 OK, guardamos el estado en localStorage
            localStorage.setItem('isLogged', 'true');
            navigate('/'); // Redirigimos a la HomePage
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                
                {error && <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
                >
                    {isLoading ? 'Ingresando...' : 'Entrar'}
                </button>

                <p className="mt-4 text-center text-gray-600">
                    ¿No tenés cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrate</Link>
                </p>
            </form>
        </div>
    );
};