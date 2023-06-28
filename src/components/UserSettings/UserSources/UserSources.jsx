import { useState } from "react";
import { useDispatch } from "react-redux";


function UserSources({item, editToggle}){
    
    const dispatch = useDispatch();
    
    const handleClick = (button) => {
        switch(button) {
        case 'delete':
            dispatch({type:"DELETE_SOURCE", payload: item.rss_id });
            return;
        }
    }    

    return(

        <div>
            <h5>{item.source_name}</h5>
            <span>{item.source_url}</span>
            {editToggle ? (
                <div> 
                    <button onClick={()=> handleClick('delete')}> Remove Source </button>
                    <button> Mute Source </button>
                </div> 
                ) : (
                    <></>
                )}
            
        </div>);



}

export default UserSources;
