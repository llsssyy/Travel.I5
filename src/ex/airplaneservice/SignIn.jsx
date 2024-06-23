import React, { useState } from "react";

import { setLoginedSessionID, getLoginedSessionID } from './session.js'     // session.js에서 setLoginedSessinID 함수와 getLoginedSessionID 함수를 import 하였음
                                                                            // import하고 안써도 됨. setLoginedSessionID만 사용하고 getLoginedSessionID는 사용하지 않았음

const SignIn = (props) => {                                                 // 부모 컴포넌트에서 props로 물려받아 오는것

    // hook
    const [uId, setUId] = useState('');                                     // uId라는 함수의 기본값을 -> '', 즉 빈 문자열로 설정해주었음
    const [uPw, setUPw] = useState('');

    // handler
    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() CALLED!!');

        // 로그인
                                                                            // 회원가입 된 멤버들의 정보는 memberDB에 들어갔음! SignUp.jsx 참조
        let memberDBInStorage = localStorage.getItem('memberDB');           // localStorage에서 getItem으로 무언가를 가지고 왔을때의 기본값은 string형식
        let memDBJsObj = JSON.parse(memberDBInStorage);                     // memberDB에서 가져온 string값을 JSON 형식으로 변환하였음! 변환한 JSON값을 memDBJsObj에 할당하였음
        let memObj = memDBJsObj[uId];                                       // memDBJsObj(전체memberDB)에서 uId값을 memObj에 할당하였음! ex) memObj = gildong, chanho, seri 등 ID값
                                                                            // memDBJsObj[uId] = memDBJsObj.uId  ->  표현방법이 다를뿐!
        
        if (memObj !== undefined && memObj.uPw === uPw) {                   // memObj값이 undefined(찾을수 없음)이 아니고(&&), memObj의 pw가 uPw와 동일 데이터타입, 내용까지 똑같을 경우
            alert('SIGN IN SUCCESS!!');                                     // SIGN IN SUCCESS 알림창 띄움.

            props.homeViewer(true);                                         // 부모 컴포넌트에서 내려준 setIsHome 값을 true로 바꿔줌. 즉 HOME화면이 렌더링 됨
            props.signUpViewer(false);
            props.signInViewer(false);
            props.reservationViewer(false);
            props.reservationListViewer(false);

            setLoginedSessionID(uId);                                       // LoginedSessionID의 값을 ID input 창에서 받은 값으로 set해줌! ()
                                                                            // setLoginedSessionID()는 session.js 에서 import 해왔음. 3번줄 참조

        } else {                                                            // 그렇지 않으면. 즉 memObj값을 찾을 수 없거나(회원가입이 안 되어 있거나), memObj.uPw의 값과 uPw의 값이 틀린 경우
            alert('SIGN IN FAIL!!');                                        // SIGN IN FAIL 알림창 띄움.

            props.homeViewer(false);                                        
            props.signUpViewer(false);
            props.signInViewer(true);                                       // 부모 컴포넌트에서 내려준 setIsSignIn값을 true로 바꾸어줌. SignIn 화면이 렌더링 됨.
            props.reservationViewer(false);                                 // 회원가입 창이 나오게 하려면 signUpViewer를 true로 바꾸는 식으로 자기가 원하는 값을 지정해 주면 됨.
            props.reservationListViewer(false);


            setUId('');                                                     // uId의 값을 지워줬음! ID 입력하는 input태그의 value값이 uId이므로 입력했던 value값이 지워져 빈칸으로 바뀌게 됨
            setUPw('');                                                     // uPw의 값을 지워줬음! PW 입력하는 input태그의 value값이 uPw이므로 입력했던 value값이 지워져 빈칸으로 바뀌게 됨

            setLoginedSessionID();                                          // LoginedSessionID의 값을 지워버림. setLoginedSessionID함수의 기본값이 (id(key) = ''(value)) 이므로 지워지는것.
                                                                            // 즉 로그인 되어있는 상태가 아님

        }

    }

    const uIdChangeHandler = (e) => {                                       //event 받기는 선택사항! 안받아도됨.
        console.log('uIdChangeHandler() CALLED!!');

        setUId(e.target.value);                                             // input 창의 값이 바뀔때마다 value값을 받아서 UId 값을 set해줌!!  

    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');

        setUPw(e.target.value);

    }

    return (
        <>
            <div>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input user ID" />        {/* input창의 value 데이터가 바뀔때마다 이벤트가 생기게 하고(onChange) 거기에 핸들러를 달아준거임! */}
                <br />
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input user PW" />
                <br />
                <input type="button" value="SIGN IN" onClick={signInBtnClickHandler} />                                     {/* 로그인 버튼을 클릭했을때의 핸들러를 달아준거임 onClick = 자바스크립트의 addEventListner('click'<- 이 부분!!!! , function () {~~}) 과 똑같음 */}
            </div>

        </>
    );

}

export default SignIn;