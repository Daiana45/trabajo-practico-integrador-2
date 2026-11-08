import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPages'; // *Ajusté el nombre según tu commit anterior
import { RegisterPage } from '../pages/RegisterPage';

export const AppRouter = () => {
    const isLogged = localStorage.getItem('isLogged') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Privadas */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                {/* Rutas Públicas */}
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Ruta comodín (Catch-all) para URLs inexistentes */}
                <Route path="*" element={isLogged ? <Navigate to="/" /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};