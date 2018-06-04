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
import SubCategoryTable from '../../components/subCategories-table/SubCategoriesTable';

/*
Component styles
*/
import './SubCategoriesTablePage.css';

class SubCategoryTablePage extends Component {
  render() {
    return (
      <div>
 
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12  col-lg-12  col-xl-12 ">
              <SubCategoryTable />
            </div>
          </div>
        </div>

    )
  }
}

export default (SubCategoryTablePage);