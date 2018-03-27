import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*
UI
*/
import * as Grapp from 'grommet/components/App';

/*
Components
*/
import PostsList from './components/posts-list/PostsList';

class App extends Component {
  render() {    
    return (
      <Grapp>
        <PostsList />
      </Grapp>
    );
  }
}

export default App;
