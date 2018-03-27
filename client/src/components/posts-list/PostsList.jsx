import React, { Component } from 'react';

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
    let postsElement = '<p>No posts!</p>';
    if(this.state.posts) {
      postsElement = this.state.posts.map(
        (element) => {
          return (
            <article key={ element._id }>
              <h2>{ element.title }</h2>
            </article>
          );
        }
      )
    }
    return (
      <div>
        { postsElement }
      </div>
    );
  }
}

export default PostsList;