export function getToken(){
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