import React, { Component } from 'react';
import './Gradient.scss';



class Gradient extends Component {
    state = {
        code:null,
        showCode:false,
    }
   componentDidMount(){
       this.props.setPermutations()
       this.setState({
           code: "linear-gradient("+this.props.colors.join(',')+")"
       })
   }
   componentWillReceiveProps(){
    /* console.log(this.props.colors)
    console.log(this.state.code)
    console.log(this.refs.g__container.style.backgroundImage)
    this.setState({
        code: "linear-gradient("+this.props.colors.join(',')+")"
    })
    */
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

   /* changeGradients(){
       //console.log(this.refs.codeText.value)
       this.refs.g__container.style.backgroundImage = this.refs.codeText.value
   } */
   

    
    render(){            
        
        let code = null;
        let editBtn = null;
        let message = null;

        const style = {
            backgroundImage: this.state.code
        }

        if(this.state.showCode){
            code = (
                    <textarea ref="codeText" className="gradient__edit" 
                    name="" 
                    id="" 
                    cols="40" 
                    rows="2">
                    {this.state.code}
                    </textarea>
                
            )
        }

            if(this.state.showCode){
                editBtn = (
                    <button 
                    className="gradient__controls--btn"
                    onClick={()=>{
                        //this.changeGradients()
                        const string = this.refs.codeText.value
                        this.setCode(string)
                        //this.refs.g__container.style.backgroundImage = string
                    }}>
                    Change
                </button>
                )

                message = (
                    <p className="gradient__controls--message">Edit the code below and click change to see the result</p>
                )
            }


        return(
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
                                this.setState({
                                    showCode:false
                                })
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
                                const string = this.refs.g__container.style.backgroundImage
                                this.setCode(string)
                            }
                        }>Get Code</button>
                            </td>
                            <td> {message}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="gradient__controls--code">
                        {code} 
                    </div>
                </div>
            </div>
            
        )
    }


}

export default Gradient;