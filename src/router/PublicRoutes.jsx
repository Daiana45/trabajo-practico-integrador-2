import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
    // Verificamos si el usuario NO está logueado
    const isLogged = localStorage.getItem('isLogged') === 'true';

    // Si NO está logueado, renderiza las rutas hijas. Si ya está logueado, lo manda al Home.
    return !isLogged ? <Outlet /> : <Navigate to="/" replace />;
};