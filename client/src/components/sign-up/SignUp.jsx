import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm } from 'redux-form';
import FacebookLogin from 'react-facebook-login';

/*
State management
*/
import { connect } from 'react-redux';
import { signUpActionLocalStrategy } from '../../actions/authActions';

/*
Material UI
*/
import Button from 'material-ui/Button';
import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
} from 'redux-form-material-ui'

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
    'email',
    'password',
    'confirmPassword'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
    //console.log('this was the error')
  }
  if (

    values.confirmPassword !== values.confirmPassword ) {
    errors.password = 'the passwords where not identical';
  }
  return errors;
}

class SignUp extends Component {

  submit = (values) => {
    if(values.password === values.confirmPassword){
      this.props.signUp(values, this.props.history);
      //console.log('there were errors')
    }else {
      alert('passwords do not match')
      //console.log('no errors found', values)
    }


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
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <form onSubmit={ handleSubmit(this.submit) } className="row">
            
            <div className="col-12">

              <label htmlFor="email">email</label>
              <Field name="email" 
                      component={TextField}
                      placeholder="Email"
                      fullWidth={true}
              />
            </div>
            
            <div className="col-12">
              <label htmlFor="password">password</label>
              <Field name="password" 
                      component={TextField}
                      type="password"
                      placeholder="Password"
                      fullWidth={true}
              />
            </div>
            
            <div className="col-12">
              <label htmlFor="confirmPassword">confirm password</label>
              <Field name="confirmPassword" 
                      component={TextField}
                      type="password"
                      placeholder="Confirm Password"
                      fullWidth={true}
              />
            </div>


            <div className="col-12">
              <Button type="submit" fullWidth={true}>
                Sign up
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

SignUp.propTypes = {
  authError: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch, errors) => {

  //console.log(errors, 'mapdispatcherrors')
  return {
    signUp: (values, history) => dispatch(signUpActionLocalStrategy(values, history) )
  };


};

const reduxFormSignUp = reduxForm({
  form: 'signUp',
  validate
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignUp);