import React, { Component } from 'react';
import './ColorsTable.scss';




class ColorsTable extends Component {
  

  render() {
    const colors = this.props.colors

    return (
      <div className="colorTable">
      <h3 className="colorTable__heading">Select the palettes</h3>
      <div className="colorTable__labels">
      {colors.labels.map( colorLabel => {
        let values = colors.colors[colorLabel]
        //console.log(colors.colors[colorLabel])
          let style = {
            backgroundColor: values[values.length - 1 ]
          }
           return  <div style={style} key={colorLabel} onClick={
             (event)=>{
              event.stopPropagation()
               this.props.clicked(colorLabel)
              }
           } className="colorTable__item">{colorLabel}</div>
          })
        }
      
      </div>
      </div>
      )
  
  }
}

export default ColorsTable;