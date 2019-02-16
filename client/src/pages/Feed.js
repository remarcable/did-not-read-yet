import React, { PureComponent } from 'react';

class Feed extends PureComponent {
  state = {};
  handleSubmit = value => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <h1>This is going to be the feed</h1>
      </div>
    );
  }
}
export default Feed;
