import {instance} from './instance';

export const ReqType = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

function getRequest(type, url, body, headers){
    switch(type){
        case ReqType.GET:
            return instance.get(url, {
                headers: headers,
                params: body
            });
        case ReqType.POST:
            return instance.post(url, body, {headers: headers});
        case ReqType.PUT:
            return instance.put(url, body, {headers: headers});
        case ReqType.DELETE:
            return instance.delete(url, {
                headers: headers,
                data: body
            });
        default: 
            return null;
    }
}

/**
 * Create axios request
 * @param {string} type
 * @param {string} url 
 * @param {object} body 
 * @param {callback} onFail 
 * @param {callback} onSuccess 
 * @param {callback} loader 
 */
export function request(type, url, body, onFail, onSuccess, loader, headers){
    if(loader){
        loader(true);
    }
    getRequest(type, url, body, headers)
    .then(res => {
        if(res.status === 'fail'){
            if(onFail){
                onFail();
            }
            throw res;
        }
        if(onSuccess){
            onSuccess(res);
        }
    })
    .catch(err => {
        console.log(err);
    })
    .finally(()=>{
        if(loader){
            loader(false);
        }
    });
}