import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem/FeedItem';
import 'terminal.css'

function UserFeed() {
    
    const feed = useSelector(store => store.feed);
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);   
    const loadMore = () => {
        setOffset(feed.length);
        dispatch({type:"LOAD_MORE", payload: offset}); 
    }

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);

    return(
            <div className="terminal-timeline">
                {feed?.map((item, i) => (
                    <FeedItem key={i}item={item}/>
                ))}
                <button onClick={() => loadMore()} className="btn btn-primary btn-block" >Load More</button>          
            </div>
    );



}

export default UserFeed;
