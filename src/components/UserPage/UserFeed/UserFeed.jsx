import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

function UserFeed() {
    
    const feed = useSelector(store => store.feedReducer);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_FEED"});
    }, []);

    return(
        <p>as;dlkfjas;dlkfj</p>
    );



}

export default UserFeed;
