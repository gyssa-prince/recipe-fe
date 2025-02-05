import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-text">&copy; {new Date().getFullYear()} Recipe Sharing. All rights reserved.</p>
                <p className="footer-text">Follow us on social media!</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" className="social-link">Facebook</a>
                    <a href="https://www.instagram.com" className="social-link">Instagram</a>
                    <a href="https://www.instagram.com" className="social-link">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
