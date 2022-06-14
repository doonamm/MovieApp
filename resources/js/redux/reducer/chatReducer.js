import { type } from "../action/chatAction"; 

const defaultState = {

}

export default function reducer(state = defaultState, action){
    switch(action.type){
        case type.ADD_MSG:
            let list = !defaultState[action.movieId] ? [] : defaultState[action.movieId];
            return {
                ...state,
                [action.movieId]: [
                    ...list,
                    action.msg
                ]
            };
        default:
            return state;
    }
}