import React from 'react';

import { SocialIcon } from 'react-social-icons';


const Footer = () => (    
        <div className = "footer-dark">
            <footer className= "footer1">
                <div className="item">
                    <h3>Services</h3>
                        <ul>
                            <li><a href="/search-shows">Search for Web & Tv series</a></li>
                            <li><a href="/shows">Maintain Series List</a></li>                            
                        </ul>
                </div>
                
                <div className="item social">             
                    <SocialIcon id="social-icon" className="item social" url="https://facebook.com/" />
                    <SocialIcon className="social-icon" url="https://instagram.com/" />
                    <SocialIcon className="social-icon" url="https://twitter.com/" />
                    <SocialIcon className="social-icon" url="https://email.com/" bgColor="green" />                
                </div> 
                <p className="copyright">&copy; Copyright {new Date().getFullYear()} Jubel George @JSeries</p>
                        
            </footer>
        </div>    
);

export default Footer;