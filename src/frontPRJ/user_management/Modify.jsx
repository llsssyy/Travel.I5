import React, { useEffect, useState } from "react";
import { setLoginSessionID, getLoginSessionID } from "./session";

import "../css/modify.css"
const Modify = (props) => {

    // hook
    // 수정한 데이터
    const [rId, setRId] = useState('');
    const [rPw, setRPw] = useState('');
    const [rMail, setRMail] = useState('');
    const [rPhone, setRPhone] = useState('');

    // 유효성 검사 통과 여부
    const [isPassword, setIsPassword] = useState(true);
    const [isMail, setIsMail] = useState(true);
    const [isPhone, setIsPhone] = useState(true);

    // 유효성 검사 메세지 호출
    const [passwordMessage, setPasswordMessage] = useState('');
    const [mailMessage, setMailMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');

    useEffect(() => {
        console.log('memberModify called');
        
        let memDBInStorage = localStorage.getItem('memberDB');      
        let memDBJsObj = JSON.parse(memDBInStorage);
        let memModify = memDBJsObj[getLoginSessionID()];
        
        setRId(memModify.uId);
        setRPw(memModify.uPw);
        setRMail(memModify.uMail);
        setRPhone(memModify.uPhone);
        
        console.log(memModify.uPhone)

    }, []);
    
    //handler 
    //수정 버튼
    const modifyBtnClickHandler = () => {
        console.log('modifyBtnClickHandler called');
        
        //수정 조건
        if (!rPw || !rMail || !rPhone) {
            alert('모든 필수 입력란을 채워주세요.');
            return;
        }

        if (!isPassword || !isMail || !isPhone) {
            alert('모든 필수 입력란을 바르게 채워주세요.');
            return;
        }
        
        //기존 데이터 불러오기
        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        let memModify = memDBJsObj[getLoginSessionID()];
    
        memModify = {
            'uId': memModify.uId,
            'uPw': rPw,
            'uMail': rMail,
            'uPhone': rPhone,
        };
        
        memDBJsObj[getLoginSessionID()] = memModify;
        memDBInStorage = JSON.stringify(memDBJsObj);
        localStorage.setItem('memberDB', memDBInStorage);
    
        alert('정보 수정 완료');
    
        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.changeMenuBar(true);
    };
    
    // 취소 버튼
    const modifyCancelBtnClickHandler = () => {
        console.log('modifyCancelBtnClickHandler called');

        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.changeMenuBar(true);
    }

    //삭제 버튼
    const deletBtnClickHandler = () => {
        console.log('deletBtnClickHandler called');
        
        //삭제 확인창
        let result = window.confirm('회원 탈퇴하시겠습니까?')

        
        if (result) {
            let memDBInStorage = localStorage.getItem('memberDB');      // 객체로 만든다
            let memDBJsObj = JSON.parse(memDBInStorage);

            delete memDBJsObj[getLoginSessionID()];                     //삭제한다

            memDBInStorage = JSON.stringify(memDBJsObj);                //삭제하고 남은 데이터 배열로 넣는다
            localStorage.setItem('memberDB', memDBInStorage);

            //회원 탈퇴 ID DB
            let withdrawalDB = JSON.parse(localStorage.getItem("withdrawalDB"));        //회원 탈퇴 ID DB를 파싱
            if(withdrawalDB === null || withdrawalDB === undefined) {       //DB가 존재하지 않는다면
                let withdrawalMember = [getLoginSessionID()];               //현재 로그인 된 ID를 변수에 저장하여
                localStorage.setItem("withdrawalDB", JSON.stringify(withdrawalMember));     //회원 탈퇴 ID DB에 저장한다.
            }
            else {      //회원 탈퇴 ID DB가 존재 한다면
                withdrawalDB.push(getLoginSessionID());     //DB를 받아온 변수에 로그인 된 ID를 키값으로 추가 한다.
                localStorage.setItem("withdrawalDB", JSON.stringify(withdrawalDB)); //DB에 저장한다.
            }

            console.log('회원 탈퇴가 완료되었습니다.');
            alert('회원 탈퇴가 완료되었습니다.');

            setLoginSessionID();

            props.homeViewer(true);                                     //홈 화면으로 이동하게 한다
            props.signUpViewer(false);
            props.signInViewer(false);
            props.modifyViewer(false);
            props.changeMenuBar(false);

        } else {
            console.log('회원 탈퇴가 취소되었습니다.');
            alert('회원 탈퇴가 취소되었습니다.')
        }
    }

    // 정보수정도 유효성 검사 진행
    const rPwChangeHandler = (e) => {
        console.log('rPwChangeHandler called');
        
        const currentPassword = e.target.value;
        setRPw(currentPassword);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;  

        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPassword(false);

        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");
            setIsPassword(true);
        }
        if (currentPassword.trim() === "") {
            setPasswordMessage("");
            setIsPassword(false);
        }
    }

    const rMailChangeHandler = (e) => {
        console.log('rMailChangeHandler called');
        
        const currentEmail = e.target.value;
        setRMail(currentEmail);
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

    const rPhoneChangeHandler = (e) => {
        console.log('rPhoneChangeHandler called');
        
        const currentPhone = e.target.value;
        setRPhone(currentPhone);
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
    
    return(
        <>
        <div className="modify_bg">
            <div id="wrap_modify">
                <div className="rmenu_modify">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="rId" value={getLoginSessionID()} readOnly disabled />
                </div>
                <br />
                <div className="rmenu_modify">
                    <label htmlFor="pw">비밀번호</label>
                    <input type="password" name="rPw" value={rPw} onChange={rPwChangeHandler} spellCheck="false" placeholder="비밀번호를 입력하세요" />
                    <p className="message" style={{ color: !isPassword ? 'red' : 'green' }}> {passwordMessage} </p>
                </div>
                <br />
                <div className="rmenu_modify">
                    <label htmlFor="mail">이메일</label>
                    <input type="email" name="rMail" value={rMail} onChange={rMailChangeHandler} spellCheck="false" autoComplete="off" placeholder="이메일 입력" />
                    <p className="message" style={{color: !isMail ? 'red' : 'green' }}> {mailMessage} </p>
                </div>
                <br />
                <div className="rmenu_modify">
                    <label htmlFor="phone">전화번호</label>
                    <input type="text" name="rPhone" value={rPhone} onChange={rPhoneChangeHandler} spellCheck="false" autoComplete="off" placeholder="번호 입력" />
                    <p className="message" style={{ color: !isPhone ? 'red' : 'green' }}> {phoneMessage} </p>
                </div>
                <br />
                <div className="button-container">
                    <button className="modifyBtn" onClick={modifyBtnClickHandler}>수정</button>
                    <button className="modifyCancelBtn" onClick={modifyCancelBtnClickHandler}>취소</button>
                    <button className="deletBtn" onClick={deletBtnClickHandler}>탈퇴</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Modify;