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

/*
Material UI
*/
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../../utilities/ReduxFormToMaterialForm';

/*
Styles
*/
import './PostCreate.css';

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
    'synopsis'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}


class PostCreate extends Component {
  submit = (values) => {
    this.props.signIn(values, this.props.history);
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
              <Field name="title"
                      component="input"
                      type="text"
                      placeholder="Title" 
                      component={renderTextField}
                      fullWidth={true}
              />
            </div>
            <div className="col-12">
              <Field name="synopsis" 
                      component="input"
                      type="text"
                      placeholder="Synopsis"
                      component={renderTextField} 
                      fullWidth={true}
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
              />
            </div>
            <div className="col-12">
              <Field name="body" 
                      component="input"
                      type="text"
                      placeholder="Body"
                      component={renderTextField} 
                      fullWidth={true}
                      multiLine={true}
                      rows={8}
                      rowsMax={24}
              />
            </div>
            <div className="col-12">
              <RaisedButton type="submit" label="Add post" primary={true} fullWidth={true} />
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

PostCreate.propTypes = {
  /*authError: PropTypes.object,*/
};

const mapStateToProps = (state) => {
  return {
    /*postError: state.postCreate.error*/
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const reduxFormPostCreate = reduxForm({
  form: 'postCreate',
  validate
})(PostCreate);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormPostCreate);