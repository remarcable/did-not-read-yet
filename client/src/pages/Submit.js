import React, { PureComponent } from 'react';

class Submit extends PureComponent {
  state = {};
  handleSubmit = value => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <h1>This is going to be a submit page</h1>
      </div>
    );
  }
}
export default Submit;
