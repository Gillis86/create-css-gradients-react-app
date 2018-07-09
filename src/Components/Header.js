import React, { Component } from 'react';
import './Header.scss'
import logo from '../assets/img/logo.jpg'


class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo">
            <img className="header__logo--img" src={logo} alt="logo"/>
        </div>
        <div className="header__intro">
            <h3 className="header__intro--desc">
                Create Linear Gradient
            </h3>
        </div>
      </header>
    );
  }
}

export default Header;