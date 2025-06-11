export const Contact = ({contact, onDelete}) => {
  const handleDelete = (id) => {
    if (confirm(`Are you would like to delete ${contact.name}?`)) {
      onDelete(id);
    }
  };
  return (
    <div>
      <span>{`${contact.name} ${contact.number}`}</span>
      <button onClick={() => handleDelete(contact.id)}>Delete</button>
    </div>
  )
};
