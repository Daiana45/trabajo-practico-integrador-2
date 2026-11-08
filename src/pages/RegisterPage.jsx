import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Campos según lo que suele pedir el backend del TP1
    const { values, handleInputChange, handleReset } = useForm({ 
        username: '', 
        email: '', 
        password: '', 
        profile: { name: '', lastName: '' } 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setValidationErrors([]);

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const errData = await response.json();
                // Si el backend devuelve errores de express-validator (array), los mostramos
                if (errData.errors && Array.isArray(errData.errors)) {
                    setValidationErrors(errData.errors.map(e => e.msg));
                } else {
                    throw new Error(errData.message || 'Error en el registro');
                }
                return;
            }

            // Si es 201 Created, limpiamos el formulario y vamos al login
            handleReset();
            navigate('/login');
        } catch (err) {
            setValidationErrors([err.message]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>
                
                {/* Renderizado de errores de validación con map() */}
                {validationErrors.length > 0 && (
                    <ul className="text-red-500 mb-4 text-sm list-disc pl-5 bg-red-50 p-2 rounded">
                        {validationErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                    </ul>
                )}

                <input name="username" placeholder="Usuario" value={values.username} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="email" type="email" placeholder="Email" value={values.email} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="password" type="password" placeholder="Contraseña" value={values.password} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                
                {/* Datos del perfil (objeto anidado) */}
                <input name="profile.name" placeholder="Nombre" value={values.profile?.name || ''} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" />
                <input name="profile.lastName" placeholder="Apellido" value={values.profile?.lastName || ''} onChange={handleInputChange} className="w-full p-2 mb-6 border border-gray-300 rounded" />

                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition duration-200">
                    {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                </button>

                <p className="mt-4 text-center text-gray-600">
                    ¿Ya tenés cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia Sesión</Link>
                </p>
            </form>
        </div>
    );
};