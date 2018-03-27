import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
Components
*/
import PostsList from './components/posts-list/PostsList';

class App extends Component {
  render() {    
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <p className="App-intro">
        </p>
        <PostsList />
      </div>
    );
  }
}

export default App;
