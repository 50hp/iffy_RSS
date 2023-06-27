import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";



function UserSettings() {
    
    const dispatch = useDispatch();
    const settings = useSelector(store => store.settings);
    

    useEffect(() => {
        dispatch({type:"FETCH_SETTINGS"});
    }, []);

    return(
        
        <div>

            <p>asdlkfj;asldkjf</p>

        </div>
    );





}

export default UserSettings;
