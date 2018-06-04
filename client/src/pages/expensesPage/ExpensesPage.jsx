import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import ExpensesList from '../../components/expensesList/ExpensesList';
/*
Component styles
*/
import './ExpensesPage.css';

class ExpensePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
     
          <div className="row">
            <div className="col-12">
              <ExpensesList />
            </div>
          </div>
        </div>
 
    )
  }
}

export default (ExpensePage);