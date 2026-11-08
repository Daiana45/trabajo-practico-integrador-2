import { useState } from 'react';

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Si el nombre del campo tiene un punto (ej: "profile.name")
        if (name.includes('.')) {
            const [parent, child] = name.split('.'); // Separa "profile" y "name"
            
            setValues(prev => ({
                ...prev,
                [parent]: {
                    // Mantenemos lo que ya haya en el objeto padre
                    ...prev[parent], 
                    // Y actualizamos solo la propiedad hija
                    [child]: value 
                }
            }));
        } else {
            // Comportamiento normal para campos planos (username, email, password)
            setValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return { values, handleInputChange, handleReset };
};