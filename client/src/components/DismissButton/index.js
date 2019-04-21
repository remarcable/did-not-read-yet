import React from 'react';
const DismissButton = ({ dismissed, undismissLink, dismissLink, id }) => {
    return dismissed ? (
        <button onClick={() => undismissLink(id)}>Undismiss</button>
    ) : (
        <button onClick={() => dismissLink(id)}>Dismiss</button>
    );
};
export default DismissButton;
