import { type } from "../action/loginAction";

//must declare defualt state
const defaultState = {
    isLogged: false
};

export default function reducer(state = defaultState, action){
    switch(action.type){
        case type.LOGIN:
            return{
                ...state,
                isLogged: true
            };
        case type.LOGOUT:
            return{
                ...state,
                isLogged: false
            };
        case type.SET_LOGGED:
            return{
                ...state,
                isLogged: action.payload
            };
        default:
            return state;
    }
}