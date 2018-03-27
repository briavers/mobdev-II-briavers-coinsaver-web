import React, { Component } from 'react';

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
import './Header.css';

class Header extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"/>
            <ToolbarTitle>Toolbar</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <ToolbarIcon use="save"/>
            <ToolbarIcon use="print"/>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }
}

export default Header;