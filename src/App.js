import React, { Component } from 'react';
import Header from './Components/Header';
import ColorsTable from './Components/ColorsTable';
import Palette from './Components/Palette'
import Gradient from './Components/Gradient'
import data from './data/data';
import './App.scss';


class App extends Component {

 state = {
  data:data,
  palettes:[],
  colors:[],
  showResult:false,
  perm_gen:null,
  colorPermutations:null
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


hideResult(){
  //console.log(this.state.colors)
  this.setState({
    showResult:false,
    colorPermutations:null
  })
}
  render() {
    let palettesRendering = null;
    let result = null
    if(this.state.palettes.length !== 0){
      const palettes = this.state.palettes
      palettesRendering = (
        <div className="palettes">
        <div className="palettes__heading">
          <h3>Select your colors from the palettes and get the result</h3>
        </div>
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
          <button className="result__btn" onClick={this.showResultHandler.bind(this)}>
              Combine
        </button>
        </div>
      );
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
          shuffle={()=>this.shuffle()}
          setPermutations={() => this.setPermutations() }
        />
        </div>
      )
    }

    return (
      <div className="App">
        <Header/>
        <ColorsTable
        clicked={(payload) => this.setPalette(payload)}
        //showResultHandler={() => this.showResultHandler()} 
        colors={{
          labels:Object.keys(this.state.data),
          colors:this.state.data
        }}
        />
        <main className="main">
        {palettesRendering}
        {result}
        </main>
      </div>
    );
  }
}

export default App;
