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
import { createBillingAccount } from '../../actions/billingAccountActions';

/*
Material UI
*/
import { MenuItem, MenuList } from 'material-ui/Menu';
import Button from 'material-ui/Button';
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
import './BillingAccountForm.css';

/*
Configuration
*/
import config from '../../config';

/*
Validation
*/
const validate = values => {
  const errors = {}
  const requiredFields = [
    'title',
    'savings',
    'type'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}
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

class BillingAccountForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      types: undefined,
      user: logginInUser
    }
  }

  submit = (values) => {
    //console.log(values)
    values.user = logginInUser
    this.props.createBillingAccount(values, this.props.history);
  }

  componentDidMount = () => {
    this.fetchBillingAccountCreateGet();
  }

  fetchBillingAccountCreateGet = () => {
    fetch('/api/v1/billingAccounts/vm/create', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(results =>
      this.setState( {
        types: results.types
      })
    );
  }

  fetchBillingAccountUpdateGet = () => {
    fetch('/api/v1/billingAccount', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(billingAccount =>
      this.setState( {
        types: billingAccount.types
      })
    );
  }

  getTypesAsJSX = () => {
    let typeElements = '';
    if(this.state.types) {
      typeElements = this.state.types.map(
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
          <form onSubmit={ handleSubmit(this.submit) } className="row">
            
            <div className="col-12">
              <label>Name for the card</label>
              <Field name="title"
                component={TextField}
                placeholder="Title" 
                fullWidth={true}
              />
            </div>
            <div className="col-12">
              <label>Initial Savings</label>
              <Field name="savings" 
                      component={TextField}
                      placeholder="0"
                      fullWidth={true}

              />
            </div>
            
            <div className="col-12">
              <label className='ajaxLabel'>Type of the card</label>
              <Field className="ajaxField ajaxFieldTypeOfCard" id="ajaxFieldTypeOfCard" name="type" component={Select} placeholder="Select a type" fullWidth={true} >
                { this.getTypesAsJSX() }
              </Field>
            </div>
            <div className="col-12">
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Add billingAccount
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


BillingAccountForm.propTypes = {
  billingAccountCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    billingAccountCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBillingAccount: (values, history) => dispatch(createBillingAccount(values, history)),
  };
};

const reduxFormBillingAccountForm = reduxForm({
  form: 'billingAccountCreate',
  validate
})(BillingAccountForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormBillingAccountForm);