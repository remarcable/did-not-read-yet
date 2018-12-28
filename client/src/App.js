import React, { PureComponent } from 'react';
import { modifyElement } from './lib/modifyElement';

import DisplayLink from './components/DisplayLink';

class App extends PureComponent {
  state = {
    links: [
      {
        id: 1,
        title: 'Google',
        url: 'https://google.com',
        dismissed: false,
        read: false,
      },
      {
        id: 2,
        title: 'YouTube',
        url: 'https://youtube.com',
        dismissed: false,
        read: false,
      },
      {
        id: 3,
        title: 'Hacker News',
        url: 'https://news.ycombinator.com',
        dismissed: false,
        read: false,
      },
    ],
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
      />
    );

    return (
      <div>
        <h1>Did not read yet</h1>
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

export default App;
