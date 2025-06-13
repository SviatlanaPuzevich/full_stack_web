import {useEffect, useState} from 'react'
import {ContactForm} from "./ContactForm/ContactForm.jsx";
import {ContactList} from "./ContactList/ContactList.jsx";
import {NameFilter} from "./NameFilter/NameFilter.jsx";
import contactsService from "./services/contacts.js"
import {Notification} from "./Notification/Notification.jsx";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    contactsService
      .getAll()
      .then(data => setPersons(data))
      .catch(err => showNotification(`the contact list is not available ${err}`, 'error'));
  }, []);

  const onCreateNewContact = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    const newContact = {name: newName,  number: phoneNumber};
    if (existingPerson) {
      let shouldUpdate = confirm(`Do you really want to update ${existingPerson.name}?`);
      if (shouldUpdate) {
        updatePhoneNumber(existingPerson.id, newContact);
      }
    } else {
      contactsService
        .create(newContact)
        .then(data => {
            setPersons([...persons, data]);
            showNotification(`The contact ${data.name} was created`)
            setMessage(`The contact ${data.name} was created`);
            setTimeout(() => setMessage(null), 3000);
          }
        )
        .catch((err) => showNotification(err, 'error'));
    }
    setNewName('');
    setPhoneNumber('');
    setFilter("");
  }

  const showNotification = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  }

  const updatePhoneNumber = (id, data) => {
    contactsService
      .update(id, data)
      .then(data => {
        setPersons(persons.map((person) => person.id === data.id ? data : person));
        showNotification(`The contact ${data.name} was updated`, 'update');
      })
      .catch(() => showNotification(`The contact ${data.name} can't be updated`, 'error'));
  }

  const onDelete = (id) => {
    contactsService
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => showNotification(`can't delete contact by id ${id}`, 'error'));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <NameFilter filter={filter} onChangeFilter={(e) => setFilter(e.target.value)}/>
      <ContactForm onAddContact={onCreateNewContact} phoneNumber={phoneNumber}
                   name={newName} onNameChange={(e) => setNewName(e.target.value)}
                   onNumberChange={(e) => setPhoneNumber(e.target.value)}/>
      <h2>Numbers</h2>
      <ContactList contacts={persons} filter={filter} onDelete={onDelete}/>
    </div>
  )
}

export default App