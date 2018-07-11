import React from 'react';
import './Palette.scss';




function Palette(props) {
  
    const style = {
        color: props.colors[props.colors.length - 1]
    }
    return (
        <div className="palette">
            <h3 style={style} className="palette__label">
            {props.label}
                <span onClick={
                    () =>props.removePalette(props.label)
                }>
                <i style={style} className="fas fa-trash-alt fa-2x"></i>
                </span>
            </h3>
            <ul className="palette__list">
                {
                    props.colors.map(color =>{
                        const style = {
                            backgroundColor:color,
                            color:props.label === 'blackAndWhite' ? 'grey' : ''
                            
                        }

                        return <li style={style} 
                         className="palette__list--item"
                         onClick={(event)=>{
                            event.stopPropagation()
                             event.target.style.transform = 'scale(1.4)'
                             event.target.style.zIndex = '9999'
                             event.target.childNodes[1].style.visibility = 'visible'  
                             event.target.childNodes[1].style.opacity = '1' 
                             props.setColor({label:props.label,color:color})
                            
                            }}
                         key={color}>
                         {color}
                         <span 
                         
                         onClick={(event)=>{
                             event.stopPropagation()
                             event.currentTarget.parentElement.style.transform = 'scale(1)'
                             event.currentTarget.parentElement.style.zIndex = ''
                             event.currentTarget.style.opacity = '' 
                             event.currentTarget.style.visibility = ''   
                             props.removeColor(color)
                         }}>
                         <i className="fas fa-trash-alt fa-1x"></i>
                         </span>
                         </li>
                    })
                }
            </ul>

        </div>
        
      )
  
  
}

export default Palette;