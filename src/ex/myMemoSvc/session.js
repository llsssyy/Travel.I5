let loginedSessionID = '';

// getter & setter

export const setLoginedSessionID = (id = '') => {
    console.log('[session] setLoginedSessionID()');

    loginedSessionID = id;
}

export const getLoginedSessionID = () => {
    console.log('[session] getLoginedSessionID()');

    return loginedSessionID;
}