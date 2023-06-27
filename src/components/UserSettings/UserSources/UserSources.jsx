import { useState } from "react";
import { useDispatch } from "react-redux";


function UserSources({item, editToggle}){
    
    const dispatch = useDispatch();
    

    return(

        <div>
            <h5>{item.source_name}</h5>
            <span>{item.source_url}</span>
            {editToggle ? (
                <button> Remove Source </button>
                ) : (
                    <></>
                )}
            
        </div>);



}

export default UserSources;
