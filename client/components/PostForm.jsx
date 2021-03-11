import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateBody, savePost } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    newPostBody: state.posts.newPostBody,
    user: state.scratch.user,
    alias: state.posts.alias,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBody: (value) => dispatch(updateBody(value)),
    handleSubmit: (e, alias, body, id) => {
      e.preventDefault();
      if (!alias || !body) return;
      dispatch(savePost(alias, body, id));
    },
  };
};

class PostForm extends Component {
  render() {
    return (
      <center className="PostForm">
        <form
          onSubmit={(e) =>
            this.props.handleSubmit(
              e,
              this.props.alias,
              this.props.newPostBody,
              this.props.user.id
            )
          }
        >
          <h2>{this.props.alias}</h2>
          <br />
          <textarea
            value= {this.props.newPostBody}
            placeholder="Add a body"
            onChange={(e) => this.props.updateBody(e.target.value)}
          />
          <br />
          <button type="submit">Add Post</button>
        </form>
      </center>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
