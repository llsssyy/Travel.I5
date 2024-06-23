// VARIABLE

export const MEMBER_DB_IN_LOCAL_STORAGE = 'memoSvcMemberDB';
export const MEMO_DB_IN_LOCAL_STORAGE = 'memoSvcMemoDB';

// FUNCTION
// MEMBER

export const getMemoSvcMemberDB = () => {
    console.log('[const] getMemoSvcMemberDB()');

    return localStorage.getItem(MEMBER_DB_IN_LOCAL_STORAGE);

}

export const setMemoSvcMemberDB = (memDBJsObj) => {
    console.log('[const] setMemoSvcMemberDB()');

    localStorage.setItem(MEMBER_DB_IN_LOCAL_STORAGE, JSON.stringify(memDBJsObj));

}

export const getMyMemObj = (uId) => {
    console.log('[const] getMyMemObj()');

    let memDBInStorage = getMemoSvcMemberDB();              // string
    let memDBJsObj = JSON.parse(memDBInStorage);            // OBJ
    let memObj = memDBJsObj[uId];

    return memObj;

}

// MEMO

export const getMemoSvcMemoDB = () => {
    console.log('[const] getMemoSvcMemoDB()');

    return localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
    
} 


export const setMemoSvcMemoDB = (memoDBJsObj) => {
    console.log('[const] setMemoSvcMemoDB()');

    localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, JSON.stringify(memoDBJsObj));
    
} 

export const getMyMemoObjs = (uId) => {
    console.log('[const] getMyMemoObjs()');

    let memoDBInStorage = localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);       // string값으로 모든 회원의 메모
    let memoObj = JSON.parse(memoDBInStorage);
    let myMemoObjs = memoObj[uId];

    return myMemoObjs;

}

export const setMyMemoObjs = (uId, myMemoObjs) => {
    console.log('[const] setMyMemoObjs()');

   let momoDBInStorage = localStorage.getItem(MEMO_DB_IN_LOCAL_STORAGE);
   let memoObj = JSON.parse(momoDBInStorage);

   // 내 메모만 뽑아내야함

   memoObj[uId] = myMemoObjs;

   // 다시 DB로 집어넣기

   momoDBInStorage =  JSON.stringify(memoObj);
   localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, momoDBInStorage);

}
