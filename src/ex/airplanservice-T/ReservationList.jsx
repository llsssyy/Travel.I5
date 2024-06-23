import React, { useEffect, useState } from "react";

import { setLoginedSessionID, getLoginedSessionID } from './session.js';
import ReservationMoify from "./ReservationModify.jsx";

import './style/reservationModify.css';


const ReservationList = () => {

    // hook
    const [tempFlag, setTempFlag] = useState(true);
    const [myReservationArr, setMyReservationArr] = useState([]);
    const [showReservationMofidyModal, setShowReservationMofidyModal] = useState(false);
    const [keyToBeModified, setKeyToBeModified] = useState('');

    useEffect(() => {
        console.log('useEffect() CALLED!!');

        if (!showReservationMofidyModal) {
            let reservationDBInStorage = localStorage.getItem('reservationDB');
            let reservationDBObject = JSON.parse(reservationDBInStorage);
            let myReservations = reservationDBObject[getLoginedSessionID()];
    
            let myReservationskeys = [];
            for (let keys in myReservations) {
                myReservationskeys.push(keys);
            }
    
            let tempArr = [];
            for (let i = 0; i < myReservationskeys.length; i++) {
                let myReservation = myReservations[myReservationskeys[i]];
                myReservation['key'] = myReservationskeys[i];
                tempArr.push(myReservation);
    
            }
            
            setMyReservationArr(tempArr);
        }

    }, [tempFlag, showReservationMofidyModal]);

    // handler
    const modifyBtnClickHandler = (e, key) => {
        console.log('Modify Button CLICKED!!');

        setKeyToBeModified(key);
        setShowReservationMofidyModal(true);

    }

    const deleteBtnClickHandler = (e, key) => {
        console.log('Delete Button CLICKED!!');

        let result = window.confirm('Are you sure you want to delete?');

        if (result) {
            let reservationDBInStorage = localStorage.getItem('reservationDB');
            let reservationDBObject = JSON.parse(reservationDBInStorage);
            let myReservations = reservationDBObject[getLoginedSessionID()];

            delete myReservations[key];

            reservationDBObject[getLoginedSessionID()] = myReservations;
            reservationDBInStorage = JSON.stringify(reservationDBObject);
            localStorage.setItem('reservationDB', reservationDBInStorage);

            alert('Deleted.');

            setTempFlag((pv) => !pv);

        } else {
            alert('Canceled.');

        }

    }

    // css
    const style_div = {
        width: "1700px",
        margin: "0 auto",
    }
    
    const style_li = {
        padding: "4px", 
        marginTop: "5px",
        borderTop: "0px",
        borderRight: "0px",
        borderBottom: "1px",
        borderLeft: "0px",
        borderColor: "#dadada", 
        borderStyle: "solid",
    }

    return(
        <div style={style_div}>
            <ul>
                {
                    myReservationArr.map((myReservation, idx) => 
                        <>
                            <li style={style_li}>
                                예약번호: {myReservation.key} | 
                                예약자: {myReservation.rName} | 
                                메일: {myReservation.rMail} | 
                                연락처: {myReservation.rPhone} | 
                                출발지: {myReservation.rSP} | 
                                출발시간: {myReservation.rSPT} | 
                                도착지: {myReservation.rEP} | 
                                도착시간: {myReservation.rEPT} | 
                                성인: {myReservation.rAdultCnt} | 
                                언린이: {myReservation.rInfantCnt} | 
                                유아: {myReservation.rChildCnt} | &nbsp;
                                <button onClick={(e) => modifyBtnClickHandler(e, myReservation.key)}>Modify</button>
                                <button onClick={(e) => deleteBtnClickHandler(e, myReservation.key)}>Delete</button>
                            </li>
                        </>)
                }
            </ul>

            { 
                showReservationMofidyModal 
                ? 
                <div className="modalBg">
                    <div className="modal">
                        <ReservationMoify keyToBeModified={keyToBeModified} setShowReservationMofidyModal={setShowReservationMofidyModal}/> 
                        <br /><br />
                        <button onClick={() => {
                            console.log('modify modal CLOSED!!');
                            setKeyToBeModified('');
                            return setShowReservationMofidyModal(false);
                            }}>CLOSE</button>
                    </div>
                </div>
                : 
                null 
            }

        </div>
    );
}
export default ReservationList;