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
import { createCategory } from '../../actions/categoryActions';

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
import './CategoryForm.css';

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
    'description'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}


class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      types: undefined
    }
  }

  submit = (values) => {
    this.props.createCategory(values, this.props.history);
  }

  fetchCategoryUpdateGet = () => {
    fetch('/api/v1/category', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    
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
              <label>Name for the category</label>
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
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Add Category
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


CategoryForm.propTypes = {
  categoryCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    categoryCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (values, history) => dispatch(createCategory(values, history)),
  };
};

const reduxFormCategoryForm = reduxForm({
  form: 'categoryCreate',
  validate
})(CategoryForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormCategoryForm);