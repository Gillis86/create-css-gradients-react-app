import React from 'react';
import './Navbar.scss';




function Navbar(props) {
    return (
      <nav className="navbar">
        <button className="navbar__btn" onClick={(event)=>{
            event.stopPropagation()
            props.showResult()
        }}>
              <span>combine</span>
        </button>
        <h3 className="navbar__heading">Select your colors from the palettes and get the result!</h3>
      </nav>
    );
  
}

export default Navbar;