export const type = {
    SET_ID: 'SET_ID',
    SET_NICKNAME: 'SET_NICKNAME',
    SET_AVATAR: 'SET_AVATAR',
    SET_INFO: 'SET_INFO',
    SET_ROLE: 'SET_ROLE'
};

export const setId = id => {
    localStorage.setItem('user_id', id);
    return {
        type: type.SET_ID,
        payload: id
    };
};

export const setRole = role => {
    localStorage.setItem('role', role);
    return {
        type: type.SET_ROLE,
        payload: role
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