import React, { useState } from "react";

const SignIn = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler

    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');

        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');

        setUPw(e.target.value);

    }

    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() CALLED!!');

        let memberDBInStorage = localStorage.getItem('memberDB');
        let memberDBpar = JSON.parse(memberDBInStorage);
        let sltMember = memberDBpar[uId];

        if (sltMember !== undefined && sltMember.uPw === uPw ) {
            alert('SIGN IN SUCCESS!!');

            props.setIsHome(true);
            props.setIsSignUp(false);
            props.setIsSignIn(false);
            props.setIsDiary(false);
            props.setIsDiaryList(false);
        } else {
            alert('SIGN IN FAILED!!');

            setUId('');
            setUPw('');
            
        }
        


    }

    return (
        <>
            <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" />
            <br />
            <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
            <br />
            <input type="button" onClick={signInBtnClickHandler} value='SIGN IN' />
        </>
    );
}

export default SignIn;