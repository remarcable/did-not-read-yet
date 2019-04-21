import React from 'react';
import './DisplayLink.css';
import DismissButton from '../DismissButton';

const DisplayLink = ({ link, markAsRead, dismissLink, undismissLink, deleteLink, onFeed }) => {
    const { id, title, url, user, dismissed } = link;

    return (
        <div className="container">
            <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onFeed ? () => markAsRead(id) : null}
            >
                {title}
            </a>
            <p className="text"> from {user}</p>
            {onFeed ? (
                <DismissButton
                    dismissed={dismissed}
                    dismissLink={dismissLink}
                    undismissLink={undismissLink}
                    id={id}
                />
            ) : null}
            <button onClick={() => deleteLink(id)}>Delete Link</button>
        </div>
    );
};

export default DisplayLink;
