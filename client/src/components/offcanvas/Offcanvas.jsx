import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
State management
*/
import { connect } from 'react-redux';
import { closeOffcanvas } from '../../actions/offcanvasActions';

/*
Webcomponents UI
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

import { Button, ButtonIcon } from 'rmwc/Button';

/*
Styles
*/
import './Offcanvas.css';

class Offcanvas extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer
        temporary
        open={this.props.offcanvasOpened}
        onClose={() => this.props.closeClick()}
      >
        <DrawerHeader>
          <ButtonIcon use="close" onClick={() => this.props.closeClick()} />
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
    )
  }
}

Offcanvas.propTypes = {
  offcanvasOpened: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeClick: () => dispatch(closeOffcanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offcanvas);