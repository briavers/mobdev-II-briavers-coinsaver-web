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
  id = undefined;

  constructor() {
    super();

    this.id = this.props.id;
    
    this.state = {
      post: null
    }
  }

  componentDidMount() {
    fetch(`api/v1/posts/${this.id}`)
      .then( response => response.json())
      .then( item => this.setState({ post: item }))
      .catch( error => console.log(error));
  }

  render() {
    if(this.state.post) {
      const post = this.state.post;
      return (
        <GridCell phone="12" tablet="4" desktop="4">
          <Card key={ post._id }>
            <CardPrimaryAction>
              <CardMedia sixteenByNine style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}}/>
              <div style={{padding: '0 1rem 1rem 1rem'}}>
                <Typography use="title" tag="h2">{ post.title }</Typography>
                <Typography
                  use="subheading1"
                  tag="h3"
                  theme="text-secondary-on-background"
                  style={{marginTop: '-1rem'}}
                >
                  by Kurt Wagner
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">{ post.synopsis }</Typography>
              </div>
            </CardPrimaryAction>
            <CardActions>
              <CardActionButtons>
                <CardAction>{ (post._category) ? post._category.name : 'Uncategorized' }</CardAction>
              </CardActionButtons>
            </CardActions>
          </Card>
        </GridCell>
      );
    } else {
      return (
        <GridCell span="12">
          <div>No post with id: { this.id }!</div>
        </GridCell>
      )
    }   
  }
}

export default PostDetail;