import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem/FeedItem';


function UserFeed() {
    
    const feed = useSelector(store => store.feed);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);

    return(
        <>
            <div>
                {feed?.map((item, i) => (
                    <FeedItem key={i}item={item}/>
                ))}
            </div>
        </>
    );



}

export default UserFeed;
