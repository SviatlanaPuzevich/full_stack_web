export const Contact = ({contact, onDelete}) => {
  const handleDelete = (id) => {
    if (confirm(`Are you would like to delete ${contact.name}?`)) {
      onDelete(id);
    }
  };
  return (
    <>
      <div>{contact.name}</div>
      <div>{contact.number}</div>
      <button onClick={() => handleDelete(contact.id)}>Delete</button>
    </>
  )
};
