export const type = {
    SET_LOGGED: 'SET_LOGGED',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export const login = ()=>{
    return{
        type: type.LOGIN
    };
};

export const logout = ()=>{
    return{
        type: type.LOGOUT
    };
};

export const setLogged = (isLogged)=>{
    return{
        type: type.SET_LOGGED,
        payload: isLogged
    };
};