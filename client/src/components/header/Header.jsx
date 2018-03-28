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
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"/>
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

export default Header;