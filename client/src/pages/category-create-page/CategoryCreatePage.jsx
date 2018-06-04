import React, { Component } from 'react';

/*
Libraries
*/
import queryString from 'query-string';

/*
Material UI
*/


/*
Components
*/
import CategoryForm from '../../components/categories-form/CategoryForm';

/*
Component styles
*/
import './CategoryCreatePage.css';

class CategoryCreatePage extends Component {
  constructor(props) {
    super(props);

    const parsed = queryString.parse(this.props.location.search);
    const id = parsed.id;

    this.state = {
      boSelectedCategoryId:  id
    }
  }

  render() {
    return (
      <div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <CategoryForm categoryId={ this.state.boSelectedCategoryId } />
            </div>
          </div>
        </div>

    )
  }
}

export default (CategoryCreatePage);