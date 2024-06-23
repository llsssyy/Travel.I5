import React, { useState } from "react";

import "../css/signUp.css"

const SignUp = (props) => {
    
    // Hook
    const [uId, setuId] = useState('');
    const [uPw, setuPw] = useState('');
    const [uMail, setuMail] = useState('');
    const [uPhone, setuPhone] = useState('');

    // 오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [mailMessage, setMailMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');

    // 적합메세지 상태 저장

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isDupliPassword, setisDupliPassword] = useState(false);

    // 중복검사(아이디, 비밀번호)
    const [duplId, setDuplId] = useState(false);
    const [dupliPw, setDupliPw] = useState('');

    //중복검사 메세지(아이디, 비밀번호)
    const [duplMessage, setduplMessage] = useState('');
    const [dupliPwMessage, setdupliPwMessage] = useState('');

    // Handler
    // 회원가입폼
    const signUpBtnClickHandler = () => {
        console.log('signUpBtnClickHandler() CALLED!!');
        
        // 회원가입의 조건이 안맞을 시 가입 못하게 막는 식
        if (!uId || !uPw || !uMail || !uPhone) {
            alert('모든 필수 입력란을 채워주세요.');
            return;
        }

        if (!isId || !isPassword || !isMail || !isPhone) {
            alert('모든 입력란을 바르게 채워주세요.');
            return;
        }
        
        if (!duplId) {
            alert('아이디가 중복인것 같습니다. \'중복 검사\'를 실행해 주세요.');
            return;
        }

        if (!dupliPw) {
            alert('비밀번호 확인을 다시 진행해주세요.');
            return;
        }

        if (!isDupliPassword) {
            alert('비밀번호가 서로 다릅니다. 디시 입력해주세요.');
            return;
        }

        let memDBInStorage = localStorage.getItem('memberDB');
        
        // 최초 회원가입
        if (memDBInStorage === null) {
            let newMemObj = {
                [uId]: {
                    'uPw': uPw,
                    'uMail': uMail,
                    'uPhone': uPhone,
                }
            };
            let newMemStr = JSON.stringify(newMemObj);
            localStorage.setItem('memberDB', newMemStr);

        } else {
            let memDBJsObj = JSON.parse(memDBInStorage);
            // 데이터에 객체가 있는 경우
            memDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            };

            let newMemStr = JSON.stringify(memDBJsObj);
            localStorage.setItem('memberDB', newMemStr);
        }

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(true);

        alert('회원가입 성공!');
    }

    // 유효성 검사

    //아이디
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() called');

        const currentId = e.target.value;
        setuId(currentId);
        const idRegExp = /^[a-zA-z0-9]{4,10}$/;
        setduplMessage("");
        if (!idRegExp.test(currentId)) {
            setIdMessage("4-10사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);

        } else {
            setIdMessage("사용 가능한 아이디 입니다. 중복검사를 진행해주세요.");
            setIsId(true);
            
        }
        
        if (currentId.trim() === "") { //trim은 문자열 앞뒤의 공백을 제거하는데 사용됩니다.
            setIdMessage("");
            setIsId(false);
        }
    }

    //비밀번호
    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() called');

        const currentPassword = e.target.value;
        setuPw(currentPassword);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPassword(false);
        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");
            setIsPassword(true);
        }
        
        if (currentPassword.trim() === "") { //trim은 문자열 앞뒤의 공백을 제거하는데 사용됩니다.
            setPasswordMessage("");
            setIsPassword(false);
        }
    }

    //비밀번호 확인
    const dupliPwChangeHandler = (e) => {
        console.log('dupliPwChangeHandler() called');

        if(!uPw) {
            setdupliPwMessage("");
        }
        const currrentDupliPassword = e.target.value;
        setDupliPw(currrentDupliPassword);
        if (currrentDupliPassword === uPw) {
            setdupliPwMessage("비밀번호 확인 완료");
            setisDupliPassword(true);
        } else {
            setdupliPwMessage("비밀번호가 같지 않습니다. 다시 입력해주세요.");
            setisDupliPassword(false);
        }
        if (currrentDupliPassword.trim() === "") { //trim은 문자열 앞뒤의 공백을 제거하는데 사용됩니다.
            setdupliPwMessage("");
            setisDupliPassword(false);
        }
    }

    //메일
    const uMailChangeHandler = (e) => {
        console.log('uMailChangeHandler() called');

        const currentEmail = e.target.value;
        setuMail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setMailMessage("이메일의 형식이 올바르지 않습니다!");
            setIsMail(false);
        } else {
            setMailMessage("사용 가능한 이메일 입니다.");
            setIsMail(true);
        }

        if (currentEmail.trim() === "") {
            setMailMessage("");
            setIsMail(false);
        }
    }

    //휴대번호
    const uPhoneChangeHandeler = (e) => {
        console.log('uPhoneChangeHandeler() called');

        const currentPhone = e.target.value;
        setuPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/;
        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
            setIsPhone(false);
        } else {
            setPhoneMessage("사용 가능한 번호입니다.");
            setIsPhone(true);
        }
        if (currentPhone.trim() === "") {
            setPhoneMessage("");
            setIsPhone(false);
        }
    }

    // 아이디 중복검사
    const uIdDupliCheckHandler = (e) => {
        console.log('uIdDupliCheckHandler 호출됨');

        //값없이 중복버튼 누를 때
        if(!uId) {
            
            alert('아이디를 입력해주세요.');
            setduplMessage('아이디를 입력해주세요!');
            setDuplId(false)
            return;
        }

        // 새로 입력된 uId 값
        setDuplId(e.target.value);

        let withdrawalStorage = JSON.parse(localStorage.getItem("withdrawalDB"));   //회원 탈퇴 ID DB를 파싱한다.
        if(withdrawalStorage !== null){     //DB가 null이 아니라면
            let keys = Object.keys(withdrawalStorage);  //DB의 키값들을 가져온다.

            for(let i=0; i<keys.length; i++){       //키값의 개수 만큼 반복 하여
                if(uId===withdrawalStorage[keys[i]]){   //중복체크 하기로 한 ID와 탈퇴DB의 키값들을 비교 하여 ID가 같다면
                    alert("이전에 가입한 ID 입니다.");    //이전에 가입했던 ID라 출력 한다.
                    setduplMessage('이전에 가입한 ID 입니다.');
                    setDuplId(false);
                    setIdMessage("");
                    return;             
                }
            }
        }
        
        let memDBInStorage = JSON.parse(localStorage.getItem('memberDB'));

        // 만약 memDBInStorage가 null 또는 undefined이면 중복이 아닌 것으로 간주 // 중복이 아님
        if ( memDBInStorage === null ||  memDBInStorage === undefined) {
            setDuplId(true); 
            alert('사용 가능한 아이디 입니다.');
            setduplMessage('중복 검사 완료!');
            return;
        }

        let keys = Object.keys(memDBInStorage);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === uId) {
                console.log(keys[i]);
                console.log(uId);

                setIdMessage("");
                setduplMessage('중복입니다, 다른 아이디를 입력하세요!');
                setDuplId(false);
                alert('중복입니다, 다른 아이디를 입력하세요!');
                
                return;
            }
        }

        setDuplId(true);
        alert('중복이 아닙니다');
        setduplMessage('중복확인 완료!');
    };

    return (
    <div className="sign_up_bg">
        <div id="wrap_sign_up">
            <div className="menu_sign_up">
                <label htmlFor="id">아이디</label>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} spellCheck="false" autoFocus autoComplete="off" placeholder="4-10사이 대소문자 또는 숫자만 입력해 주세요!" />
                <p className="message" style={{ color: !isId ? 'red' : 'green' }}> {idMessage}</p>
                <button className="dupliBtn" onClick={uIdDupliCheckHandler} >중복검사</button>
                <p className="dupliMessage" style={{ color : !duplId ? 'red' : 'green' }}>{duplMessage}</p>
            </div>
                
            <div className="menu_sign_up">
                <label htmlFor="pw">비밀번호</label>
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} spellCheck="false" placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!" />
                <p className="message" style={{ color: !isPassword ? 'red' : 'green' }}> {passwordMessage} </p>
            </div>
           
            <div className="menu_sign_up">
                <label htmlFor="dupliPw">비밀번호 확인</label>
                <input type="password" name="dupliPw" value={dupliPw} onChange={dupliPwChangeHandler} spellCheck="false" autoComplete="off" placeholder="비밀번호를 다시 입력해주세요."/>
                <p className="message" style={{ color: !isDupliPassword ? 'red' : 'green'}}> {dupliPwMessage} </p>
            </div>
            
            <div className="menu_sign_up">
                <label htmlFor="mail">메일 주소</label>
                <input type="email" name="uMail" value={uMail} onChange={uMailChangeHandler} spellCheck="false" autoComplete="off" placeholder="이메일을 입력하세요." />
                <p className="message" style={{ color: !isMail ? 'red' : 'green' }}> {mailMessage} </p>
            </div>
            
            <div className="menu_sign_up">
                <label htmlFor="phone">전화번호</label>
                <input type="text" name="uPhone" value={uPhone} onChange={uPhoneChangeHandeler } autoComplete="off" spellCheck="false" placeholder="전화번호를 입력하세요." />
                <p className="message" style={{ color: !isPhone ? 'red' : 'green' }}> {phoneMessage} </p>
            </div>
            <br />
            <button className="sign_up_Btn" onClick={signUpBtnClickHandler}>회원가입</button>
            
        </div>
    </div>
    );
}

export default SignUp;
