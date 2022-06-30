import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../FireBaseConfig/FireBase";
import { login, logout } from "../Store/Auth";
import { startLoadingNotes } from "../Store/Journal";

export const UseCheckOut = () => {

    const { status } = useSelector(state => state.auth)
    // console.log( status )
    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) return dispatch(logout())

            const { uid, email, displayName, photoURL } = user

            dispatch( login({ uid, email, displayName, photoURL}) )
			dispatch( startLoadingNotes())

        }
        )
    }, [])
  
    return status
    
}

