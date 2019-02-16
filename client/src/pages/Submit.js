import React, { PureComponent } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import { defaultLinks } from '../App.js';

class Submit extends PureComponent {
  state = {
    //should be gotten from server!
    links: defaultLinks,
    idCounter: defaultLinks.length + 1,
  };
  addLink = (title, url, user) => {
    this.setState(state => ({
      links: [
        ...state.links,
        {
          id: this.state.idCounter,
          title,
          url,
          user,
          dismissed: false,
          read: false,
        },
      ],
      idCounter: state.idCounter + 1,
    }));
  };
  render() {
    return (
      <div>
        <AddLinkForm addLink={this.addLink} />
        <p>Number of links: {this.state.links.length}</p>
      </div>
    );
  }
}
export default Submit;
