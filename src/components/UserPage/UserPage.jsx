import React from 'react';
import {useSelector} from 'react-redux';
import UserFeed from './UserFeed/UserFeed';

import "../../terminal.css"
function UserPage({view}) {
    
    const user = useSelector((store) => store.user);
  


    return (
        <div className="container">
            <UserFeed view={view}/> 
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
