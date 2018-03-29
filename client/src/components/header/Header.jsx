import React, { Component } from 'react';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';

/*
UI
*/
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

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

  render() {
    return (
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu" onClick={ this.handleHamburgerClick }/>
            <ToolbarTitle>New Media Development</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <ToolbarIcon use="star"/>
            <ToolbarIcon use="print"/>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hamburgerClick: () => dispatch(toggleOffcanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);