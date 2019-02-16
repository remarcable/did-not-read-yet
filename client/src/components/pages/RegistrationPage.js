import React, { PureComponent } from 'react';

class RegistrationPage extends PureComponent {
  state = {};
  handleSubmit = value => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <h1>This is going to be a registration page</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default RegistrationPage;
