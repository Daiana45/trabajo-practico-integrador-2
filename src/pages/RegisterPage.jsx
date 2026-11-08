import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado local directo (sin hook useForm)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setValidationErrors([]);

        console.log("📤 Enviando al backend:", formData); // Para verificar qué se envía

        try {
            const response = await fetch('http://localhost:3005/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json();
                console.log("🔴 Respuesta del backend:", errData);
                
                let errores = [];
                if (errData.errors && Array.isArray(errData.errors)) {
                    errores = errData.errors.map(e => e.mensaje || e.msg || e.message);
                } else if (errData.message) {
                    errores = [errData.message];
                } else {
                    errores = ['Error desconocido en el registro'];
                }
                
                setValidationErrors(errores);
                return;
            }

            handleReset();
            navigate('/login');
        } catch (err) {
            setValidationErrors(['Error de conexión con el servidor']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>
                
                {validationErrors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <ul className="list-disc pl-5">
                            {validationErrors.map((err, idx) => (
                                <li key={idx} className="text-sm font-medium">{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <input name="username" placeholder="Usuario" value={formData.username} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="password" type="password" placeholder="Contraseña (mín 8, mayús y minús)" value={formData.password} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleInputChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
                <input name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleInputChange} className="w-full p-2 mb-6 border border-gray-300 rounded" required />

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