import React, { useState } from "react";
import { setLoginSessionID, getLoginSessionID } from "./session";

import "../css/signIn.css"

const SignIn = (props) => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    
    //handler
    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() called');
      
         // 사용자 아이디와 비밀번호가 입력되었는지 확인
        if (!uId || !uPw) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        // 로컬 스토리지에서 회원 데이터베이스가 있는지 확인
        let memDBInStorage = localStorage.getItem('memberDB');
        
        if (!memDBInStorage) {
            alert('아이디와 비밀번호를 다시 확인해주세요.');
            return;
        }
      
        let memDBJsObj = JSON.parse(memDBInStorage);
        let memObj = memDBJsObj[uId];
      
        // 사용자가 존재하고 비밀번호가 맞는지 확인
        if (memObj && memObj.uPw === uPw) {
          alert('로그인 성공');
      
            props.homeViewer(true);
            props.signUpViewer(false);
            props.signInViewer(false);
        
            setLoginSessionID(uId);
            props.changeMenuBar(true);
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      
          // 로그인 실패 시 상태와 세션 ID를 초기화
            setUId('');
            setUPw('');
            setLoginSessionID();
        }
      };

    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler called');
        setUId(e.target.value);
        
    }

    const handleEnterKey = (event) => {     // Enter 키 눌림에 대한 로직을 처리
        if (event.key === 'Enter') {
                                     
            event.preventDefault(); // 브라우저의 기본 동작 막기
            signInBtnClickHandler();
        }
    };

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler called');
        setUPw(e.target.value);
    }

    return(
        <>
        <div className="sign_in_bg">
            <div id="sign_in_wrap">
                <div className="menu_sign_in">
                <label htmlFor="id">아이디</label>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} spellCheck="false" autoComplete="off" autoFocus placeholder="아이디를 적으세요" />
                </div>
                
                <div className="menu_sign_in">
                <label htmlFor="id">비밀번호</label>
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} spellCheck="false" onKeyDown={handleEnterKey} tabIndex="0" placeholder="비밀번호를 입력하세요" />
                </div>
                
                <button className="sign_in_btn" onClick={signInBtnClickHandler} onKeyDown={handleEnterKey} tabIndex="0" >로그인</button>
            </div>
        </div>
        </>
    );
}


export default SignIn;