import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función async declarada FUERA del useEffect 
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Enviamos credentials: 'include' para que el navegador mande la cookie del JWT
            const response = await fetch(url, { credentials: 'include' });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            // finally se ejecuta siempre, haya error o no. Perfecto para apagar el loading.
            setIsLoading(false);
        }
    };

    // El useEffect SOLO invoca la función. Nunca es async directamente.
    useEffect(() => {
        fetchData();
    }, [url]); 

    // Devolvemos lo que las páginas van a necesitar
    return { data, isLoading, error };
};