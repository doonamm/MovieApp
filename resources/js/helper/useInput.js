import { useState } from "react";

export default function useInput(defaultState = '', defaultError = false){
    const [value, setValue] = useState(defaultState);
    const [error, setError] = useState(defaultError);
    
    return {
        value,
        setValue,
        error,
        setError
    }
};