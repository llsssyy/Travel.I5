import React, { useState } from "react";
import Home from "./Home";
import Reservation from "./Reservation";
import ReservationList from "./ReservationList";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import { setLoginedSessionID, getLoginedSessionID } from './session.js';

const Menubar = () => {

    // hook
    const [isHome, setIsHome] = useState(true);         // true || false
    const [isSignUp, setIsSignUp] = useState(false);     // true || false
    const [isSignIn, setIsSignIn] = useState(false);     // true || false
    const [isReservation, setIsReservation] = useState(false);     // true || false
    const [isReservationList, setIsReservationList] = useState(false);     // true || false
    const [isLogined, setIsLogined] = useState(false);

    // handler
    const homeClickHandler = () => {
        console.log('homeClickHandler() CALLED!!');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsReservation(false);
        setIsReservationList(false);

    }
    const signUpClickHandler = () => {
        console.log('signUpClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setIsReservation(false);
        setIsReservationList(false);

    }
    const signInClickHandler = () => {
        console.log('signInClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsReservation(false);
        setIsReservationList(false);

    }
    const signOutClickHandler = () => {
        console.log('signOutClickHandler() CALLED!!');

        setLoginedSessionID();

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsReservation(false);
        setIsReservationList(false);

        setIsLogined(false);

    }
    const reservationClickHandler = () => {
        console.log('reservationClickHandler() CALLED!!');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsReservation(false);
            setIsReservationList(false);

            return;

        } 

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsReservation(true);
        setIsReservationList(false);

    }
    const reservationListClickHandler = () => {
        console.log('reservationListClickHandler() CALLED!!');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsReservation(false);
            setIsReservationList(false);
            
            return;
            
        } 

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsReservation(false);
        setIsReservationList(true);

    }

    // fucntion 
    const changeMunuBar = (loginStatus) => {
        console.log('changeMunuBar() CALLED!!');

        setIsLogined(loginStatus);

    }

    return(
        <>
            <div>
                <a href="#none" onClick={homeClickHandler}>home</a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                {
                    isLogined
                    ?
                    <>
                    <a href="#none" onClick={signOutClickHandler}>sign_out</a>
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    </>
                    :
                    <>
                    <a href="#none" onClick={signUpClickHandler}>sign_up</a>
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    <a href="#none" onClick={signInClickHandler}>sign_in</a>
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    </>
                }
                <a href="#none" onClick={reservationClickHandler}>reservation</a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <a href="#none" onClick={reservationListClickHandler}>reservation_list</a>
            </div>
            {
                isHome
                ?
                <Home />
                :
                null
            }
            {
                isSignUp
                ?
                <SignUp 
                    homeViewer={setIsHome} 
                    signUpViewer={setIsSignUp} 
                    signInViewer={setIsSignIn}  
                    reservationViewer={setIsReservation}  
                    reservationListViewer={setIsReservationList} />
                :
                null
            }
            {
                isSignIn
                ?
                <SignIn 
                    changeMunuBar={changeMunuBar} 
                    homeViewer={setIsHome} 
                    signUpViewer={setIsSignUp} 
                    signInViewer={setIsSignIn}  
                    reservationViewer={setIsReservation}  
                    reservationListViewer={setIsReservationList} />
                :
                null
            }
            {
                isReservation
                ?
                <Reservation 
                    homeViewer={setIsHome} 
                    signUpViewer={setIsSignUp} 
                    signInViewer={setIsSignIn}  
                    reservationViewer={setIsReservation}  
                    reservationListViewer={setIsReservationList} />
                :
                null
            }
            {
                isReservationList
                ?
                <ReservationList />
                :
                null
            }
        </>
    );
}

export default Menubar;