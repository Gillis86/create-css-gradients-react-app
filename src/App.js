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
  radialShape:'circle',
  radialPosX:'50',
  radialPosY:'50',
  linearAngle:'90'

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

permute =  function*(a, n = a.length) {
  if (n <= 1) yield a.slice();
  else for (let i = 0; i < n; i++) {
    yield permute(a, n - 1);
    const j = n % 2 ? 0 : i;
    [a[n-1], a[j]] = [a[j], a[n-1]];
  }
}

async setPermutations(){
  //const permutations = await this.permutation(this.state.colors)
  const perm_gen = this.permute(this.state.colors).bind(this)//this.permutation_gen(permutations.slice(1))
  this.setState({
    perm_gen,
    //colorPermutations: permutations
  })
}

shuffle(){
    const value = this.state.perm_gen.next()
    if (!value.done){
      
        this.setState({
          colors: value.value
        })
      
  }else{
    const perm_gen = this.permute(this.state.colors)     //this.permutation_gen(this.state.colorPermutations)
      this.setState({
        perm_gen,
        colors: perm_gen.next().value
        })

    }
  
  
  
}

changeGradientProps(payload){
    switch (payload.label){
      case 'linearAngle':
        this.setState({
          linearAngle:payload.prop
        })
        break
      case 'radialShape':
        this.setState({
          radialShape:payload.prop
       })
        break
      case 'radialPosX':
        this.setState({
          radialPosX:payload.prop
         })
         break
      case 'radialPosY':
         this.setState({
           radialPosY:payload.prop
          })
          break
      default:
          console.log(payload)
          break
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
  if(this.state.colors.length > 1 && this.state.colors.length <= 9){
    this.setState({
      showResult: true
    })
  }else if(this.state.colors.length >= 9){
    alert('Try with at most 7 colors for performance reasons')
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
}



hideResult(){
  //console.log(this.state.colors)
  this.setState({
    showResult:false,
    colorPermutations:null,
    gradientMode:'linear',
    showCode:false,
    radialShape:'circle',
    radialPosX:'50',
    radialPosY:'50',
    linearAngle:'90'
  })
}
  render() {
    let palettesRendering = null;
    let result = null;
    /* let ScrollBtn = null; */
    if(this.state.palettes.length !== 0){
      const palettes = this.state.palettes
      palettesRendering = (
        <div>
        <Navbar
        showResult={()=>this.showResultHandler()}
        />
        <div id="palettesID" className="palettes">
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
    }

    if(this.state.showResult){
      result = (
        <div className="result">
        <div className="result__close" onClick={this.hideResult.bind(this)}>
        <i className="fas fa-times fa-3x"></i>
        </div>
        <Gradient 
          colors={this.state.colors.map(color => color.color)}
          changeGradientProps={(payload)=>this.changeGradientProps(payload)}
          setMode={(mode)=>this.setState({gradientMode:mode})}
          mode={this.state.gradientMode}
          shuffle={()=>this.shuffle()}
          setPermutations={() => this.setPermutations() }
          radialShape= {this.state.radialShape}
          radialPosX = {this.state.radialPosX}
          radialPosY = {this.state.radialPosY}
          linearAngle = {this.state.linearAngle}
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
          showBtnScroll={this.state.palettes.length !== 0}
          activePalettes={
            this.state.palettes
          }
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
