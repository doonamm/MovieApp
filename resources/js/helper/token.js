export function getToken(){
    const token = localStorage.getItem('access');
    if(!token){
        return null;   
    }
    return 'Bearer ' + localStorage.getItem('access');
};

export function storeToken(accessToken){
    if(accessToken){
        localStorage.setItem('access', accessToken);
    }
}

export function clearToken(){
    localStorage.clear();
}