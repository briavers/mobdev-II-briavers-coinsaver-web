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
import { createSubCategory } from '../../actions/subCategoryActions';

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
import './SubCategoryForm.css';

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
    'description',
    'category'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}


class SubCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: undefined
    }
  }

  submit = (values) => {
    this.props.createSubCategory(values, this.props.history);
  }

  componentDidMount = () => {
    this.fetchSubCategoryCreateGet();
  }

  fetchSubCategoryCreateGet = () => {
    fetch('/api/v1/subCategories/vm/create', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(results =>
      this.setState( {
        categories: results.categories
      })
    );
  }

  fetchSubCategoryUpdateGet = () => {
    fetch('/api/v1/subCategory', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(subCategory =>
      this.setState( {
        categories: subCategory.categories
      })
    );
  }

  getCategoriesAsJSX = () => {
    let categoryElements = '';
    if (this.state.categories) {
      categoryElements = this.state.categories.map(
        (element) => {
          return (
            <MenuItem value={ element._id } key={ element._id }>{ element.title }</MenuItem>
          );
        }
      )
    };
    return categoryElements;
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
              <label>Name for the subCategory</label>
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
              <label>parent category</label>
              <Field className="ajaxField" name="category" component={Select} placeholder="Select a category" fullWidth={true}>
                { this.getCategoriesAsJSX() }
              </Field>
            </div>
            <div className="col-12">
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Add subCategory
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


SubCategoryForm.propTypes = {
  subCategoryCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    subCategoryCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSubCategory: (values, history) => dispatch(createSubCategory(values, history)),
  };
};

const reduxFormSubCategoryForm = reduxForm({
  form: 'subCategoryCreate',
  validate
})(SubCategoryForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSubCategoryForm);