import * as types from '../constants/actionTypes';

const initialState = {
  posts: [],
  activeThreadID: undefined,
  alias: '',
  newPostBody: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS: {
      return { ...state, posts: action.payload };
    }
    case types.UPDATE_BODY: {
      return { ...state, newPostBody: action.payload };
    }
    case types.SAVE_POST: {
      const newPostList = [action.payload, ...state.posts];
      return { ...state, posts: newPostList, newPostBody: '' };
    }
    case types.UPDATE_ACTIVE_THREAD_ID: {
      return { ...state, activeThreadID: action.payload };
    }
    case types.ASSIGN_ALIAS: {
      return { ...state, alias: action.payload };
    }
    // action.payload contains the returned updated post from backend with new karma value
    // we create a copy of the posts in state and look for the specific post that was updated
    // and return a copy of the post object with the updated karma
    case types.UPDATE_POST_KARMA: {
      const newPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            karma: action.payload.karma,
          };
        }
        return post;
      });
      return { ...state, posts: newPosts };
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
