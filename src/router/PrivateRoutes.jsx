import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    // Verificamos si el usuario está logueado en el localStorage
    const isLogged = localStorage.getItem('isLogged') === 'true';

    // Si está logueado, renderiza las rutas hijas (Outlet). Si no, lo manda al Login.
    return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};