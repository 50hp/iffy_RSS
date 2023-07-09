import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

    return (
 
         <div className="navbar">
           <div className="terminal-nav"> 
             <div className="terminal-logo">
                 <div className="terminal-prompt">
                    <a href="#/home">iffy RSS</a>
                 </div>
             </div>
            </div>
            <nav className="navLinks">
                 <ul>
              {/* If no user is logged in, show these links */}
              {!user.id && (
                // If there's no user, show login/registration links
                  <div>
                     <li>
                       <Link to="/about">
                        About
                      </Link>                        
                      </li> 

                      <li>
                        <Link to="/login">
                             Login / Register
                        </Link>
                      </li>
                  </div>
              )}
       
              {/* If a user is logged in, show these links */}
              {user.id && (
                <>
                      <li>
                          <Link to="/user">
                            Home
                          </Link>
                      </li> 
                      <li>
                       <Link to="/archive">
                        Archive
                      </Link>                        
                      </li> 
                      <li>
                       <Link to="/settings">
                        Settings
                      </Link>                        
                      </li>
                         <li>
                       <Link to="/about">
                        About
                      </Link>                        
                      </li> 
                     <li>
                    <a>_ </a> 
                    </li>

                     <li>  
                        <LogOutButton className="test"/>
                     </li>
                 </>
              )}
                 </ul>
            </nav>
         </div>
  );
}

export default Nav;
