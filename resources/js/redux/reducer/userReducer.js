import { type } from "../action/userAction";

const defautlState = {};

export default function reducer(state =  defautlState, action){
    switch(action.type){
        case type.SET_ID:
            return {
                ...state,
                id: action.payload
            };
        case type.SET_ROLE:
            return {
                ...state,
                role: action.payload
            };
        case type.SET_NAME:
            return {
                ...state,
                nickname: state.payload
            };
        case type.SET_AVATAR:
            return {
                ...state,
                avatar_url: state.avatar
            };
        case type.SET_INFO:
            return action.payload;
        default:
            return state;
    }
}