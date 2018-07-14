import React from 'react';
import './Header.scss'
import './ColorsTable.scss';



function Header(props) {
  let ScrollBtn;
    if(props.showBtnScroll){
      ScrollBtn = (
        <div className="scroll"
        onClick={
          ()=> {
            const palettesDOMRef = document.getElementById('palettesID')
            const pos = palettesDOMRef.offsetTop
            window.scrollTo({
            top:pos,
            behavior:'smooth'
          })
        }
        }
        >
          <i className="fas fa-arrow-down scroll__icon fa-3x"></i>
        </div>
      )
    }
    
    const colors = props.colors

    function isIncluded(el,array){
        return array.includes(el)
    }


    return (
      <header className="header">
      <div className="header__heading">
          <div className="header__logo">
            <i className="fas fa-paint-brush fa-5x"></i>
          </div>
         
          <div className="header__intro"> 
          <h3 className="header__intro--desc">
            Create Wonderful Gradients from Scratch!
          </h3>
            <a href="https://github.com/Gillis86/create-gradient-react-app" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-github fa-4x"></i>
            </a>
        </div>
      </div>
        
        
        
        <div className="colorTable">
        <h3 className="colorTable__heading">Select the palettes</h3>
      <div className="colorTable__labels">
      {colors.labels.map( colorLabel => {
        let values = colors.colors[colorLabel]
        let isActive = isIncluded(colorLabel,props.activePalettes.map(p => p.label));
        //console.log(colors.colors[colorLabel])
          let style = {
            backgroundColor: values[values.length - 1 ],
            transform: isActive ?
                        'scale(1.2)' : 'scale(1)',
            zIndex: isActive ?
            '9999999' : '0',
            border: isActive ? '2px solid #fff' : 'none'
            //transform:isActive ? 'scale(1.2)' : 'scale(1)'
          }
           return  <div style={style} key={colorLabel} onClick={
             (event)=>{
              event.stopPropagation()
               props.clicked(colorLabel)
              }
           } className="colorTable__item">{colorLabel}</div>
          })
        }
      
      </div>
      </div>
      <div className="scroll__wrapper">
        {ScrollBtn}
        </div>
      </header>
    );
  
}

export default Header;