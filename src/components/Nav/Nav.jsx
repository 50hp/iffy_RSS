import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  //  return (
  //    <div className="nav">
  //      <Link to="/home">
  //        <h2 className="nav-title">Prime Solo Project</h2>
  //      </Link>
  //      <div>
  //        {/* If no user is logged in, show these links */}
  //        {!user.id && (
  //          // If there's no user, show login/registration links
  //          <Link className="navLink" to="/login">
  //            Login / Register
  //          </Link>
  //        )}
  // 
  //        {/* If a user is logged in, show these links */}
  //        {user.id && (
  //          <>
  //            <Link className="navLink" to="/user">
  //              Home
  //            </Link>
  // 
  //            <Link className="navLink" to="/info">
  //              Info Page
  //            </Link>
  // 
  //            <LogOutButton className="navLink" />
  //          </>
  //        )}
  // 
  //        <Link className="navLink" to="/about">
  //          About
  //        </Link>
  //      </div>
  //    </div>
  //  );
     return (
 
         <div className="sidenav">
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
                 <li>
                    <Link to="/login">
                         Login / Register
                    </Link>
                  </li>
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
                          <Link to="/info">
                            Info Page
                          </Link>
                      </li> 
                      <li>
                       <Link to="/about">
                        About
                      </Link>                        
                      </li> 
                 </>
              )}
                 <li>  
                    <LogOutButton className="btn btn-error btn-ghost"/>
                 </li>
                 </ul>
            </nav>
         </div>
  );
}

export default Nav;
