import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    }
  }
  componentDidMount() {
    fetch('api/v1/users')
      .then( response => response .json())
      .then( item => this.setState({ user: item }));      
  }
  render() {
    let name = 'Alien';
    if(this.state.user) {
      name = this.state.user.data.name;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome { name }</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
