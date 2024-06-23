import React, { useEffect, useState } from "react";

import { setLoginedSessionID, getLoginedSessionID } from './session.js';


const ReservationMoify = (props) => {
    // Hook
    const [rName, setRName] = useState('');
    const [rMail, setRMail] = useState('');
    const [rPhone, setRPhone] = useState('');
    const [rSP, setRSP] = useState('');
    const [rSPT, setRSPT] = useState('');
    const [rEP, setREP] = useState('');
    const [rEPT, setREPT] = useState('');
    const [rAdultCnt, setRAdultCnt] = useState('');
    const [rInfantCnt, setRInfantCnt] = useState('');
    const [rChildCnt, setRChildCnt] = useState('');

    useEffect(() => {
        console.log('[ReservationMoify] useEffect!!');

        let reservationDBInStorage = localStorage.getItem('reservationDB');
        let reservationDBObject = JSON.parse(reservationDBInStorage);
        let myReservations = reservationDBObject[getLoginedSessionID()];
        let toBeModifiedReservationObj = myReservations[props.keyToBeModified];

        setRName(toBeModifiedReservationObj.rName);
        setRMail(toBeModifiedReservationObj.rMail);
        setRPhone(toBeModifiedReservationObj.rPhone);
        setRSP(toBeModifiedReservationObj.rSP);
        setRSPT(toBeModifiedReservationObj.rSPT);
        setREP(toBeModifiedReservationObj.rEP);
        setREPT(toBeModifiedReservationObj.rEPT);
        setRAdultCnt(toBeModifiedReservationObj.rAdultCnt);
        setRInfantCnt(toBeModifiedReservationObj.rInfantCnt);
        setRChildCnt(toBeModifiedReservationObj.rChildCnt);

    }, []);

    // Handler
    const reserModBtnClickHandler  = () => {
        console.log('reserModBtnClickHandler() CLICKED!!');

        let reservationDBInStorage = localStorage.getItem('reservationDB'); // String
        let reservationObj = JSON.parse(reservationDBInStorage);            // all reservation object, JS
        let myReservationObjs = reservationObj[getLoginedSessionID()];      // my reservation object

        myReservationObjs[props.keyToBeModified] = {
            'rName'         : rName,
            'rMail'         : rMail,
            'rPhone'        : rPhone,
            'rSP'           : rSP,
            'rSPT'          : rSPT,
            'rEP'           : rEP,
            'rEPT'          : rEPT,
            'rAdultCnt'     : rAdultCnt,
            'rInfantCnt'    : rInfantCnt,
            'rChildCnt'     : rChildCnt,
        }

        reservationObj[getLoginedSessionID()] = myReservationObjs;
        reservationDBInStorage = JSON.stringify(reservationObj);            // string
        localStorage.setItem('reservationDB', reservationDBInStorage);

        props.setShowReservationMofidyModal(false);

    }
    const rNameChangeHandler  = (e) => {
        console.log('rNameChangeHandler() CLICKED!!');
        
        setRName(e.target.value);
    }
    const rMailChangeHandler  = (e) => {
        console.log('rMailChangeHandler() CLICKED!!');
        
        setRMail(e.target.value);
    }
    const rPhoneChangeHandler  = (e) => {
        console.log('rPhoneChangeHandler() CLICKED!!');
        
        setRPhone(e.target.value);
    }
    const rSPChangeHandler  = (e) => {
        console.log('rSPChangeHandler() CLICKED!!');

        setRSP(e.target.value);
    }
    const rSPTChangeHandler  = (e) => {
        console.log('rSPTChangeHandler() CLICKED!!');

        setRSPT(e.target.value);
    }
    const rEPChangeHandler  = (e) => {
        console.log('rEPChangeHandler() CLICKED!!');

        setREP(e.target.value);
    }
    const rEPTChangeHandler  = (e) => {
        console.log('rEPTChangeHandler() CLICKED!!');

        setREPT(e.target.value);
    }
    const rAdultCntChangeHandler =(e) => {
        console.log('rAdultCntChangeHandler() SELECTED!!');

        setRAdultCnt(e.target.value);
    }    
    const rInfantCntChangeHandler =(e) => {
        console.log('rInfantCntChangeHandler() SELECTED!!');

        setRInfantCnt(e.target.value);
    }    
    const rChildCntChangeHandler =(e) => {
        console.log('rChildCntChangeHandler() SELECTED!!');

        setRChildCnt(e.target.value);
    }    
    
    return(
        <>
        
            <input type="text" name="rName" value={rName} onChange={rNameChangeHandler} placeholder="input name"/>
            <br />
            <input type="email" name="rMail" value={rMail} onChange={rMailChangeHandler} placeholder="input mail"/>
            <br />
            <input type="text" name="rPhone" value={rPhone} onChange={rPhoneChangeHandler} placeholder="input phone"/>
            <br />
            <input type="text" name="rStartPoint" value={rSP} onChange={rSPChangeHandler} placeholder="input startPoint"/>
            <br />
            <input type="text" name="rStartPointTime" value={rSPT} onChange={rSPTChangeHandler} placeholder="input startPointTime"/>
            <br />
            <input type="text" name="rEndPoint" value={rEP} onChange={rEPChangeHandler} placeholder="input endPoint"/>
            <br />
            <input type="text" name="rEndPointTime" value={rEPT} onChange={rEPTChangeHandler} placeholder="input endPointTime"/>
            <br />
            <select name="rAdultCnt" value={rAdultCnt} onChange={rAdultCntChangeHandler}>
                <option>----성인수----</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <select name="rInfantCnt" value={rInfantCnt} onChange={rInfantCntChangeHandler}>
                <option>----어린이수----</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <select name="rChildCnt" value={rChildCnt} onChange={rChildCntChangeHandler}>
                <option>----유아수----</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br />
            <input type="button" value="MODIFY RESERVATION" onClick={reserModBtnClickHandler}/>

        </>
    );
}
export default ReservationMoify;