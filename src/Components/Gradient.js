import React, { Component } from 'react';
import './Gradient.scss';



class Gradient extends Component {
    state = {
        code:null,
        showCode:false,
        linearGr: null,
        showEditBtn:false
    }
   componentDidMount(){
       this.props.setPermutations()
   }

   setCode(string){
    this.setState({
        showCode:true,
        code:string
    })
   }
   showEditBtnHandler(event){
       this.setState({
        showEditBtn:true
    })
   }

   changeGradients(){
       //console.log(this.refs.codeText.value)
       this.refs.g__container.style.backgroundImage = this.refs.codeText.value
   }
   

    
    render(){            
        
        let code = null
        let editBtn = null

        const style = {
            backgroundImage: "linear-gradient("+this.props.colors.join(',')+")"
        }

        if(this.state.showCode){
            code = (
                  /* <code>
                    {this.state.code}
                </code>  */

                
                    <textarea ref="codeText" onChange={this.showEditBtnHandler.bind(this)} className="gradient__edit" 
                    name="" 
                    id="" 
                    cols="40" 
                    rows="4">
                    {this.state.code}
                    </textarea>
                
            )
        }

            if(this.state.showEditBtn){
                editBtn = (
                    <button 
                    className="gradient__controls--btn"
                    onClick={()=>{
                        this.changeGradients()
                    }}>
                    Change
                </button>
                )
            }


        return(
            <div className="gradient">
                <div ref="g__container" className="gradient__container" style={style}></div>
                <div className="gradient__controls">
                    <ul className="gradient__controls--list">
                        <li>
                        <button 
                            className="gradient__controls--btn"
                            onClick={()=>{
                                this.setState({
                                    showCode:false
                                })
                                this.props.shuffle()
                            }}>
                            Shuffle
                        </button>

                        </li>
                        <li className="gradient__controls--edit">{editBtn}</li>
                        <li>
                        <button className="gradient__controls--btn"
                        onClick={
                            ()=>{
                                const string = this.refs.g__container.style.backgroundImage
                                this.setCode(string)
                            }
                        }>Get Code</button>
                        </li>
                        <li>
                        {code}
                        </li>
                        
                    </ul>
                </div>
            </div>
            
        )
    }


}

export default Gradient;