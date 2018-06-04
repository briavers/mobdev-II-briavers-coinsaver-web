import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import BillingAccountDetail from '../../components/billing-account-detail/BillingAccountDetail';

/*
Component styles
*/
import './BillingAccountPage.css';

class BillingAccountPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="c-max">
              <BillingAccountDetail billingAccountId={ this.props.match.params.id }/>
        </div>

      </div>
    )
  }
}

export default (BillingAccountPage);