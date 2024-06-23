let loginedSessionID = '';                                  // loginedSessionID의 기본값은 빈 문자열

export const setLoginedSessionID = (id = '') => {           // setLoginedSessionID의 실행부에서 id(key)값을 '' 문자열 형식으로 받아 id(key)값에 할당해줌.
    console.log('setLoginedSessionID() CALLED!!');

    loginedSessionID = id;                                  // 실행부에서 받아온 value값을 loginedSessionID에 할당해 주었음

}

export const getLoginedSessionID = () => {
    console.log('getloginedSessionID() CALLED!!');

    return loginedSessionID;                                // 단순히 LoginedSessionID를 가져오기 위한 함수. setter로 설정한 value값을 loginedSessionID에 할당하였고,
                                                            // 그 loginedSessionID 값을 getLoginedSessionID 함수에 return 하였으므로 getLoginedSessionID 함수 호출 = SignIn에서 setter로 set해준 loginedSessionID 값을 가져옴
                                                            // 즉, 로그인 되어있는 ID를 가져오는 것.

}
