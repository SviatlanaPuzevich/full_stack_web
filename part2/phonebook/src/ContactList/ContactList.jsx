import {Contact} from "./Contact/Contact.jsx";

export const ContactList = ({contacts, filter}) => {
  const filteredContacts = filter
    ? contacts.filter(contact =>
      contact.name.toUpperCase().startsWith(filter.toUpperCase())
    )
    : contacts;
  return <>
    {filteredContacts.map(contact => (<Contact contact={contact} key={contact.id} />))}
  </>
}