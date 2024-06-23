let loginSessionID = '';

export const setLoginSessionID = (id = '') => {
    console.log('setLoginSessionID() called');

    loginSessionID = id;
} 

export const getLoginSessionID = () => {
    console.log('getLoginSessionID() called');

    return loginSessionID
}