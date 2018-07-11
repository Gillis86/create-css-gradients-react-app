import React, { Component } from 'react';
import './Gradient.scss';



class Gradient extends Component {
    state = {
        UserCode:null,
        showCode:false,
        codeHasChanged:false
    }

    componentWillMount(){
        console.log('will mount')
        this.props.setPermutations()
        
    }
 
  componentWillReceiveProps(){
      if(this.state.code){
          console.log('sta code we have')
      }
  }

   setCode(code){
    this.setState({
        showCode:true,
        UserCode:code
    })
   }
   showEditBtnHandler(event){
       this.setState({
        showEditBtn:true
    })
   }

   replaceAll(str,find,repl){
       return str.split(find).join(repl)
   }

   /* changeGradients(){
       //console.log(this.refs.codeText.value)
       this.refs.g__container.style.backgroundImage = this.refs.codeText.value
   } */
   

    
    render(){            
        console.log('render')
        let code = null;
        let editBtn = null;
        let message = null;
        let style = null;
        let colors = this.props.colors
        let regex = /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/
            if(this.state.UserCode != null){
                
                 // questa riga è importante: qui vengono inzializzati i colori se 
                                                // l'utente clicca su change
                let userCode = this.state.UserCode // qui catturo la formula dell'utente
                //console.log('state code we have')
                //console.log(this.state.code)
                let finalStyle = []
                /* colors.forEach(color => {
                    final = finalStyle.replace(regex,'color')
                    console.log(final)
                });
                 */
                let f;


                for (let i=0;i<colors.length;i++){
                    if(finalStyle.length){
                        f = finalStyle[finalStyle.length - 1].replace(regex,colors[i])
                        finalStyle.push(f)
                    }else{
                        f = userCode.replace(regex,colors[i])
                        //console.log('first iteration',f)
                        finalStyle.push(f)
                    }
                    
                    
                   
                }
                //console.log('final',finalStyle)
                style = {
                    backgroundImage: finalStyle[finalStyle.length - 1]
                }

            }else{
                 style = {
                    backgroundImage: "linear-gradient("+colors.join(',')+")"
                }
            }
      /*   if(this.state.code){
            //console.log('code state',this.state.code)
            //console.log('ref',this.refs.g__container.style.backgroundImage)

        } */

        
        /* (function(){
            that.setCode("linear-gradient("+this.props.colors.join(',')+")")
        })() */
        
        
            

       

        

        if(this.state.showCode){
            code = (
                    <textarea ref="codeText" className="gradient__edit" 
                    name="" 
                    id="" 
                    cols="40" 
                    rows="2">
                    {this.state.UserCode}
                    </textarea>
                
            )
        }

            if(this.state.showCode){
                editBtn = (
                    <button 
                    className="gradient__controls--btn"
                    onClick={()=>{
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
                                const code = this.refs.g__container.style.backgroundImage
                                this.setCode(code)
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