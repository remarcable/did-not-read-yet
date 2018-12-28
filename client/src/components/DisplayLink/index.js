import React from 'react';

const DisplayLink = ({ link, markAsRead, dismissLink, undismissLink }) => {
  const { id, title, url, dismissed } = link;

  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => markAsRead(id)}
      >
        {title}
      </a>
      {dismissed ? (
        <button onClick={() => undismissLink(id)}>Undismiss</button>
      ) : (
        <button onClick={() => dismissLink(id)}>Dismiss</button>
      )}
    </div>
  );
};

export default DisplayLink;
