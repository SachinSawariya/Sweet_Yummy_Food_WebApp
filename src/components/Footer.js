import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', marginTop:"3rem", textAlign: 'center' , display:'flex', justifyContent:"space-around"}}>
            <div>
                <h3>Contact Information</h3>
                <p>Email: groupof-3@gmail.com</p>
                <p>Phone: 8434275032</p>
                <p>Address: Chandigarh University</p>
            </div>
            <div>
                <h3>Moto - Taste One time remember life time.</h3>
                <p>&copy; {new Date().getFullYear()} Sweet Yummy Food.</p> <p>All rights reserved.</p>
                
            </div>
        </footer>
    );
}

export default Footer;
