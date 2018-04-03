import React, { Component } from 'react';

/*
Webcomponents UI
*/
import { Grid, GridCell } from 'rmwc/Grid';

/*
Components
*/
import PostsList from '../../components/posts-list/PostsList';

/*
Component styles
*/
import './PostsPage.css';

class PostsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="c-max">
          <Grid>
            <GridCell span="12">
              <PostsList />
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

export default (PostsPage);