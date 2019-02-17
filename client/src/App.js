import React from 'react';
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
const App = () => {
    return (
        <div>
            <h1>Did not read yet</h1>
            <p>
                This is the homepage which we can fill with some crappy stuff - I do not even know
                why exaxtly it exists here...
            </p>
        </div>
    );
};
export { defaultLinks };
export default App;
