import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
Material UI
*/
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class PostsTable extends Component {

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

  getPostsAsJSX() {
    let containerElement = '';
    if(this.state.posts) {
      containerElement = this.state.posts.map( (post, index) => (
        <TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{post.title}</TableRowColumn>
          <TableRowColumn>{post.synopsis}</TableRowColumn>
          <TableRowColumn>
            <Link to={ '/backoffice/post-create?id=' + post._id}>{post._id}</Link>
          </TableRowColumn>
        </TableRow>
        ));
    }
    return containerElement;
  }

  render() {
    return (
      <Table
        height={400}
        fixedHeader={true}
        fixedFooter={true}
        selectable={true}
        multiSelectable={true}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
          enableSelectAll={true}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
              Super Header
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            <TableHeaderColumn tooltip="The Status">Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={true}
          deselectOnClickaway={true}
          showRowHover={true}
          stripedRows={true}
        >
          { this.getPostsAsJSX() }
        </TableBody>
        <TableFooter
          adjustForCheckbox={true}
        >
          <TableRow>
            <TableRowColumn>ID</TableRowColumn>
            <TableRowColumn>Name</TableRowColumn>
            <TableRowColumn>Status</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
              Super Footer
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    )  
  }
}

export default PostsTable;