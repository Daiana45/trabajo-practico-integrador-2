import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Petición al backend para limpiar la cookie de sesión
            const response = await fetch('http://localhost:3005/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Importante para enviar/limpiar la cookie
            });

            if (response.ok) {
                // Si salió bien, limpiamos el localStorage y vamos al login
                localStorage.removeItem('isLogged');
                navigate('/login');
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <Link to="/" className="text-xl font-bold hover:text-gray-300">
                Mi Blog
            </Link>
            <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
                Logout
            </button>
        </nav>
    );
};