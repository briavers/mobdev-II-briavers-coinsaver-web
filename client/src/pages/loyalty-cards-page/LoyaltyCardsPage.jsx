import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import LoyaltyCardsList from '../../components/loyaltyCardList/LoyaltyCardList';
/*
Component styles
*/
import './LoyaltyCardsPage.css';

class LoyaltyCardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

          <div className="row">
            <div className="col-12">
              <LoyaltyCardsList />
            </div>
          </div>
        </div>
    
    )
  }
}

export default (LoyaltyCardPage);