import {Contact} from "./Contact/Contact.jsx";
import styles from "./ContactList.module.css";

export const ContactList = ({contacts, filter, onDelete}) => {
  const filteredContacts = filter
    ? contacts.filter(contact =>
      contact.name.toUpperCase().startsWith(filter.toUpperCase())
    )
    : contacts;
  return <div className={styles}>
    <h2 className={styles.title}>Numbers</h2>
    <div className={styles.itemsContainer}>
      {filteredContacts.map(contact => (<Contact contact={contact} key={contact.id} onDelete={onDelete}/>))}
    </div>
  </div>
}