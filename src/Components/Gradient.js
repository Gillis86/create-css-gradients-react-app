import React, { Component } from 'react';
import './Gradient.scss';
import { resolve } from 'path';



class Gradient extends Component {
    state = {
        InitialUserCode:null,
        showCode:false,
        codeHasChanged:false,
        
    }

    componentWillMount(){
        console.log('will mount')
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
                    
   setCode(code){
    this.setState({
        showCode:true,
        InitialUserCode:code
    })
    /* setTimeout(()=>{
        this.refs.codeText.value = this.refs.g__container.style.backgroundImage
    },500) */
    
   }
   showEditBtnHandler(event){
       this.setState({
        showEditBtn:true
    })
   }

   /* replaceAll(str,find,repl){
       return str.split(find).join(repl)
   } */

   /* changeGradients(){
       //console.log(this.refs.codeText.value)
       this.refs.g__container.style.backgroundImage = this.refs.codeText.value
   } */
   

    
    render(){            
        //console.log('render')
        //console.log(this.props.colors)
        let code = null;
        let editBtn = null;
        let message = null;
        let style = null;
        let gradientSwitch = null;
        let colors = this.props.colors
        let colorsRegex = /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/
        let modeRegex = /^[a-z]+/
            if(this.state.InitialUserCode != null){
                
                 // questa riga è importante: qui vengono inzializzati i colori se 
                                                // l'utente clicca su change
                let userCode = this.state.InitialUserCode.replace(modeRegex,this.props.mode) // qui catturo la formula dell'utente
                //console.log('state code we have')
                //console.log(this.state.code)
                //console.log(userCode)
                let finalStyle = []
                /* colors.forEach(color => {
                    final = finalStyle.replace(regex,'color')
                    console.log(final)
                });
                 */
                let f;


                for (let i=0;i<colors.length;i++){
                    if(finalStyle.length){
                        f = finalStyle[finalStyle.length - 1].replace(colorsRegex,colors[i])
                        finalStyle.push(f)
                    }else{
                        f = userCode.replace(colorsRegex,colors[i])
                        //console.log('first iteration',f)
                        finalStyle.push(f)
                    }
                    //console.log(finalStyle)
                    
                }

                const final = finalStyle[finalStyle.length - 1]
                console.log(final)
                //console.log('final',finalStyle)
                style = {
                    backgroundImage: final //finalStyle[finalStyle.length - 1]
                }

                /* if(this.refs.codeText){
                    this.refs.codeText.innerHTML = final
                } */

                //setTimeout(()=> this.refs.codeText.innerHTML = final,1000)
                
            }else{
                const bg = this.props.mode+"-gradient("+colors.join(',')+")"
                 style = {
                    backgroundImage: bg
                }
                /* if(this.refs.codeText){
                    this.refs.codeText.innerHTML = bg
                } */
                //setTimeout(()=>this.refs.codeText.innerHTML = bg,1000)
            }
   
        
        
         

        if(this.state.showCode){
            console.log('set user code',this.state.UserCode)
            const UserCode = this.state.UserCode
            code = (
                    <textarea ref="codeText" className="gradient__edit" 
                    name="" 
                    id="codeText" 
                    cols="40" 
                    rows="2" readOnly>
                    {UserCode}
                    </textarea>
                
            )

            gradientSwitch = (
                <select name="gradient-mode" className="gradient__controls--switch" onChange={
                    (event)=> {
                            this.props.setMode(event.target.value)

                            setTimeout(()=>{

                                //this.setCode(this.refs.g__container.style.backgroundImage)
                                /* this.setState({
                                    UserCode: this.refs.g__container.style.backgroundImage
                                }) */
                                this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                                //console.log('inside chanhe event',this.refs.g__container.style.backgroundImage)
                            },200)
                            
                            /* this.setState({
                                UserCode: 
                            }) */
                            /* setTimeout(()=>{
                                const code = this.refs.g__container.style.backgroundImage
                                //console.log('string',code)
                                this.setCode(code)
                            },1000) */
                                
                            
                            
                        /* function promisedStateSet(){
                            return new Promise((resolve,reject)=>{
                                
                                resolve()
                            })
                        } */
                        //promisedStateSet()
                                //.then(()=>{
                                    //const code = this.refs.g__container.style.backgroundImage
                                    //console.log('inside promised',code)
                                    //this.setCode(code)
                                    //this.refs.codeText.value = code
                                //}).catch(err => console.error(err))
                        
                    }
                }>
                    <option value="linear">linear</option>
                    <option value="radial">radial</option>
                </select>
            )

           
        

           
                /* editBtn = (
                    <button 
                    className="gradient__controls--btn"
                    onClick={()=>{
                        const string = this.refs.codeText.value
                        this.setCode(string)
                        //this.refs.g__container.style.backgroundImage = string
                    }}>
                    Change
                </button>
                ) */

                /* message = (
                    <p className="gradient__controls--message">
                    Edit the code below and click change to see the result </p>
                    
                    
                ) */
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
                                /* this.setState({
                                    showCode:false
                                }) */
                                this.props.shuffle()
                                /* setTimeout(()=>{
                                    const textArea = this.refs.codeText
                                    if(textArea){
                                        this.refs.codeText.value = this.refs.g__container.style.backgroundImage
                                    }
                                    
                                },200) */

                                
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
                                if(this.state.InitialUserCode === null){
                                    this.setCode(code)
                                }
                                
                            }
                        }>Get Code</button>
                            </td>
                            {/* <td> {message}</td> */}
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