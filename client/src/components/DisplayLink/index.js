import React from 'react';
import './DisplayLink.css';

const DisplayLink = ({
  link,
  markAsRead,
  dismissLink,
  undismissLink,
  deleteLink,
}) => {
  const { id, title, url, user, dismissed } = link;

  return (
    <div className="container">
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => markAsRead(id)}
      >
        {title}
      </a>
      <p> from {user}</p>
      {dismissed ? (
        <button onClick={() => undismissLink(id)}>Undismiss</button>
      ) : (
        <button onClick={() => dismissLink(id)}>Dismiss</button>
      )}
      <button onClick={() => deleteLink(id)}>Delete Link</button>
    </div>
  );
};

export default DisplayLink;
