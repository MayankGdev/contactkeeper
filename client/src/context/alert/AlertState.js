import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import {v4 as uuidv4} from 'uuid';
import AlertReducer from "./alertReducer";
import {
    SET_ALERT,REMOVE_ALERT
} from "../Types";

const AlertState = (props) => {
  const intitalState = [];
  const [state, dispatch] = useReducer(AlertReducer, intitalState);

    //set alert
    const setAlert = (msg,type,timeout=5000)=>{
        const id = uuidv4();
        dispatch({type:SET_ALERT,payload:{msg,type,id}});
        setTimeout(() => {
            dispatch({type:REMOVE_ALERT,payload:id});
        }, timeout);
    }

  return (
    <AlertContext.Provider
      value={{
        alerts:state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
