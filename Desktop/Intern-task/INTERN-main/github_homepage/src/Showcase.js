import React from 'react';
import github from './img/github.png';
import Card from './Card';
import {BrowserRouter,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
function Showcase(){
    return(
        <div>
            <div className="showcase">
                <div className="showcase-content-left">
                    <div className="showrepo">
                        <h6>Repositories</h6>
                        <div className="button">
                            <BrowserRouter>
                        <button className="new"><FontAwesomeIcon icon={faFolderOpen} /><Link to={"/new"}>New</Link></button>
                        </BrowserRouter>
                        </div>
                    </div>
                    
                    <input type="text1" placeholder="Find a repository.."></input>
                    <h5>Working with a team?</h5>
                    <p>GitHub is built for collaboration. Set up an organization to improve the 
                        way your team works together, and get access to more features.</p>
                        <button className="organization">create an organization</button>
                </div>
                <div className="showcase-content-right">
                  <p className="left">Recent activity</p>
                  <Card activity="recent"/>
                  <p>All activity</p>
                  <Card activity="all"/>
                  <p> ProTip! The feed shows you events from people you follow and repositories you watch.</p>
                  <p>Subscribe to your news feed</p>
                  <div className="footer">
                  <div className="footer-left">
                     <p><img src={github} className="App-logo" alt="logo" />&#169;2020 GitHub, Inc.</p>
                  </div>
                  <div className="footer-right">
                        <ul>
                            <li>Blog</li>
                            <li>About</li>
                            <li>Shop</li>
                            <li>Contact</li>
                            <li>Github</li>
                            <li>Pricing</li>
                        </ul>
                        <ul>
                            <li>API</li>
                            <li>Training</li>
                            <li>Status</li>
                            <li>Security</li>
                        </ul>
                        <ul>
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Help</li>
                        </ul>
                  </div>
                  </div>
                </div>
            </div>
        </div>
    );
}
export default Showcase;