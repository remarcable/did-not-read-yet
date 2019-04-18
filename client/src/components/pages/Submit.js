import React, { PureComponent } from 'react';
import AddLinkForm from '../../components/AddLinkForm';
import DisplayLink from '../../components/DisplayLink';
import { defaultLinks } from '../../App.js';

class Submit extends PureComponent {
    state = {
        //should be gotten from server and is currently not functional
        //with state from App.js
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
    deleteLink = id => {
        let linksCopy = [...this.state.links];
        linksCopy = linksCopy.filter(element => id !== element.id);
        this.setState({ links: linksCopy });
    };
    render() {
        return (
            <div>
                <AddLinkForm addLink={this.addLink} />
                <h2>Those are your already submitted links!</h2>
                {this.state.links.map(link => (
                    <DisplayLink key={link.id} link={link} deleteLink={this.deleteLink} />
                ))}
            </div>
        );
    }
}
export default Submit;
