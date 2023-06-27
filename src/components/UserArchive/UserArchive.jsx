import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import FeedItem from '../UserPage/UserFeed/FeedItem/FeedItem.jsx';


function UserArchive() {
    
    const saves = useSelector(store => store.saves);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch({type:"FETCH_SAVES"});
    }, []);

    return(
        <>
            <div>
                {saves?.map((item, i) => (
                    <FeedItem key={i}item={item}/>
                ))}
            </div>
        </>
    );



}

export default UserArchive;
