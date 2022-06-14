export const type = {
    ADD_MSG: 'ADD_MSG'
};

export const addMsg = (movieId, msg) => {
    return{
        type: type.ADD_MSG,
        payload: {
            movieId: movieId,
            msg: msg
        }
    };
};