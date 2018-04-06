import React, { Component } from 'react';

/*
Libraries
*/
import {Link} from 'react-router-dom';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';

/*
Material UI
*/
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';

/*
Component styles
*/
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
  }

  handleHamburgerClick(e) {
    e.preventDefault();
    this.props.hamburgerClick();
  }

  userLinks() {
    if (this.props.authenticated) {
      return [
        <MenuItem primaryText="Profile" containerElement={Link} to="/profile" key={1}/>,
        <MenuItem primaryText="Sign out" containerElement={Link} to="/signout" key={2} />
      ];
    }
    return [
      <MenuItem primaryText="Sign in" containerElement={Link} to="/signin" key={1} />,
      <MenuItem primaryText="Sign up" containerElement={Link} to="/signup" key={2} />
    ];
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FlatButton icon={<NavigationMenu />} primary={true} onClick={ this.handleHamburgerClick } />
          <ToolbarTitle text="Mobile Development 2" />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <ActionPermIdentity />
              </IconButton>
            }
          >
            { this.userLinks() }
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hamburgerClick: () => dispatch(toggleOffcanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);