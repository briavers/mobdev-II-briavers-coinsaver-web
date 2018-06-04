import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm, formValueSelector  } from 'redux-form';

/*
State management
*/
import { connect } from 'react-redux';
import { createLoyaltyCard } from '../../actions/loyaltyCardActions';

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
import './LoyaltyCardForm.css';

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
    'storeImg',
    'code',
    
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

class LoyaltyCardForm extends Component {
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
    this.props.createLoyaltyCard(values, this.props.history);
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
              <label>code for the card</label>
              <Field name="code"
                component={TextField}
                placeholder="000100020003" 
                fullWidth={true}
              />
            </div>
            
            
            <div className="col-12">
              <label className='ajaxLabel'>Type of the card</label>
              <Field className="ajaxField ajaxFieldSelectStore" id= 'ajaxFieldSelectStore' name="storeImg" component={Select} placeholder="Select a type" fullWidth={true}>
                <MenuItem value="./ah_logo.jpg" key="./ah_logo">Albert Hein</MenuItem>
                <MenuItem value="./ava_logo.jpg" key="./ava_logo">AVA</MenuItem>
                <MenuItem value="./aveve_logo.jpg" key="./aveve_logo">AVEVE</MenuItem>
                <MenuItem value="./carrefour_logo.jpg" key="./carrefour_logo">Carrefour</MenuItem>
                <MenuItem value="./delhaize_logo.jpg" key="./delhaize_logo">Delhaize</MenuItem>
                <MenuItem value="./game_mania_logo.jpg" key="./game_mania_logo">Game Mania</MenuItem>
                <MenuItem value="./kruidvat_logo.jpg" key="./kruidvat_logo">Kruidvat</MenuItem>
                <MenuItem value="./zeb_logo.jpg" key="./zeb_logo">ZEB</MenuItem>
               {/*  <option></option>
                <option value="./ah_logo">Albert Hein</option>
                <option value="./ava_logo">AVA</option>
                <option value="./aveve_logo">AVEVE</option>
                <option value="./carrefour_logo">Carrefour</option>
                <option value="./delhaize_logo">Delheize</option>
                <option value="./game_mania_logo">Game Mania</option>
                <option value="./kruidvat_logo">kruitvat</option>
                <option value="./zeb_logo">ZEB</option> */}
              </Field>
            </div>
            <div className="col-12">
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Add loyaltyCard
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


LoyaltyCardForm.propTypes = {
  loyaltyCardCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loyaltyCardCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLoyaltyCard: (values, history) => dispatch(createLoyaltyCard(values, history)),
  };
};

const reduxFormLoyaltyCardForm = reduxForm({
  form: 'loyaltyCardCreate',
  validate
})(LoyaltyCardForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormLoyaltyCardForm);