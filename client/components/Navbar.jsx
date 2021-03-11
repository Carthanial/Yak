import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ls from '../utils/localStorage';

const storage = ls(window.localStorage);

const mapStateToProps = (state) => ({
  user: state.scratch.user,
});

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    e.persist();
    storage.remove('alias');
    window.location.pathname = e.target.pathname;
  }

  render() {
    const { user } = this.props;
    console.log(user);

    return (
      <div className="Navbar">
        {user ? (
          <a href="/auth/logout" onClick={this.onLogout}>
            Logout
          </a>
        ) : (
          <Link to="/">Log in</Link>
        )}
        {user ? <p>Welcome back, {user.username}</p> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
