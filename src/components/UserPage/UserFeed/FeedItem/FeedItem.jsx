import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FeedContent from "./FeedContent/FeedContent";
import 'terminal.css'


function FeedItem({item}) {
    
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const [markRead, setMarkRead] = useState(item.isread);
    const [markSave, setMarkSave] = useState(item.issaved);
    const [content, setContent] = useState(false);
    const [isContent, setIsContent] = useState(true);
    
    const handleClick = (button) => {

        switch(button) {
        case 'read':
            setMarkRead(!markRead);
            dispatch({type:"SET_READ", payload:{
                                                state: !markRead,
                                                id: item.post_id
                                                }});
            return;
        case 'save':
            setMarkSave(!markSave);
            dispatch({type:"SET_SAVE", payload: item});
            return;
        case 'content':
            setContent(!content);
            return;  
        }
    }

    const onLoad = () => {
        (item.content === item.contentsnippet) ? (setIsContent(false)) : ('asdf')
        setMarkRead(item.isread);
        console.log(markRead);
    }

    useEffect(() => {
        onLoad();
    }, [])
    // console.log(user);
    return(

            <div class="terminal-card">

                <h4>{item.title}</h4>

        {(!markRead) ? (   
            <>
                    <span>Date: {item.pubdate}</span>
                    <p>Author: {item.creator || item.author}</p>
                    {isContent ? (
                        content ? (
                            <button className="btn btn-default btn-ghost" onClick={() => handleClick('content')}> Read Less </button>
                            ) : (
                            <button className="btn btn-default btn-ghost" onClick={() => handleClick('content')}> Read More </button>
                            )
                        ) : (<></>)}


                    <FeedContent content={item.content}
                                 contentsnippet={item.contentsnippet}
                                 view={content} 
                    />
                    {(user.id) ? (
                        <div>
                           {markSave ? (
                                <button className="btn btn-default btn-ghost" onClick={()=> handleClick('save')}> UnSave </button>
                                ) : (
                                <button className="btn btn-default btn-ghost" onClick={()=> handleClick('save')}> Save </button>
                                )} 
                        </div>
                    ) : ( <></> )}

               </> ) : (

                        <></>
                )
                
        } 

        {markRead ? (
                <button className="btn btn-default btn-ghost" onClick={()=> handleClick('read')}> Expand </button>
                ) : ( 
                <button className="btn btn-default btn-ghost" onClick={()=> handleClick('read')}>  Collapse  </button>
                )}

            </div>
    );


}


export default FeedItem;

