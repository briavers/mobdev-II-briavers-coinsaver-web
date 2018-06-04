
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// /*
// Material UI
// */
// import { withStyles } from 'material-ui/styles';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';

// /*
// Styles
// */
// const styles = {
//   card: {
//   },
//   media: {
//     height: 200,
//   },
// };

// class ExpensesList extends Component {

//   constructor(props) {
//     super(props);
    
//     this.state = {
//       expenses: []
//     }
//   }

//   componentDidMount() {
//     fetch('/api/v1/expenses')
//       .then( response => response.json())
//       .then( item => this.setState({ expenses: item })); 
//   }

//   render() {
//     const { classes } = this.props;
//     //console.log(this.state.expenses, "this are the expenses")
//     if (this.state.expenses.length !== 0) {
//       //console.log(this.state.expenses, "this are the expenses")
//       return (
//         <div className="row">
//           {this.state.expenses.map((element, i) => (
//             <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
//               <Card className={classes.card} key={ element._id }>
//                 <CardMedia
//                   className={classes.media}
//                   image="https://material-components-web.appspot.com/images/16-9.jpg"
//                   title="Contemplative Reptile"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="headline" component="h2">
//                     { element.title }
//                   </Typography>
//                   <Typography component="p">
//                     € { element.amount }
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary">
//                     { (element._billingAccount) ? element._billingAccount.title : 'Uncategorized' }
                  
//                   </Button>
//                 </CardActions>
//               </Card>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       return (
//         <div className='sorryDiv'>
//           <h2>sorry but you don't have any expenses yet, </h2>
//           <h3> <a href="/expense-create"> go make them at create expense </a>  </h3>
//         </div>
//       )
//     }   
//   }
// }

// ExpensesList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ExpensesList);

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

/*
Component styles
*/
import './ExpensesList.css';

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

let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
let admin = false;
let logginInUser = undefined;

if (auth === null) {
  window.href = './home'
} else if (auth.user === null) {

} else if (auth.user === undefined) {
  admin = auth.isAdmin;
  logginInUser = auth.id
} else {
  admin = auth.user.isAdmin;
  logginInUser = auth.user.id;
}

class ExpensesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      tempExpenses: [],
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

    switch (expenseAction) {
      case SUBCATEGORYACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message = `Do you wish permenantly delete the expense with id ${expenseId}?`;
        break;
      case SUBCATEGORYACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message = `Do you wish to soft-delete the expense with id ${expenseId}?`;
        break;
      case SUBCATEGORYACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message = `Do you wish to soft-undelete the expense with id ${expenseId}?`;
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
    this.setState({ dialogOpen: false });
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch (this.state.expenseAction) {
      case SUBCATEGORYACTIONSENUM.DELETE:
        url = `/api/v1/expenses/${this.state.expenseId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case SUBCATEGORYACTIONSENUM.SOFTDELETE:
        url = `/api/v1/expenses/${this.state.expenseId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case SUBCATEGORYACTIONSENUM.SOFTUNDELETE:
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
          this.loadTempExpenses();
        } else {
          const tempExpense = results;
          const i = this.state.tempExpenses.findIndex((obj, index, array) => {
            return obj._id === tempExpense._id;
          });
          const tempExpenses = this.state.tempExpenses;
          tempExpenses[i] = tempExpense;

          this.setState({
            tempExpenses: tempExpenses
          })
        }
      }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadTempExpenses();
  }

  loadTempExpenses = () => {
    fetch('/api/v1/expenses')
      .then(response => response.json())
      .then(item => this.setState({ tempExpenses: item }));
  }

  getExpensesAsJSX() {
    let containerElement = '';
    //console.log(this.state.expenses);

    let logginInUser = logginInUser
    //console.log("tempExpenses", this.state.tempExpenses)
    if (this.state.tempExpenses.length !== 0) {


      this.state.tempExpenses.forEach(element => {
        //console.log(element);
        if (element.user === logginInUser) {
          this.state.expenses.push(element);
        }
        //console.log(this.state.expenses)
      });
    }




    if (this.state.expenses) {
      containerElement = this.state.expenses.map((expense, index) => (
       
          
          <TableRow key={expense._id} id='thead'>
            <TableCell><img src={expense.expenseImage} alt="" className="imageTable"/></TableCell>
            <TableCell>{expense.title}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>{expense.created_at}</TableCell>
            <TableCell>
              <IconButton
                component={Link} to={'/backoffice/expense-create?id=' + expense._id}>
                <IconCreate />
              </IconButton>
              <IconButton
                onClick={() => this.handleDialogOpen(expense._id, (expense.deleted_at) ? SUBCATEGORYACTIONSENUM.SOFTUNDELETE : SUBCATEGORYACTIONSENUM.SOFTDELETE)} style={{ opacity: ((expense.deleted_at) ? 0.3 : 1) }}>
                <IconDelete />
              </IconButton>
              <IconButton
                onClick={() => this.handleDialogOpen(expense._id, SUBCATEGORYACTIONSENUM.DELETE)}>
                <IconDeleteForever />
              </IconButton>
            </TableCell>
          </TableRow>
      
        ));
    }
    return containerElement;
  }

  render() {
   // const { classes } = this.props;

    return (
      <div>
        <Table className="thead" >
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getExpensesAsJSX()}
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

ExpensesList.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default (ExpensesList);