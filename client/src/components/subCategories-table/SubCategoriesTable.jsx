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

const SUBCATEGORYACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

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

class SubCategoriesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subCategories: null,
      subCategoryId: null,
      subCategoryAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (subCategoryId, subCategoryAction) => {
    let title = '';
    let message = '';

    switch (subCategoryAction) {
      case SUBCATEGORYACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the subCategory with id ${subCategoryId}?`;
        break;
      case SUBCATEGORYACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the subCategory with id ${subCategoryId}?`;
        break;
      case SUBCATEGORYACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the subCategory with id ${subCategoryId}?`;
        break;
    }

    this.setState({
      subCategoryId: subCategoryId,
      subCategoryAction: subCategoryAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch (this.state.subCategoryAction) {
      case SUBCATEGORYACTIONSENUM.DELETE:
        url = `/api/v1/subCategories/${this.state.subCategoryId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case SUBCATEGORYACTIONSENUM.SOFTDELETE:
        url = `/api/v1/subCategories/${this.state.subCategoryId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case SUBCATEGORYACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/subCategories/${this.state.subCategoryId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if (results.action && results.action == 'DELETE') {
          this.loadSubCategories();
        } else {
          const subCategory = results;
          const i = this.state.subCategories.findIndex((obj, index, array) => {
            return obj._id === subCategory._id;
          });
          const subCategories = this.state.subCategories;
          subCategories[i] = subCategory;

          this.setState({
            subCategories: subCategories
          })
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadSubCategories();
  }

  loadSubCategories = () => {
    fetch('/api/v1/subCategories')
      .then(response => response.json())
      .then(item => this.setState({ subCategories: item }));
  }

  getSubCategoriesAsJSX() {
    let containerElement = '';
    if (this.state.subCategories) {
      containerElement = this.state.subCategories.map((subCategory, index) => (
        <TableRow key={subCategory._id} id='thead'>
          <TableCell>{subCategory.title}</TableCell>
          <TableCell>{subCategory._category.title}</TableCell>
          <TableCell>{subCategory.description}</TableCell>
          <TableCell>{subCategory.created_at}</TableCell>
          <TableCell>
            <IconButton
              component={Link} to={'/backoffice/subCategory-create?id=' + subCategory._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(subCategory._id, (subCategory.deleted_at) ? SUBCATEGORYACTIONSENUM.SOFTUNDELETE : SUBCATEGORYACTIONSENUM.SOFTDELETE)} style={{ opacity: ((subCategory.deleted_at) ? 0.3 : 1) }}>
              <IconDelete />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(subCategory._id, SUBCATEGORYACTIONSENUM.DELETE)}>
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
        <Table className = "thead" >
          <TableHead>
            <TableRow>
              <TableCell>Subcategory</TableCell>
              <TableCell>Main category</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getSubCategoriesAsJSX()}
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

SubCategoriesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (SubCategoriesTable);