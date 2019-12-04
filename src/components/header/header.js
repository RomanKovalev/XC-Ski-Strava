import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="headerWrapper">
                <div><FontAwesomeIcon icon={faCog} size="xs" /></div>
                <h3 className="header">XC ski</h3>
            </div>
        );
    }
}

export default Header;
