import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm } from 'redux-form';

/*
State management
*/
import { connect } from 'react-redux';
import { createExpense } from '../../actions/expenseActions';

/*
Material UI
*/
import { MenuItem, MenuList } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import { FormControlLabel } from 'material-ui/Form'
import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
  Label,
} from 'redux-form-material-ui'

/*
Styles
*/
import './ExpenseForm.css';

/*
Configuration
*/
import config from '../../config';
import { FileFileUpload, FileAttachment } from 'material-ui';

/*
Validation
*/


const validate = values => {
  const errors = {}
  const requiredFields = [
    'title',
    'description',
    'amount',
    'billingAccount',
    'subCategory'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}

let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      billingAccounts: undefined,
      subCategories: undefined,
      uploadImage: undefined
    }
    
  }

  submit = (values) => {

    console.log('this was the submit ', values)
    if(auth == null){
      auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
    } 
    values.user = auth.user.id
    this.props.createExpense(values, this.props.history);
  }

  componentDidMount = () => {
    this.fetchExpenseCreateGet();
  }

  fetchExpenseCreateGet = () => {
    fetch('/api/v1/expenses/vm/create', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(results =>
      this.setState( {
        billingAccounts: results.billingAccounts,
        subCategories: results.subCategories
      })

    );

  }

  fetchExpenseUpdateGet = () => {
    fetch('/api/v1/expense', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(expense =>
      this.setState( {
        billingAccounts: expense.billingAccounts,
        subCategories: expense.subCategories
      })
    );
  }

  getBillingAccountsAsJSX = () => {
    let typeElements = '';
    if (this.state.billingAccounts) {
      typeElements = this.state.billingAccounts.map(
        (element) => {
          if (element.user === auth.user.id ) {
            return (
              <MenuItem value={element._id} key={element._id}>{element.title}</MenuItem>
            );
          }

        }
      )
    };
    return typeElements;
  }
  getSubCategoriesAsJSX = () => {
    let typeElements = '';
    if (this.state.subCategories) {
      typeElements = this.state.subCategories.map(
        (element) => {
          return (
            <MenuItem value={ element._id } key={ element._id }>{ element.title }</MenuItem>
          );
        }
      )
    };
    return typeElements;
  }

  errorMessage() {
    if (this.props.error) {
      return (
        <div className="info-red">
          {this.props.error.message}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">

        <div className="col-12">
          <form onSubmit={handleSubmit(this.submit)} className="row" encType="multipart/form-data">
            
            <div className="col-12">
              <label>Title</label>
              <Field name="title"
                component={TextField}
                placeholder="Title" 
                fullWidth={true}
              />
            </div>

            <div className="col-12">
              <label>Description</label>
              <Field name="description"
                component={TextField}
                type="text"
                placeholder="Description"
                fullWidth={true}
                multiline={true}
                rows={8}
                rowsMax={24}
              />
            </div>

            <div className="col-12">
              <label>amount</label>
              <Field name="amount" 
                      component={TextField}
                      placeholder="0"
                      fullWidth={true}

              />
            </div>
            
            <div className="col-12">
              <label>Billing Account</label>
              <Field className="ajaxField" name="billingAccount" component={Select} placeholder="Select a billing Account" fullWidth={true}>
                { this.getBillingAccountsAsJSX() }
              </Field>
            </div>
            
            <div className="col-12">
              <label>sub Category</label>
              <Field className="ajaxField" name="subCategory" component={Select} placeholder="Select a subcategory" fullWidth={true}>
                { this.getSubCategoriesAsJSX() }
              </Field>
            </div>
            

            <div className="col-12">
              <input type="file" name="uploadImage" id="file"/>
            </div>







            <div className="col-12">
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Add expense
              </Button>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              {this.errorMessage()}
            </div>
          </div>
        </div>
      </div>
    );     
  }

}


ExpenseForm.propTypes = {
  expenseCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    expenseCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    createExpense: (values, history) => dispatch(createExpense(values, history)),
  };
};

const reduxFormExpenseForm = reduxForm({
  form: 'expenseCreate',
  validate
})(ExpenseForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormExpenseForm);