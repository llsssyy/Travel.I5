import React, { useState } from "react";
import { setLoginSessionID, getLoginSessionID } from "./session";


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
            alert('로그인 해주세요');
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

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler called');
        setUPw(e.target.value);
    }

    return(
        <>
            <div>
                <label htmlFor="id">아이디</label>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="아이디를 적으세요" />
                <br />
                <label htmlFor="id">비밀번호</label>
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="비밀번호를 입력하세요" />
                <br />
                <input type="button" value="로그인" onClick={signInBtnClickHandler}/>
            </div>
        </>
    );
}

export default SignIn;