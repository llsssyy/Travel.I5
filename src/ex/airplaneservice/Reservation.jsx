import React, { useState } from "react";

import { getLoginedSessionID } from './session.js'                          // session.js에서 getLoginedSessionID 함수를 import 해왔음!
import { getDateTime } from './utils.js'                                    // util.js에서 getDateTime 함수를 import 해왔음!

const Reservation = (props) => {

    // hook
    const [rName, setRName] = useState('');                                 // rName의 기본값 = ''(빈 문자열)
    const [rMail, setRMail] = useState('');
    const [rPhone, setRPhone] = useState('');
    const [rSP, setRSP] = useState('');
    const [rSPT, setRSPT] = useState('');
    const [rEP, setREP] = useState('');
    const [rEPT, setREPT] = useState('');
    const [rAdultCnt, setRAdultCnt] = useState('');
    const [rInpantCnt, setRInpantCnt] = useState('');
    const [rChildCnt, setRChildCnt] = useState('');

    // handler
    const reserBtnClickHandler = () => {
        console.log('reserBtnClickHandler() CLICKED!!');



        let reservationDBInStorage = localStorage.getItem('reservationDB'); // reservationDB의 값(string타입)을 reservationDBInStorage이란 변수에 할당 해주었음
        let reservationObj = JSON.parse(reservationDBInStorage);            // reservationDBInStorage의 값을 JSON 형태로 만들어 reservationObj에 할당 해주었음

        let myReservationObjs = reservationObj[getLoginedSessionID()];      // reservationObj중에 지금 로그인 되어있는 id에 해당하는 정보들을 myReservationObjs에 할당해주었음(session.js참조)
        // = gildong.reservationDB
        console.log('myReservationObjs: ', myReservationObjs);              // 잘 할당되었나 찍어보는 로그

        myReservationObjs[getDateTime()] = {                                // = myReservationObjs.getDateTime()
            'rName': rName,                                                 // 회원가입 정보와 다르게 예약정보는 한사람당 여러개가 있을 수 있으므로 유니크한 key 값을 준것.(예약시간)
            'rMail': rMail,                                                 // 예약시간을 key값으로 / [rName, rMail, rPhone, rSP, rSPT, rEP, rEPT, rAdultCnt, rInpantCnt, rChildCnt] <- value값은 배열로 나열해 준 것.
            'rPhone': rPhone,
            'rSP': rSP,
            'rSPT': rSPT,
            'rEP': rEP,
            'rEPT': rEPT,
            'rAdultCnt': rAdultCnt,
            'rInpantCnt': rInpantCnt,
            'rChildCnt': rChildCnt,                                         // 회원가입 할때 이미 uId로 reservationDB를 만들어 주었기 때문에 그 공간 안에 {getDateTime(key) : 예약정보들(value)} 라는 객체를 생성해서 넣어준 것.
        }

        // gildong.reservationDB = {             
        //             202312201130(key) : [rName, rMail, rPhone, rSP, rSPT, rEP, rEPT, rAdultCnt, rInpantCnt, rChildCnt(value값들)],
        //                          }

        // 다른 시간(key값)에 예약하면 또 gildong.reservationDB안에 작성한 시간이 key값으로 들어가고 중괄호 안의 정보들이 value값으로 들어가는 객체가 생성 됨.

        reservationObj[getLoginedSessionID()] = myReservationObjs;          // 작성한 key와 value값들을 reservationObj[현재 로그인 되어있는 ID]로 할당하는 작업!
        reservationDBInStorage = JSON.stringify(reservationObj);            // reservationObj를 string형식으로 변환하여 reservationDBInStorage에 할당 해 주었음.(변환 안하면 DB에 못넣음)
        localStorage.setItem('reservationDB', reservationDBInStorage);      // reservationDBInStorage를 setItem(key, value)를 이용해 reservationDB에 최종적으로 넣어 주었음

        alert('RESERVATION SUCCESS!!');

        
        setRName('');
        setRMail('');
        setRPhone('');
        setRSP('');
        setRSPT('');
        setREP('');
        setREPT('');
        setRAdultCnt('');
        setRInpantCnt('');
        setRChildCnt('');
        
        props.homeViewer(false);                                         
        props.signUpViewer(false);
        props.signInViewer(false);
        props.reservationViewer(false);
        props.reservationListViewer(true);
        
        
    }

    const rNameChangeHandler = (e) => {
        console.log('rNameChangeHandler() CALLED!!');

        setRName(e.target.value);                                            // input 창의 값이 바뀔때마다 value값을 받아서 RName 값을 set해줌!!

    }

    const rMailChangeHandler = (e) => {
        console.log('rMailChangeHandler() CALLED!!');

        setRMail(e.target.value);

    }

    const rPhoneChangeHandler = (e) => {
        console.log('rPhoneChangeHandler() CALLED!!');

        setRPhone(e.target.value);

    }

    const rSPChangeHandler = (e) => {
        console.log('rSPChangeHandler() CALLED!!');

        setRSP(e.target.value);

    }

    const rSPTChangeHandler = (e) => {
        console.log('rSPTChangeHandler() CALLED!!');

        setRSPT(e.target.value);

    }

    const rEPChangeHandler = (e) => {
        console.log('rEPChangeHandler() CALLED!!');

        setREP(e.target.value);

    }

    const rEPTChangeHandler = (e) => {
        console.log('rEPTChangeHandler() CALLED!!');

        setREPT(e.target.value);

    }

    const rAdultCntChangeHandler = (e) => {
        console.log('rAdultCntChangeHandler() SELECTED!!');

        setRAdultCnt(e.target.value);

    }

    const rInpantCntChangeHandler = (e) => {
        console.log('rInpantCntChangeHandler() SELECTED!!');

        setRInpantCnt(e.target.value);

    }

    const rChildCntChangeHandler = (e) => {
        console.log('rChildCntChangeHandler() SELECTED!!');

        setRChildCnt(e.target.value);

    }


    return (
        <>

            <input type="text" name="rName" value={rName} onChange={rNameChangeHandler} placeholder="Input Name" />
            <br />
            <input type="email" name="rMail" value={rMail} onChange={rMailChangeHandler} placeholder="Input Mail" />
            <br />
            <input type="text" name="rPhone" value={rPhone} onChange={rPhoneChangeHandler} placeholder="Input Phone" />
            <br />
            <input type="text" name="rStartPoint" value={rSP} onChange={rSPChangeHandler} placeholder="Input StartPoint" />
            <br />
            <input type="text" name="rStartPointTime" value={rSPT} onChange={rSPTChangeHandler} placeholder="Input StartPointTime" />
            <br />
            <input type="text" name="rEndPoint" value={rEP} onChange={rEPChangeHandler} placeholder="Input EndPoint" />
            <br />
            <input type="text" name="rEndPointTime" value={rEPT} onChange={rEPTChangeHandler} placeholder="Input EndPointTime" />
            <br />
            <select name="rAdultCnt"  value={rAdultCnt} onChange={rAdultCntChangeHandler}>
                <option>---성인 수---</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <select name="rInpantCnt" value={rInpantCnt} onChange={rInpantCntChangeHandler}>
                <option>---어린이 수---</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <select name="rChildCnt" value={rChildCnt} onChange={rChildCntChangeHandler}>
                <option>---유아 수---</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <input type="button" value="RESERVATION" onClick={reserBtnClickHandler} />

        </>
    );

}

export default Reservation;