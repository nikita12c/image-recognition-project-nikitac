import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const particleOption={
                    "particles": {
                        "line_linked": {
                                    "color":"#FFFFFF"
                                    },
                        "number": {
                            "value": 150
                        },
                        "size": {
                            "value": 2
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
}
const initialState={
      input:'',
      imageUrl:'',
      route:'signin',
      isSignedin:false,
  user:{
      id:'',
      name:'',
      email:'',
      entries:0,
      joined:''   
  }
}
class App extends Component {
constructor(){
	super();
	this.state=initialState;
}

onInputChange=(event)=>{
    this.setState({input:event.target.value})
}

// componentDidMount(){
//   fetch('http://localhost:3000/')
//   .then(response=>response.json())
//   .then(console.log);
// }

onButtonSubmit=()=>{
	this.setState({imageUrl:this.state.input});
      fetch('http://localhost:3000/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
        input:this.state.input
        })
     }).then(response=>response.json())
        .then(response => {
          if(response){
            fetch('http://localhost:3000/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
              id:this.state.user.id
            })
          })
            .then(response=>response.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        //remaining box detect part
      })
      .catch(err =>console.log(err));
}
loadUser=(data)=>{
 this.setState({user:{
       id:data.id,
       name:data.name,
       email:data.email,
       entries:data.entries,
       joined:data.joined   
   }})
}

onRouteChange=(route)=>{
    if(route==='signout')
	{ this.setState(initialState);}
    else if(route==='home')
	{ this.setState({isSignedin:true});}
   this.setState({route:route});
}

render(){
  return (
    <div className="App" >
                 <Particles className="particle"
                params={particleOption} 
                />
    <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange}/>
  {(this.state.route === 'home')
  	? <div> 
  	    <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />   
	    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
	    <FaceRecognition  imageUrl={this.state.imageUrl}/>
	  </div>
    : (this.state.route === 'signin')
    ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
  }  
    </div>
  );
}
}
export default App;
