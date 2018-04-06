import React, { Component } from 'react';

/*
Material UI
*/
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class PostsList extends Component {

  constructor() {
    super();
    
    this.state = {
      posts: null
    }
  }

  componentDidMount() {
    fetch('/api/v1/posts')
      .then( response => response.json())
      .then( item => this.setState({ posts: item })); 
  }

  render() {
    if(this.state.posts) {
      return (
        <div className="row">
          {this.state.posts.map((element, i) => (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
              <Card key={ element._id }>
                <CardMedia>
                  <img src="https://material-components-web.appspot.com/images/16-9.jpg" alt="" />
                </CardMedia>
                <CardTitle title={ element.title }/>
                <CardText>
                  { element.synopsis }
                </CardText>
                <CardActions>
                  <FlatButton label={ (element._category) ? element._category.name : 'Uncategorized' } />
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>

        </div>
      )
    }   
  }
}

export default PostsList;