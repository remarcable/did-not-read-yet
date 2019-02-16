import React, { PureComponent } from 'react';
import { modifyElement } from './lib/modifyElement';

import DisplayLink from './components/DisplayLink';
import AddLinkForm from './components/AddLinkForm';

const defaultLinks = [
  {
    id: 1,
    title: 'Google',
    url: 'https://google.com',
    user: 'lightningboss',
    dismissed: false,
    read: false,
  },
  {
    id: 2,
    title: 'YouTube',
    url: 'https://youtube.com',
    user: 'lightningboss',
    dismissed: false,
    read: false,
  },
  {
    id: 3,
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    user: 'nrin',
    dismissed: false,
    read: false,
  },
];
class App extends PureComponent {
  state = {
    idCounter: defaultLinks.length + 1,
    links: defaultLinks,
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
  deleteLink = id => {
    let linksCopy = [...this.state.links];
    linksCopy = linksCopy.filter(element => id !== element.id);
    this.setState({ links: linksCopy });
  };
  updateSingleLink = (id, updatedFields) => {
    this.setState(({ links }) => {
      return {
        links: modifyElement({ elements: links, id, updatedFields }),
      };
    });
  };

  markAsRead = id => {
    this.updateSingleLink(id, { read: true });
  };

  dismissLink = id => {
    this.updateSingleLink(id, { dismissed: true });
  };

  undismissLink = id => {
    this.updateSingleLink(id, { dismissed: false });
  };

  render() {
    const { links } = this.state;
    const displayLink = link => (
      <DisplayLink
        key={link.id}
        link={link}
        markAsRead={this.markAsRead}
        dismissLink={this.dismissLink}
        undismissLink={this.undismissLink}
        deleteLink={this.deleteLink}
      />
    );

    return (
      <div>
        <h1>Did not read yet</h1>
        <AddLinkForm addLink={this.addLink} />
        <h2>New Links</h2>
        {links.filter(link => !link.read && !link.dismissed).map(displayLink)}
        <h2>Read Links</h2>
        {links.filter(link => link.read && !link.dismissed).map(displayLink)}
        <h2>Dismissed Links</h2>
        {links.filter(link => link.dismissed).map(displayLink)}
      </div>
    );
  }
}
export { defaultLinks };
export default App;
