import React, { useState } from "react";
const SignUp = (props) => {

    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    // handler
    const signUpBtnClickHandler = () => {
        console.log('signUpBtnClickHandler() CALLED!!');
        
        let memDBInStorage = localStorage.getItem('memberDB');      // string
        if (memDBInStorage === null) {
            let newMemObj = {
                [uId]: {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            }}
            let newMemStr = JSON.stringify(newMemObj);              // string
            localStorage.setItem('memberDB', newMemStr);

        } else {

            let memDBJsObj = JSON.parse(memDBInStorage);            // javascrip Object
            memDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            };

            let newMemStr = JSON.stringify(memDBJsObj);             // stirng
            localStorage.setItem('memberDB', newMemStr);
        }

        let reservationDBInStorage = localStorage.getItem('reservationDB');      // string
        if (reservationDBInStorage === null) {

            let newReservationObj = {
                [uId]: {}
            }
            let newReservationStr = JSON.stringify(newReservationObj);
            localStorage.setItem('reservationDB', newReservationStr);

        } else {
            let reservationDBJsObj = JSON.parse(reservationDBInStorage);    // JsObjcet
            reservationDBJsObj[uId] = {};

            let newReservationStr = JSON.stringify(reservationDBJsObj);             // stirng
            localStorage.setItem('reservationDB', newReservationStr);

        }

        alert('SIGN UP SUCCESS!!');
        
        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.reservationViewer(false);
        props.reservationListViewer(false);
        
    }
    
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');
        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');
        setUPw(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        console.log('uMailChangeHandler() CALLED!!');
        setUMail(e.target.value);
    }

    const uPhoneChangeHandler = (e) => {
        console.log('uPhoneChangeHandler() CALLED!!');
        setUPhone(e.target.value);
    }

    return(
        <>
        <div>
            <input type="text" name="uId" onChange={uIdChangeHandler} placeholder="Input user id" />
            <br />
            <input type="password" name="uPw" onChange={uPwChangeHandler} placeholder="Input user pw" />
            <br />
            <input type="email" name="uMail" onChange={uMailChangeHandler} placeholder="Input user mail" />
            <br />
            <input type="text" name="uPhone"  onChange={uPhoneChangeHandler}placeholder="Input user phone" />
            <br />
            <input type="button" value="SIGN UP" onClick={signUpBtnClickHandler}/>
        </div>
        </>
    );
}
export default SignUp;