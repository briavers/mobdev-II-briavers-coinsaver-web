import React, { Component } from 'react';

import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import { GridInner, GridCell } from 'rmwc/Grid';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      post: undefined
    }
  }

  componentDidMount() {
    fetch(`/api/v1/posts/${this.props.postId}`)
      .then( response => response.json())
      .then( item => this.setState({ post: item })); 
  }

  render() {
    if(this.state.post) {
      return (
        <div>
          POST
        </div>
      );
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }   
  }
}

export default PostDetail;