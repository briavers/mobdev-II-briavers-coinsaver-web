import React, { Component } from 'react';
import logo from './logo.svg';


/*
UI
*/
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';
import { Grid, GridCell } from 'rmwc/Grid';
import './App.css';

/*
Components
*/
import Header from './components/header/Header';
import PostsList from './components/posts-list/PostsList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      persistentOpen: true
    }
  }
  render() {    
    return (
      <div>
        <Drawer
          temporary
          open={this.state.persistentOpen}
          onClose={() => this.setState({persistentOpen: false})}
        >
          <DrawerHeader>
            DrawerHeader
          </DrawerHeader>
          <DrawerContent>
            <ListItem>
              <ListItemText>Cookies</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Pizza</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Icecream</ListItemText>
            </ListItem>
          </DrawerContent>
        </Drawer>
        <Header />
        <Button
          onClick={() => this.setState({persistentOpen: this.state.persistentOpen === undefined ? false : !this.state.persistentOpen})}
          raised
        >
          Toggle Drawer
        </Button>
        <div className="c-max">
          <Grid>
            <GridCell span="12">
              <PostsList />
            </GridCell>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
