export const Contact = ({contact, onDelete}) => {
  const handleDelete = (e) => {
    let shouldDelete = confirm(`Are you would like to delete ${contact.name}?`);
    if (shouldDelete) {
      const idToDelete = e.currentTarget.dataset.id;
      onDelete(idToDelete);
    }
  };
  return (
    <div>
      <span>{`${contact.name} ${contact.number}`}</span>
      <button data-id={contact.id} onClick={handleDelete}>Delete</button>
    </div>
  )
};
