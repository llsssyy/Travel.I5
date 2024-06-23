// VARIABLE
export const MEMBER_DB_IN_LOCAL_STORAGE  = 'memoSvcMemberDB';
export const MEMO_DB_IN_LOCAL_STORAGE    = 'memoSvcMemoDB';

// FUNCTION
// MEMBER
export const getMemoSvcMemberDB = () => {
    console.log('getMemoSvcMemberDB() CALLED!!');

    return localStorage.getItem(MEMBER_DB_IN_LOCAL_STORAGE);

}

export const setMemoSvcMemberDB = (memDBJsObj) => {
    console.log('setMemoSvcMemberDB() CALLED!!');

    return localStorage.setItem(MEMBER_DB_IN_LOCAL_STORAGE, JSON.stringify(memDBJsObj));

}

export const getMyMemObj = (uId) => {
    console.log('getMyMemObj() CALLED!!');

    let memDBInStorage = getMemoSvcMemberDB();
    let memDBJsObj = JSON.parse(memDBInStorage);
    let memObj = memDBJsObj[uId];

    return memObj;

}

// MEMO
export const getMemoSvcMemoDB = () => {
    console.log('getMemoSvcMemoDB() CALLED!!');

    return localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
    
}

export const setMemoSvcMemoDB = (memoDBJsObj) => {
    console.log('setMemoSvcMemoDB() CALLED!!');

    return localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, JSON.stringify(memoDBJsObj));
    
}

export const getMyMemoObjs = (uId) => {
    console.log('getMyMemoObjs() CALLED!!');

    let memoDBInStorage = localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
    let memoObj = JSON.parse(memoDBInStorage);
    let myMemoObjs = memoObj[uId];

    return myMemoObjs;

}

export const setMyMemoObjs = (uId, myMemoObjs) => {
    console.log('getMyMemoObjs() CALLED!!');

    let memoDBInStorage = localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
    let memoObj = JSON.parse(memoDBInStorage); 

    memoObj[uId] = myMemoObjs;
    memoDBInStorage = JSON.stringify(memoObj);
    localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, memoDBInStorage)

}

export const getToBeModifiedMemoObj = (uId, key) => {
    console.log('getToBeModifiedMemoObj() CALLED!!');

    let memoDBInStorage = localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
        let memoDBObject = JSON.parse(memoDBInStorage);
        let myMemos = memoDBObject[uId];
        let toBeModifiedMemoObj = myMemos[key];

        return toBeModifiedMemoObj;

}