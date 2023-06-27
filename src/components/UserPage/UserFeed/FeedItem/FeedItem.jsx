import { useDispatch } from "react-redux";
import { useState } from "react";

function FeedItem({item}) {
    
    const dispatch = useDispatch();
    const [markRead, setMarkRead] = useState(false);
    const [markSave, setMarkSave] = useState(false);
    const handleClick = (button) => {
        switch(button) {
        case 'read':
            setMarkRead(!markRead);
            dispatch({type:"SET_READ", payload:!markRead});
            return;
        case 'save':
            setMarkSave(!markSave);
            dispatch({type:"SET_SAVE", payload:!markSave});
            return; 
        }
    }




    return(
        <div>

            <h4>{item.title}</h4>
            <span>{item.creator}</span>
            <p dangerouslySetInnerHTML={{__html:item.content}}/>
            
            {markRead ? (
                <button onClick={()=> handleClick('read')}> Mark as UnRead </button>
                ) : ( 
                <button onClick={()=> handleClick('read')}> Mark as Read </button>
                )}
            {markSave ? (
                <button onClick={()=> handleClick('save')}> UnSave </button>
                ) : (
                <button onClick={()=> handleClick('save')}> Save </button>
                )} 


        </div>
    );


}


export default FeedItem;

