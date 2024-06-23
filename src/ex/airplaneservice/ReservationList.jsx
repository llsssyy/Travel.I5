import React, { useEffect, useState } from "react";
import { getLoginedSessionID } from "./session";

const ReservationList = () => {

    // hook
    const [myReservationArr, setMyReservationArr] = useState([]);

    useEffect(() => {
        console.log('useEffect!!');
        
        let reservationObjInStorage = localStorage.getItem('reservationDB');
        let curReservationObj = JSON.parse(reservationObjInStorage);
        setMyReservationArr(curReservationObj[getLoginedSessionID()]); 

    },[]);



    return(
        <ul className="reservation_list_wrap">
            {
                myReservationArr.map((reservation, idx) => {
                    console.log('reservation: ', reservation, 'idx : ', idx);

                    return <li>{reservation}</li>
                })
            }
        </ul>

    );

}

export default ReservationList;