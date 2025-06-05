import {useEffect, useState} from 'react'
import shortid from 'shortid';
import {ContactForm} from "./ContactForm/ContactForm.jsx";
import {ContactList} from "./ContactList/ContactList.jsx";
import {NameFilter} from "./NameFilter/NameFilter.jsx";
import contactsService from "./services/contacts.js"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
     contactsService
       .getAll()
       .then(data => setPersons(data))
       .catch(err => console.log(err));
  }, []);

  const onCreateNewContact = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    const newContact = {name: newName, id: shortid.generate(), number: phoneNumber};
    if (existingPerson) {
      let shouldUpdate = confirm(`Do you really want to update ${existingPerson.name}?`);
      if (shouldUpdate) {
        updatePhoneNumber(existingPerson.id, newContact);
      }
    } else {
      contactsService
        .create(newContact)
        .then(data => setPersons([...persons,data]))
        .catch((err) => console.log(err));
    }
    setNewName('');
    setPhoneNumber('');
    setFilter("");
  }

  const updatePhoneNumber = (id, data) => {
    contactsService
      .update(id, data)
      .then(data => setPersons(persons.map((person) => person.id === data.id ? data : person)))
  }

  const onDelete = (id) => {
      contactsService
        .deleteContact(id)
        .then(data => setPersons(persons.filter(person => person.id !== data.id)))
        .catch((err) => console.log(`can't delete contact by id ${id}`, err));
  }

  return (
    <div>
      <h2>Phonebook</h2>
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