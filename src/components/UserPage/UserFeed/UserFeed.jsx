import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem/FeedItem';


function UserFeed() {
    
    const feed = useSelector(store => store.feedReducer);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);

    return(
        <>
        <p>as;dlkfjas;dlkfj</p>
        <div>
            {feed?.map(item => (
                <FeedItem key={item.id}item={item}/>
            ))}
        </div>
        </>
    );



}

export default UserFeed;
