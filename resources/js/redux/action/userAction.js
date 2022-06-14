export const type = {
    SET_ID: 'SET_ID',
    SET_NICKNAME: 'SET_NICKNAME',
    SET_AVATAR: 'SET_AVATAR',
    SET_INFO: 'SET_INFO'
};

export const setId = id => {
    localStorage.setItem('user_id', id);
    return {
        type: type.SET_ID,
        payload: id
    };
};

export const setNickname = nickname => {
    return {
        type: type.SET_NICKNAME,
        payload: nickname
    };
};

export const setAvatar = avatar => {
    return {
        type: type.SET_AVATAR,
        payload: avatar
    };
};

export const setInfo = (payload) => {
    return {
        type: type.SET_INFO,
        payload: payload
    };
};