let loginedSessionID = '';

export const setLoginedSessionID = (id = '') => {
    console.log('setLoginedSessionID() CALLED!!');

    loginedSessionID = id;

}

export const getLoginedSessionID = () => {
    console.log('getLoginedSessionID() CALLED!!');
    
    return loginedSessionID;

}