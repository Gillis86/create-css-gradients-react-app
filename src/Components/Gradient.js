import React, { Component } from 'react';
import './Gradient.scss';



class Gradient extends Component {
    state = {
        code:null,
        showCode:false,
        linearGr: null
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
   

    
    render(){            
        
        let code = null

        const style = {
            backgroundImage: "linear-gradient("+this.props.colors.join(',')+")"
        }

        if(this.state.showCode !==null){
            code = (
                <code>
                    {this.state.code}
                </code>
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
                                    code:null
                                })
                                this.props.shuffle()
                            }}>
                            Shuffle
                        </button>

                        </li>
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