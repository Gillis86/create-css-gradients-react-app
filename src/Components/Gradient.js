import React, { Component } from 'react';
import './Gradient.scss';




class Gradient extends Component {


    componentWillMount(){
        this.props.setPermutations()

        
    }

 
  componentWillReceiveProps(){
      setTimeout(()=>{
            const textArea = this.refs.codeText
            if(textArea){
                this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                        }
                                    
                },0)
  }
                    


    
    render(){            
        let code = null;
        let editBtn = null;
        let gradientSwitch = null;
        let colors = this.props.colors
        
        const style = {
                    backgroundImage: this.props.mode+"-gradient("+colors.join(',')+")"
            }
   
        
        
         

        if(this.props.showCode){
            code = (
                    <textarea ref="codeText" className="gradient__edit" 
                    name="" 
                    id="codeText" 
                    cols="40" 
                    rows="2" readOnly> 
                    </textarea>
                
            )

            gradientSwitch = (
                <select name="gradient-mode" className="gradient__controls--switch" onChange={
                    (event)=> {
                            this.props.setMode(event.target.value)

                            setTimeout(()=>{
                                this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                            },200)

                        
                    }
                }>
                    <option value="linear">linear</option>
                    <option value="radial">radial</option>
                </select>
                )

            }


        return (
            <div className="gradient">
                <div ref="g__container" className="gradient__container" style={style}></div>
                <div className="gradient__controls">
                    <table className="gradient__controls--table">
                    <tbody>
                    <tr>
                            <td>
                            <button 
                            className="gradient__controls--btn"
                            onClick={()=>{
                                this.props.shuffle()
                            }}>
                            Shuffle
                        </button>
                            </td>
                            <td>{editBtn}</td>

                        </tr>
                        <tr>
                            <td>
                            <button className="gradient__controls--btn"
                        onClick={
                            ()=>{
                                    if(!this.props.showCode){
                                        this.props.showCodeHandler()
                                    }
                                    
                                
                            }
                        }>Get Code</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="gradient__controls--code">
                        {code} 
                    </div>
                    <div className="gradient__controls--wrapper">
                    <div className="gradient__controls--colors">
                        {
                           this.props.colors.map(color=>{
                            return <div
                            key={color} 
                            onClick={
                                ()=>{
                                 
                                
                                }
                            }
                            style={
                                {
                                    background:color,
                                    color: color
                                }
                            } className="gradient__controls--colors--item">
                                {color}
                            </div>
                        })
                        } 
                    </div>
                    {gradientSwitch}
                    </div>
                    
                </div>
            </div>
            
        )
    }


}

export default Gradient;