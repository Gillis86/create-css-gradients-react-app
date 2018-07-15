import React, { Component } from 'react';
import './Gradient.scss';




class Gradient extends Component {
    
    componentWillMount(){
        this.props.setPermutations()
        console.log('[Gradient.js] componentWillMount')

        
    }

   /*  shouldComponentUpdate(nextProps){
        console.log('next',nextProps.linearAngle)
        console.log('this',this.props.linearAngle)
        //return nextProps.linearAngle !== this.props.linearAngle
        return true
    } */

    componentWillUpdate(){
    
    }

 
  componentDidUpdate(){
      console.log('[Gradient.js] component did update')
            const textArea = this.refs.codeText
            if(textArea){
                this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                        }
                                    
               
  }
                    


    
    render(){
        
        console.log('[Gradient.js] render start')
       const {colors, mode, radialShape, radialPosX, radialPosY, linearAngle, changeGradientProps} = this.props

     


        /* const colors = this.props.colors
        const mode = this.props.mode */
        let style;
        let controls;

        if(mode === 'linear'){
        
            style = {
                backgroundImage: `${mode}-gradient(${linearAngle}deg,${colors.join(',')})`
        }

            controls=(
                <div className="gradient__linear">

                <form>

                        <input ref="lA" type="number" defaultValue={
                        linearAngle
                    } />
                    <button type="submit" className="gradient__linear--btn gradient__controls--btn" onClick={
                        (event)=>{
                                event.preventDefault()
                                //console.log(this.refs.lA.value)
                                //if(typeof this.refs.lA.value === 'string' && this.refs.lA.value !== ''){
                                    changeGradientProps({
                                        prop:this.refs.lA.value,
                                        label:'linearAngle'
                                    })
                                //}
                                
                            
                            
                        }
                    }>Set Angle</button>


                </form>
                    
                </div>
                
            )
        console.log(style.backgroundImage)
        }else{
            style = {
                backgroundImage: `${mode}-gradient(${radialShape} at 
                    ${radialPosX}% ${radialPosY}%,${colors.join(',')})`
            }


            controls=(
                <div className="gradient__radial">
                    <select name="" id="" onChange={
                        (event)=>{
                            changeGradientProps({
                                prop:event.target.value,
                                label:'radialShape'
                            })
                        }
                    }>
                        <option value="circle">circle</option>
                        <option value="ellipse">ellipse</option>
                        <option value="farthest-side">farthest-side</option>
                        <option value="closest-corner">closest-corner</option>
                        <option value="closest-side">closest-side</option>
                        <option value="farthest-corner">farthest-corner</option>
                    </select>
                    <div className="gradient__radial--pos">
                        <div>
                            <form>


                                <input ref="rPX" type="number" name="" id="" defaultValue={
                        radialPosX
                    } />
                            <button type="submit" className="gradient__controls--btn" onClick={
                                (event)=>{
                                        event.preventDefault()
                                    
                                    //if(typeof this.refs.rPX.value === 'string' && this.refs.rPX.value !== ''){
                                        changeGradientProps({
                                            prop:this.refs.rPX.value,
                                            label:'radialPosX'
                                        })
                                    //}
                                }
                                

                            }>set X (%)</button>


                            </form>
                            
                        </div>
                        <div>

                            <form>

                                <input ref="rPY" type="number" name="" id="" defaultValue={
                        radialPosY
                    } />
                            <button className="gradient__controls--btn" onClick={
                                (event)=>{
                                    event.preventDefault()
                                    //if(typeof this.refs.rPY.value === 'string' && this.refs.rPY.value !== ''){
                                        changeGradientProps({
                                            prop:this.refs.rPY.value,
                                            label:'radialPosY'
                                        })
                                    //}
                                }
                                
                                


                             }>set Y (%)</button>

                            </form>
                            
                        </div>
                        
                    </div>
                    
                
                </div>
            )
        }
        
        
   
        
        
         

        //if(this.props.showCode){
            const code = (
                    <textarea ref="codeText" className="gradient__edit" 
                    name="" 
                    id="codeText" 
                    cols="40" 
                    rows="2" readOnly> 
                    </textarea>
                
            )

           const gradientSwitch = (
                <select name="gradient-mode" className="gradient__controls--switch" onChange={
                    (event)=> {
                            this.props.setMode(event.target.value)

                            /* setTimeout(()=>{
                                this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                            },200) */

                        
                    }
                }>
                    <option value="linear">linear</option>
                    <option value="radial">radial</option>
                </select>
                )

            //}


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
                            <td>
                                {controls}
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