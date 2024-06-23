
let loginedSession = '';

export const setLoginedSession = (uId) => {
    console.log('[Session] setLoginedSession()');

    loginedSession = uId;

}

export const getLoginedSession = () => {
    console.log('[Session] getLoginedSession()');

    return loginedSession;

}