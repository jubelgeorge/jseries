import React from 'react';
import { SocialIcon } from 'react-social-icons';


const Footer = () => (
    
        <div className = "footer-dark">
            <footer className= "footer1">
                <div class="item">
                    <h3>Services</h3>
                        <ul>
                            <li><a href="#">Search for web & tv series</a></li>                            
                        </ul>
                </div>
                
                <div classname="item social">             
                    <SocialIcon id="social-icon" className="item social" url="https://facebook.com/" />
                    <SocialIcon className="social-icon" url="https://instagram.com/" />
                    <SocialIcon className="social-icon" url="https://twitter.com/" />
                    <SocialIcon className="social-icon" url="https://email.com/" bgColor="green" />                
                </div> 
                <p class="copyright">&copy; Copyright {new Date().getFullYear()} Jubel George @JSeries</p>
                        
                
            </footer>
        </div>
    
);

export default Footer;

