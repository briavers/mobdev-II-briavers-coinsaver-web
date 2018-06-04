import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import CategoryTable from '../../components/categories-table/CategoriesTable';

/*
Component styles
*/
import './CategoriesTablePage.css';

class CategoryTablePage extends Component {
  render() {
    return (
      <div>
     
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
              <CategoryTable />
            </div>
          </div>
        </div>

    )
  }
}

export default (CategoryTablePage);