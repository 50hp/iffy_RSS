import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem/FeedItem';
import 'terminal.css'

function UserFeed() {
    
    const feed = useSelector(store => store.feed);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);

    return(
            <div class="terminal-timeline">
                {feed?.map((item, i) => (
                    <FeedItem key={i}item={item}/>
                ))}
                <button className="btn btn-primary btn-block" >Load More</button>          
            </div>
    );



}

export default UserFeed;
