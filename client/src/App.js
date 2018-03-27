import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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

/*
Components
*/
import PostsList from './components/posts-list/PostsList';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      tempOpen: true
    }
  }
  render() {    
    return (
      <div>
        <Drawer
          temporary
          open={this.state.tempOpen}
          onClose={() => this.setState({tempOpen: false})}
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
        <PostsList />
      </div>
    );
  }
}

export default App;
