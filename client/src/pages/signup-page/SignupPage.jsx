import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import SignUp from "../../components/sign-up/SignUp";
/*
Component styles
*/
import './SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
            <SignUp />
          </div>
        </div>
      </div>
    )
  }
}

export default (SignupPage);