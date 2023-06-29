import React from 'react';
import {useSelector} from 'react-redux';
import UserFeed from './UserFeed/UserFeed';

import "../../terminal.css"
function UserPage() {
    
    const user = useSelector((store) => store.user);
  


    return (
        <div className="container">
            <UserFeed/> 
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
