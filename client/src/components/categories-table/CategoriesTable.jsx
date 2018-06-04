import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';

const CATEGORYACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

/*
Styles
*/
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
});

class CategoriesTable extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      categories: null,
      categoryId: null,
      categoryAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (categoryId, categoryAction) => {
    let title = '';
    let message = '';

    switch(categoryAction) {
      case CATEGORYACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the category with id ${categoryId}?`;
        break;
      case CATEGORYACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the category with id ${categoryId}?`;
        break;
      case CATEGORYACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the category with id ${categoryId}?`;
        break;
    }

    this.setState({
      categoryId: categoryId,
      categoryAction: categoryAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch(this.state.categoryAction) {
      case CATEGORYACTIONSENUM.DELETE:
        url = `/api/v1/categories/${this.state.categoryId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case CATEGORYACTIONSENUM.SOFTDELETE:
        url = `/api/v1/categories/${this.state.categoryId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case CATEGORYACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/categories/${this.state.categoryId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.action && results.action == 'DELETE') {
          this.loadCategories();
        } else {
          const category = results;
          const i = this.state.categories.findIndex((obj, index, array) => {
            return obj._id === category._id;
          });
          const categories = this.state.categories;
          categories[i] = category;
  
          this.setState({
            categories: categories
          })
        }
        }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    fetch('/api/v1/categories')
      .then( response => response.json())
      .then( item => this.setState({ categories: item })); 
  }

  getCategoriesAsJSX() {
    let containerElement = '';
    console.log(this.state.categories)

    if(this.state.categories) {
      containerElement = this.state.categories.map( (category, index) => (
        <TableRow key={category._id}>
          <TableCell>{category.title}</TableCell>
          <TableCell>{category.description}</TableCell>
          <TableCell>{category.created_at}</TableCell>
          <TableCell>
            <IconButton
              component={Link} to={ '/backoffice/category-create?id=' + category._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(category._id, (category.deleted_at)?CATEGORYACTIONSENUM.SOFTUNDELETE:CATEGORYACTIONSENUM.SOFTDELETE)} style={{ opacity: ((category.deleted_at)?0.3:1) }}>
              <IconDelete/>
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(category._id, CATEGORYACTIONSENUM.DELETE)}>
              <IconDeleteForever />
            </IconButton>
          </TableCell>
        </TableRow>));
    }
    return containerElement;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Synopsis</TableCell>
              <TableCell numeric>Created</TableCell>
              <TableCell numeric>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.getCategoriesAsJSX()}
          </TableBody>
        </Table>
        <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )  
  }
}

CategoriesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesTable);