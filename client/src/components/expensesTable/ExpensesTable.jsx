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

class BillingAccountsTable extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      billingAccounts: null,
      billingAccountId: null,
      billingAccountAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (billingAccountId, billingAccountAction) => {
    let title = '';
    let message = '';

    switch(billingAccountAction) {
      case CATEGORYACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the billingAccount with id ${billingAccountId}?`;
        break;
      case CATEGORYACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the billingAccount with id ${billingAccountId}?`;
        break;
      case CATEGORYACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the billingAccount with id ${billingAccountId}?`;
        break;
    }

    this.setState({
      billingAccountId: billingAccountId,
      billingAccountAction: billingAccountAction,
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

    switch(this.state.billingAccountAction) {
      case CATEGORYACTIONSENUM.DELETE:
        url = `/api/v1/billingAccounts/${this.state.billingAccountId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case CATEGORYACTIONSENUM.SOFTDELETE:
        url = `/api/v1/billingAccounts/${this.state.billingAccountId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case CATEGORYACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/billingAccounts/${this.state.billingAccountId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.action && results.action == 'DELETE') {
          this.loadBillingAccounts();
        } else {
          const billingAccount = results;
          const i = this.state.billingAccounts.findIndex((obj, index, array) => {
            return obj._id === billingAccount._id;
          });
          const billingAccounts = this.state.billingAccounts;
          billingAccounts[i] = billingAccount;
  
          this.setState({
            billingAccounts: billingAccounts
          })
        }
        }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadBillingAccounts();
  }

  loadBillingAccounts = () => {
    fetch('/api/v1/billingAccounts')
      .then( response => response.json())
      .then( item => this.setState({ billingAccounts: item })); 
  }

  getBillingAccountsAsJSX() {
    let containerElement = '';
    console.log(this.state.billingAccounts)

    if(this.state.billingAccounts) {
      containerElement = this.state.billingAccounts.map( (billingAccount, index) => (
        <TableRow key={billingAccount._id}>
          <TableCell>{billingAccount.title}</TableCell>
          <TableCell>{billingAccount.description}</TableCell>
          <TableCell>{billingAccount.created_at}</TableCell>
          <TableCell>
            <IconButton
              component={Link} to={ '/backoffice/billingAccount-create?id=' + billingAccount._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(billingAccount._id, (billingAccount.deleted_at)?CATEGORYACTIONSENUM.SOFTUNDELETE:CATEGORYACTIONSENUM.SOFTDELETE)} style={{ opacity: ((billingAccount.deleted_at)?0.3:1) }}>
              <IconDelete/>
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(billingAccount._id, CATEGORYACTIONSENUM.DELETE)}>
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
          {this.getBillingAccountsAsJSX()}
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

BillingAccountsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillingAccountsTable);