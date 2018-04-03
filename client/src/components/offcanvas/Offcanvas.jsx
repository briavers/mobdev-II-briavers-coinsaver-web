import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';

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
          <Link to={{ pathname: '/home' }}>Home</Link>
          <Link to={{ pathname: '/posts' }}>Posts</Link>
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