import React, { useState } from "react";


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

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    // 중복검사
    const [duplId, setDuplId] = useState(false);

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

        alert('회원가입 성공');
    }

    // 유효성 검사
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() called');

        const currentId = e.target.value;
        setuId(currentId);
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;
        if (!idRegExp.test(currentId)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);

        } else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
    }

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
    }

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
    }

    const uPhoneChangeHandeler = (e) => {
        console.log('uPhoneChangeHandeler() called');

        const currentPhone = e.target.value;
        setuPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/;
        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
            setIsPhone(false);
        } else {
            setPhoneMessage("사용 가능한 번호입니다");
            setIsPhone(true);
        }
    }

    // 중복검사
    const uIdDupliCheckHandler = (e) => {
        console.log('uIdDupliCheckHandler 호출됨');

        // 새로 입력된 uId 값

        setDuplId(e.target.value);

        let memDBInStorage = JSON.parse(localStorage.getItem('memberDB'));

        // 만약 memDBInStorage가 null 또는 undefined이면 중복이 아닌 것으로 간주
        if ( memDBInStorage === null ||  memDBInStorage === undefined) {
            setDuplId(true); // 중복이 아님
            alert('중복이 아닙니다.');
            console.log(uId)
            return;
        }

        let keys = Object.keys(memDBInStorage);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === uId) {
                console.log(keys[i]);
                console.log(uId);

                setDuplId(false);
                alert('중복입니다, 다른 아이디를 입력하세요.');
                return;
            }
        }

        setDuplId(true);
        alert('중복이 아닙니다');
    };

    return (
        <div id="wrap_sign_up">
            <div className="menu_id">
                <label htmlFor="id">아이디</label>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="4-12사이 대소문자 또는 숫자만 입력해 주세요!" />
                <p className="message"> {idMessage}</p>
                <input type="button" name="uIdcolor" value="중복검사" onClick={uIdDupliCheckHandler}/>
            </div>
            <br />
            <div className="menu_pw">
                <label htmlFor="pw">비밀번호</label>
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!" />
                <p className="message"> {passwordMessage} </p>
            </div>
            <br />
            <div className="menu_mail">
                <label htmlFor="mail">메일 주소</label>
                <input type="email" name="uMail" value={uMail} onChange={uMailChangeHandler} placeholder="이메일을 입력하세요" />
                <p className="message"> {mailMessage} </p>
            </div>
            <br />
            <div className="menu_phone">
                <label htmlFor="phone">전화번호</label>
                <input type="text" name="uPhone" value={uPhone} onChange={uPhoneChangeHandeler} placeholder="전화번호를 입력하세요" />
                <p className="message"> {phoneMessage} </p>
            </div>
            <br />
            <input type="button" value="signUpBtn" onClick={signUpBtnClickHandler}/>
        </div>
    );
}

export default SignUp;
