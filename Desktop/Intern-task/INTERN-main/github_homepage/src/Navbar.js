import React,{useState} from 'react';
import github from './img/github.png';
import plus from './img/p.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faBell,faCaretDown,faUserCircle } from '@fortawesome/free-solid-svg-icons'


 function Navbar(){
    const [open,setOpen]=useState(false);
      
     function Dropdown(){
console.log("hey")
     }
return(
<div>
    <nav className="navigation">
        <div className="left-header">
            <img src={github} className="App-logo" alt="logo" />
            <i className="fab fa-github"></i>
            <input type="text" placeholder="Search or jump to.."></input>
        </div>
        <ul className="feature">
            <li>Pull requests</li>
            <li>Issues</li>
            <li>Marketplace</li>
            <li>Explore</li>
        </ul>
        <div className="icon">
            <i className="far fa-bell"></i>
            <ul>
                <li><FontAwesomeIcon icon={faBell} /><i onClick={()=>setOpen(!open)} ></i></li>
                <li> <FontAwesomeIcon icon={faPlus} /><li><FontAwesomeIcon icon={faCaretDown} /></li></li>
                <li><FontAwesomeIcon icon={faUserCircle} /><li><FontAwesomeIcon icon={faCaretDown} /></li></li>
            </ul>
            <ul className="dropdown" >
                                    <li>New repository</li>
                                    <li>Import repository</li>
                                    <li>New gist</li>
                                    <li>New organization</li>
                                    <li>New project</li>
                                </ul>
        </div>
    </nav>
</div>
);
 }
 export default Navbar;