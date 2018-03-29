import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';

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
import PostsList from './components/posts-list/PostsList';

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
        <div>
          <Offcanvas />
          <Header />
          <div className="c-max">
            <Grid>
              <GridCell span="12">
                <PostsList />
              </GridCell>
            </Grid>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
