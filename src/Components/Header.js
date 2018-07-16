import React, {Component} from 'react';
import ColorsTableWrapper from '../hco/ColorsTableWrapper'
import './Header.scss'
import './ColorsTable.scss';



class Header extends Component {
  state = {
    mq:false
  }
componentWillMount(){
  if(window.matchMedia("(max-width: 600px)").matches){
    this.setState({
      mq:true
    })
  }

    window.addEventListener('resize',()=>{
      if(window.matchMedia("(max-width: 600px)").matches){
        this.setState({
          mq:true
        })
      }
    })
}

  render(){
    let ScrollBtn;

    /* console.log('[Header.js] render()') */
    if(this.props.showBtnScroll){
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
    
    const colors = this.props.colors

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
      <ColorsTableWrapper mq={this.state.mq}>
        {colors.labels.map( colorLabel => {
        let values = colors.colors[colorLabel]
        let isActive = this.props.activePalettes.map(p => p.label).includes(colorLabel)
          let style = {
            backgroundColor: values[values.length - 1 ],
            transform: isActive ?
                        'scale(1.2)' : 'scale(1)',
            zIndex: isActive ?
            '9999999' : '0',
            border: isActive ? '2px solid #fff' : 'none'
          }
           return <div key={colorLabel}>

          <div style={style}  onClick={
             ()=>{
             /*  event.stopPropagation() */
               this.props.clicked(colorLabel)
              }
           } className="colorTable__item">{colorLabel}</div>

           </div> 
           
          })
        }       
      </ColorsTableWrapper>
      <div className="scroll__wrapper">
        {ScrollBtn}
        </div>
      </div>
      
      </header>
    );


  }

  
  
}

export default Header;