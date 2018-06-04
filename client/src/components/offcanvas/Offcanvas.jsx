import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

/*
State management
*/
import { connect } from 'react-redux';
import { closeOffcanvas } from '../../actions/offcanvasActions';

/*
Material UI
*/
import Drawer from 'material-ui/Drawer';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import IconBugReport from '@material-ui/icons/BugReport';
import IconDescription from '@material-ui/icons/Description';
import IconGrade from '@material-ui/icons/Grade';
import IconList from '@material-ui/icons/List';
import IconModeEdit from '@material-ui/icons/ModeEdit';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';

/*
Styles
*/
const drawerWidth = 320;
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
let admin = false;

if (auth === null) {
  window.href = './home'
} else if ( auth.user === null ) {

} else if (auth.user === undefined) {
 admin = auth.isAdmin;
}else {
  admin = auth.user.isAdmin;
}



class Offcanvas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      backofficeLists: {
        postsOpen: false
      }
    };
  }

  toggleBackofficeLists = (list) => {
    this.setState(prevState => {
      const backofficeListsUpdate = prevState.backofficeLists;
      backofficeListsUpdate[list] = !backofficeListsUpdate[list];
      return {
        backofficeLists: backofficeListsUpdate
      }
    });
  }

  authLinks() {
    if (this.props.authenticated) {
      //console.log(this.props)
      return [
        <List key="0" component="nav">

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>


          <Divider />

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/billingAccounts">
            <ListItemText primary="Billing Accounts" />
          </ListItem>

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/billingAccount-create">
            <ListItemText primary="Create a billing account" />
          </ListItem>

          <Divider />

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/expenses">
            <ListItemText primary="Expenses" />
          </ListItem>

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/expense-create">
            <ListItemText primary="Create an expense" />
          </ListItem>

          <Divider />

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/loyaltyCards">
            <ListItemText primary="loyalty Cards" />
          </ListItem>
          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/loyaltyCard-create">
            <ListItemText primary="Create a loyalty card" />
          </ListItem>

          <Divider />

          <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/signout">
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>,
      ];
    }
    return [
      <List key="0" component="nav">
        <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/signin">
          <ListItemText primary="Sign in" />
        </ListItem>
        <ListItem button onClick={() => this.props.closeClick()} component={Link} to="/signup">
          <ListItemText primary="Sign up" />
        </ListItem>
      </List>,
    ];
  }

  backofficeLinks() {
    if (admin) {
      return [
        <List
          key={0}
          subheader={<ListSubheader component="div">Backoffice</ListSubheader>}
          component="nav"
        >




         
          <ListItem
            button
            onClick={() => this.toggleBackofficeLists('categoriesOpen')}
          >
            <ListItemIcon>
              <IconDescription />
            </ListItemIcon>
            <ListItemText inset primary="Categories" />
            {this.state.backofficeLists.categoriesOpen ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={this.state.backofficeLists.categoriesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                key={"1"}
                button
                onClick={() => this.props.closeClick()}
                component={Link}
                to="/backoffice/categories-table"
              >
                <ListItemIcon>
                  <IconList />
                </ListItemIcon>
                <ListItemText inset primary="All categories" />
              </ListItem>
              <ListItem
                key={"2"}
                button
                onClick={() => this.props.closeClick()}
                component={Link}
                to="/backoffice/category-create"
              >
                <ListItemIcon>
                  <IconModeEdit />
                </ListItemIcon>
                <ListItemText inset primary="Create category" />
              </ListItem>
            </List>
          </Collapse>





          <ListItem
            button
            onClick={() => this.toggleBackofficeLists('subCategoriesOpen')}
          >
            <ListItemIcon>
              <IconDescription />
            </ListItemIcon>
            <ListItemText inset primary="SubCategories" />
            {this.state.backofficeLists.subCategoriesOpen ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={this.state.backofficeLists.subCategoriesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                key={"1"}
                button
                onClick={() => this.props.closeClick()}
                component={Link}
                to="/backoffice/sub-categories-table"
              >
                <ListItemIcon>
                  <IconList />
                </ListItemIcon>
                <ListItemText inset primary="All subCategories" />
              </ListItem>
              <ListItem
                key={"2"}
                button
                onClick={() => this.props.closeClick()}
                component={Link}
                to="/backoffice/sub-category-create"
              >
                <ListItemIcon>
                  <IconModeEdit />
                </ListItemIcon>
                <ListItemText inset primary="Create subCategory" />
              </ListItem>
            </List>
          </Collapse>






          <ListItem
            button
            onClick={() => this.props.closeClick()}
            component={Link}
            to="/404"
          >
            <ListItemIcon>
              <IconBugReport />
            </ListItemIcon>
            <ListItemText inset primary="404" />
          </ListItem>
        </List>,
      ];
    }


    return [];
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        anchor="left"
        open= "true"
        variant= "permanent"
        onClose={(open) => this.props.closeClick()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {this.authLinks()}
        {this.backofficeLinks()}
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

const OffcanvasWithStyles = withStyles(styles, { withTheme: true })(Offcanvas);
export default connect(mapStateToProps, mapDispatchToProps)(OffcanvasWithStyles);