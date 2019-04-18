import React from 'react';

//soll später über Login/Registrierung vom Server provided werden.
const currentUser = 'nrin';

const AddLinkForm = props => {
  return (
    <div>
      <h2>Add a new link you want your friends to check out!</h2>
      <form onSubmit={e => handleSubmit(e, props.addLink)}>
        <input type="text" name="title" placeholder="Title?" />
        <input type="url" name="url" placeholder="Url?" />
        <input type="submit" />
      </form>
    </div>
  );
};

function handleSubmit(event, addLink) {
  event.preventDefault();
  addLink(event.target.title.value, event.target.url.value, currentUser);
}

export default AddLinkForm;
