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

class PostsList extends Component {

  constructor() {
    super();
    
    this.state = {
      posts: null
    }
  }

  componentDidMount() {
    fetch('api/v1/posts')
      .then( response => response.json())
      .then( item => this.setState({ posts: item })); 
  }

  render() {
    if(this.state.posts) {
      return (
        <GridInner>
          {this.state.posts.map((element, i) => (
            <GridCell phone="12" tablet="4" desktop="4" key={i}>
              <Card key={ element._id }>
                <CardPrimaryAction>
                  <CardMedia sixteenByNine style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}}/>
                  <div style={{padding: '0 1rem 1rem 1rem'}}>
                    <Typography use="title" tag="h2">{ element.title }</Typography>
                    <Typography
                      use="subheading1"
                      tag="h3"
                      theme="text-secondary-on-background"
                      style={{marginTop: '-1rem'}}
                    >
                      by Kurt Wagner
                    </Typography>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">{ element.synopsis }</Typography>
                  </div>
                </CardPrimaryAction>
                <CardActions>
                  <CardActionButtons>
                    <CardAction>{ (element._category) ? element._category.name : 'Uncategorized' }</CardAction>
                  </CardActionButtons>
                </CardActions>
              </Card>
            </GridCell>
          ))}
        </GridInner>
      );
    } else {
      return (
        <GridCell span="12">
          <div>No posts!</div>
        </GridCell>
      )
    }   
  }
}

export default PostsList;