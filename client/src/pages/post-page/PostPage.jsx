import React, { Component } from 'react';

/*
Webcomponents UI
*/
import { Grid, GridCell } from 'rmwc/Grid';

/*
Components
*/
import PostDetail from '../../components/post-detail/PostDetail';

/*
Component styles
*/
import './PostPage.css';

class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="c-max">
          <Grid>
            <GridCell span="12">
              <PostDetail postId={ this.props.match.params.id }/>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

export default (PostPage);