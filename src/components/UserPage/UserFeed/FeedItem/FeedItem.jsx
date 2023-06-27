import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FeedContent from "./FeedContent/FeedContent";



function FeedItem({item}) {
    
    const dispatch = useDispatch();
    const [markRead, setMarkRead] = useState(false);
    const [markSave, setMarkSave] = useState(false);
    const [content, setContent] = useState(false);
    const [isContent, setIsContent] = useState(true);
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
        case 'content':
            setContent(!content);
            return;  
        }
    }

    useEffect(() => {
        (item.content === item.contentsnippet) ? (setIsContent(false)) : ('asdf')
    }, [])



    return(
        <div>

            <h4>{item.title}</h4>
            <span>Date: {item.pubdate}</span>
            <p>Author: {item.creator || item.author}</p>
            {isContent ? (
            content ? (
                <button onClick={() => handleClick('content')}> Read Less </button>
                ) : (
                <button onClick={() => handleClick('content')}> Read More </button>
                )
            ) : (<></>)}


            <FeedContent content={item.content}
                         contentsnippet={item.contentsnippet}
                         view={content} 
            />
            
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

