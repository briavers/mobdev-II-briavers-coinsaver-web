import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

/*
Webcomponents UI
*/
import { Grid, GridCell } from 'rmwc/Grid';
import './App.css';

/*
Components
*/
import Header from './components/header/Header';
import Offcanvas from './components/offcanvas';

/*
Page components
*/
import HomePage from './pages/home-page/HomePage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import PostPage from './pages/post-page/PostPage';
import PostsPage from './pages/posts-page/PostsPage';

/*
State management via Redux
*/
import store from './store';

class App extends Component {
  constructor() {
    super();

    this.state = {
      persistentOpen: true
    }
  }
  render() {    
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Offcanvas />
            <Header />
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Redirect from="/home" to="/"/>
              <Route exact path='/posts' component={PostsPage}/>
              <Route path='/posts/:id' component={PostPage}/>
              <Route path="*" component={NotFoundPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
