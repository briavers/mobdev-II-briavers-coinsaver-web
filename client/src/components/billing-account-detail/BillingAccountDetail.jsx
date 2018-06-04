import React, { Component } from 'react';

/*
Material UI
*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';





import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';

import "./BillingAccountDetail.css";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: '270px' ,
    paddingTop: '56.25%', // 16:9
  },
};


const EXPENSEACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

class BillingAccountDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      billingAccount: undefined,
      expenses: null,
      expenseId: null,
      expenseAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (expenseId, expenseAction) => {
    let title = '';
    let message = '';

    switch(expenseAction) {
      case EXPENSEACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the expense with id ${expenseId}?`;
        break;
      case EXPENSEACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the expense with id ${expenseId}?`;
        break;
      case EXPENSEACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the expense with id ${expenseId}?`;
        break;
    }

    this.setState({
      expenseId: expenseId,
      expenseAction: expenseAction,
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

    switch(this.state.expenseAction) {
      case EXPENSEACTIONSENUM.DELETE:
        url = `/api/v1/expenses/${this.state.expenseId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case EXPENSEACTIONSENUM.SOFTDELETE:
        url = `/api/v1/expenses/${this.state.expenseId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case EXPENSEACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/expenses/${this.state.expenseId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
      }

      fetch(url, options)
        .then(res => res.json())
        .then(results => {
          if (results.action && results.action == 'DELETE') {
            this.loadexpenses();
          } else {
            const expense = results;
            const i = this.state.expenses.findIndex((obj, index, array) => {
              return obj._id === expense._id;
            });
            const expenses = this.state.expenses;
            expenses[i] = expense;

            this.setState({
              expenses: expenses
            })
          }
        }
        );

      this.handleDialogClose();
    }



  componentDidMount() {
    fetch(`/api/v1/billingAccounts/${this.props.billingAccountId}`)
      .then( response => response.json())
      .then( item => this.setState({ billingAccount: item })); 
    this.loadExpenses();
    }
  
  loadExpenses = () => {
    fetch(`/api/v1/billingAccounts/${this.props.billingAccountId}`)
      .then(response => response.json())
      .then(item => this.setState({ expenses: item.expenses })); 
  }



  getExpenseAsJSX() {
    let containerElement = '';
    //console.log(this.state.expenses)

    if (this.state.expenses) {
      containerElement = this.state.expenses.map((expense, index) => (
        <TableRow key={expense._id}>

          <TableCell>{expense.img}</TableCell>
          <TableCell>{expense.title}</TableCell>
          <TableCell>{expense.description}</TableCell>
          <TableCell>{expense.created_at}</TableCell>
          <TableCell>
            <IconButton
              component={Link} to={'/backoffice/expense-create?id=' + expense._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(expense._id, (expense.deleted_at) ? EXPENSEACTIONSENUM.SOFTUNDELETE : EXPENSEACTIONSENUM.SOFTDELETE)} style={{ opacity: ((expense.deleted_at) ? 0.3 : 1) }}>
              <IconDelete />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(expense._id, EXPENSEACTIONSENUM.DELETE)}>
              <IconDeleteForever />
            </IconButton>
          </TableCell>
        </TableRow>));
    }
    return containerElement;
  }

  render() {
    const { classes } = this.props;
    if(this.state.billingAccount) {
      //console.log(this.state.billingAccount)
      let element = this.state.billingAccount

      let prefix = "../"






      if(element.expenses.length == 0){  
          return (
      
        <div className="row">
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"> </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src={prefix + element._type.image} alt="picture of the card" className="cardImage" />
            </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <div className="cardInformation"> 
              <p> {element.title} <br /> € {element.savings} </p>
            </div>
          </div>
        </div>
          );
      }else{
        return (
          <div>
            
            <div className="row">
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">  </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <img src={prefix + element._type.image} alt="picture of the card" className="cardImage" />
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div className="cardInformation"> <p> {element.title} <br /> € {element.savings} </p></div>
              </div>

              

          
            
            </div>
            <div>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Synopsis</TableCell>
                    <TableCell numeric>Created</TableCell>
                    <TableCell numeric>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.getExpenseAsJSX()}
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
          </div>

          
        );
      }
      





    } else {
      return (
        <div>
          Loading
        </div>
      )
    }   
  }
}

BillingAccountDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillingAccountDetail);