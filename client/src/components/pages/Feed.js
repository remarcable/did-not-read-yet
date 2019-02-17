import React, { PureComponent } from 'react';
import DisplayLink from '../DisplayLink';
import { modifyElement } from '../../lib/modifyElement.js';
import { defaultLinks } from '../../App.js';

class Feed extends PureComponent {
    state = {
        idCounter: defaultLinks.length + 1,
        links: defaultLinks,
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
                onFeed={true}
            />
        );

        return (
            <div>
                <h1>This is your feed - here you can find your:</h1>
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
export default Feed;
