import React, { PureComponent } from 'react';

class LoginPage extends PureComponent {
  state = {};
  handleSubmit = value => {};
  render() {
    return (
      <div>
        <h1>This is going to be a login page</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default LoginPage;
