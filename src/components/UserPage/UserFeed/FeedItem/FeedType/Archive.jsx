import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FeedContent from "../FeedContent/FeedContent";


function Archive({item}) {

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
            dispatch({type:"SET_SREAD", 
                      payload:{state: !markRead, id: item.post_id }});
            return;
        case 'save':
            setMarkSave(!markSave);
            dispatch({type:"UNSAVE", payload: {post_id: item.post_id, user_id: item.user_id}});
            return;
        case 'content':
            setContent(!content);
            return;  
        }
    }

    const onLoad = () => {
        (item.content === item.contentsnippet) ? (setIsContent(false)) : ('asdf')
        setMarkRead(item.isread);
    }

    useEffect(() => {
        onLoad();
    }, [])


     return(
    
             <div className="terminal-card">
                  <header className="headingContainer">
                     <h4>{item.title}</h4>
                     {markRead ? (
                             <button className="btn btn-third" onClick={()=> handleClick('read')}> \|/ </button>
                             ) : ( 
                             <button className="btn btn-third" onClick={()=> handleClick('read')}>  /|\  </button>
                             )}
                 </header>

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
                                 )} 
    
                         </div>
     );
    
}


export default Archive;
