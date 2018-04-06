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
import PostCreate from '../../components/post-create/PostCreate';

/*
Component styles
*/
import './PostCreatePage.css';

class PostCreatePage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <PostCreate />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (PostCreatePage);