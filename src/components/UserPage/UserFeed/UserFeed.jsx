import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem/FeedItem';
import "../../../terminal.css"

function UserFeed({view}) {
    
    const feed = useSelector(store => store.feed);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);
    return(
            <div className="terminal-timeline">
                {feed?.map((item, i) => (
                    <FeedItem key={i}item={item} view={view}/>
                ))}
                <button className="btn btn-primary btn-block" >Load More</button>          
            </div>
    );



}

export default UserFeed;
