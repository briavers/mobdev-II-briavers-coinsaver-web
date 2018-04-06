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
Material UI
*/
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/*
Styles
*/
import './Offcanvas.css';

class Offcanvas extends Component {

  constructor(props) {
    super(props);
  }

  authLinks() {
    if (this.props.authenticated) {
      return [
        <MenuItem onClick={() => this.props.closeClick()} primaryText="Sign out" containerElement={Link} to="/signout" />
      ];
    }
    return [
      <MenuItem onClick={() => this.props.closeClick()} primaryText="Sign in" containerElement={Link} to="/signin" />,
      <MenuItem onClick={() => this.props.closeClick()} primaryText="Sign up" containerElement={Link} to="/signup" />
    ];
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={320}
        open={this.props.offcanvasOpened}
        onRequestChange={(open) => this.props.closeClick()}
      >
        <MenuItem onClick={() => this.props.closeClick()} containerElement={Link} to="/">Home</MenuItem>
        <MenuItem onClick={() => this.props.closeClick()} containerElement={Link} to="/posts">News</MenuItem>
        {this.authLinks()}
        <MenuItem onClick={() => this.props.closeClick()} containerElement={Link} to="*">404</MenuItem>
      </Drawer>
    )
  }
}

Offcanvas.propTypes = {
  offcanvasOpened: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeClick: () => dispatch(closeOffcanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offcanvas);