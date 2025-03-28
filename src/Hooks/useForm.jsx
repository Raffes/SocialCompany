import React from 'react'

const types = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Preencha um email válido'
    },
    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: 'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digíto. Com no mínimo 8 caracteres.'
    },
    number: {
        regex: /^\d+$/,
        message: 'Utilize números apenas'
    }
    
}

const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    function validate(value) {
        if(type === false) return true;
        if(value.length === 0) {
            setError("Preencha um valor");
            return false;
        } else {
            setError(null);
            return true;
        }
    }
    
    function onChange({ target }) {
        error && validate(target.value)
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
    }
}

export default useForm
