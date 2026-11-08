import { useState } from 'react';

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    // Función para manejar cuando el usuario escribe en un input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Forma funcional del setter: usamos 'prev' (el estado anterior) 
        // para no borrar los otros campos mientras actualizamos el actual.
        setValues(prev => ({ ...prev, [name]: value }));
    };

    // Función para limpiar el formulario (útil después de un registro exitoso)
    const handleReset = () => {
        setValues(initialValues);
    };

    return { values, handleInputChange, handleReset };
};