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
    let firstName = 'Alien';
    let imageURL = '';
    if(this.state.user) {
      firstName = this.state.user.firstName;
      imageURL = this.state.user.thumbnail.reference;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={imageURL} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome { firstName }</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
