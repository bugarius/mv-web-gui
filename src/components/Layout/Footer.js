import React, { Component } from 'react';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear()
        return (
            <footer className="footer-container">
                <span>&copy; {year} - Moja Winnica</span>
            </footer>
        );
    }

}

export default Footer;
