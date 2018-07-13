import React, { Component } from 'react';
import Header from './Components/Header';
import Palette from './Components/Palette'
import Gradient from './Components/Gradient'
import Navbar from './Components/Navbar'
import data from './data/data';
import './App.scss';


class App extends Component {

 state = {
  data:data,
  palettes:[],
  colors:[],
  showResult:false,
  perm_gen:null,
  colorPermutations:null,
  gradientMode:'linear',
  showCode:false
}

  setPalette(colorLabel){
    //console.log(this.state.palettes)
    //console.log(colorLabel)
    if(this.state.palettes.length !== 0){
      let ISpresent = this.state.palettes.find(p => p.label === colorLabel)
      if(ISpresent){
        return
      }else{
        const palette = this.state.data[colorLabel]
        const palettes = this.state.palettes
          palettes.push({
              label:colorLabel,
              palette
        })
          this.setState({
          palettes
       })
      }
    }else{
      const palette = this.state.data[colorLabel]
      this.setState({
        palettes:[{
          label:colorLabel,
          palette
        }]
     }) 
    }
  }

  componentDidMount(){
    React.Children.forEach(this.props.children, child => console.log(child.props))
  }

setColor(color){
  const colors = this.state.colors.slice(0);
  const duplicate = colors.find(c => c.color === color.color)
  if(duplicate){
    return
  }
  colors.push(color)
  this.setState({
    colors
    })
}




permutation_gen = function*(permutations){
  for (let p of permutations){
  	yield p
  }
}

permutation(array) {
  function p(array, temp) {
      let i, x;
      if (!array.length) {
          result.push(temp);
      }
      for (i = 0; i < array.length; i++) {
          x = array.splice(i, 1)[0];
          p(array, temp.concat(x));
          array.splice(i, 0, x);
      }
  }

  const result = [];
  p(array, []);
  return result
}

setPermutations(){
  const permutations = this.permutation(this.state.colors)
  const perm_gen = this.permutation_gen(permutations.slice(1))
  this.setState({
    perm_gen,
    colorPermutations: permutations
  })
}

shuffle(){
    const value = this.state.perm_gen.next()
    if (!value.done){
      
        this.setState({
          colors: value.value
        })
      
  }else{
    const perm_gen = this.permutation_gen(this.state.colorPermutations)
      this.setState({
        perm_gen,
        colors: perm_gen.next().value
        })

    }
  
  
  
}

removeColor(color){
  const colors = this.state.colors.slice(0);
  //console.log(colors.indexOf(color))
  let colorToEliminate = colors.find(c => c.color === color)
  colors.splice(colors.indexOf(colorToEliminate),1)
  //console.log(colors)
  this.setState({
    colors:colors
    })
}

showResultHandler(){
  if(this.state.colors.length > 1 && this.state.colors.length <= 6){
    this.setState({
      showResult: true
    })
  }else if(this.state.colors.length >= 7){
    alert('Try with at most 6 colors for performance reasons')
  }else{
    alert('Combine at least two color')
  }
  
}


removePalette(label){
  const palettes = this.state.palettes
  const itemToRemove = palettes.find(palette => palette.label === label)
  const colors = this.state.colors.filter(color => color.label !== label)
  palettes.splice(palettes.indexOf(itemToRemove),1)
  this.setState({
    palettes,
    colors 
  })
  /* if(palettes.length === 0){
    this.setState({
      colors:[]
    })
  } */
}

showCodeHandler(){
  this.setState({
    showCode:true
  })
}

hideResult(){
  //console.log(this.state.colors)
  this.setState({
    showResult:false,
    colorPermutations:null,
    gradientMode:'linear',
    showCode:false
  })
}
  render() {
    let palettesRendering = null;
    let result = null;
    let ScrollBtn = null;
    if(this.state.palettes.length !== 0){
      const palettes = this.state.palettes
      palettesRendering = (
        <div>
        <Navbar
        showResult={()=>this.showResultHandler()}
        />
        <div ref="palettes" className="palettes">
        {palettes.map(palette => {
            return <Palette
                      key={palette.label} 
                      label={palette.label}
                      setColor={(color) => this.setColor(color)}
                      colors={palette.palette}
                      removePalette={(label)=>this.removePalette(label)}
                      removeColor={color => this.removeColor(color)}
                      />
                      
          })}
        </div>
      </div>   
      );
      ScrollBtn = (
        <div className="scroll"
        onClick={
          ()=> {
            const palettesDOMRef = this.refs.palettes
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

    if(this.state.showResult){
      result = (
        <div className="result">
        <div className="result__close" onClick={this.hideResult.bind(this)}>
        <i className="fas fa-times fa-3x"></i>
        </div>
        <Gradient 
          colors={
            this.state.colors.map(color => color.color)
            
          }
          showCode={this.state.showCode}
          showCodeHandler={()=>this.showCodeHandler()}
          setMode={(mode)=>this.setState({gradientMode:mode})}
          mode={this.state.gradientMode}
          shuffle={()=>this.shuffle()}
          setPermutations={() => this.setPermutations() }
        />
        </div>
      )
    }

    return (
      <div className="App">
        <Header
          clicked={(payload) => this.setPalette(payload)}
          colors={{
            labels:Object.keys(this.state.data),
            colors:this.state.data
          }}
          activePalettes={
            this.state.palettes
          }
        />
        <div className="scroll__wrapper">
        {ScrollBtn}
        </div>
        
        <main className="main">
        {palettesRendering}
        {result}
        </main>
      </div>
    );
  }
}

export default App;
