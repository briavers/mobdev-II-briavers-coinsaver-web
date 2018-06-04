import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import BillingAccountsList from '../../components/billingAccountsList/BillingAccountsList';
/*
Component styles
*/
import './BillingAccountsPage.css';

class BillingAccountPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      
          <div className="row">
            <div className="col-12">
              <BillingAccountsList />
            </div>
          </div>
        </div>

    )
  }
}

export default (BillingAccountPage);