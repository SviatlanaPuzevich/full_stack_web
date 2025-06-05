import {useState} from 'react'
import shortid from 'shortid';
import {ContactForm} from "./ContactForm/ContactForm.jsx";
import {ContactList} from "./ContactList/ContactList.jsx";
import {NameFilter} from "./NameFilter/NameFilter.jsx";


const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', phoneNumber: '040-123456', id: 1},
    {name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2},
    {name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3},
    {name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4}
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const handleCreateNewContact = (e) => {
    e.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in use`);
    } else {
      setPersons([...persons, {name: newName, id: shortid.generate(), phoneNumber: phoneNumber}]);
    }
    setNewName('');
    setPhoneNumber('');
    setFilter("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter filter={filter} onChangeFilter={(e) => setFilter(e.target.value)}/>
      <ContactForm onAddContact={handleCreateNewContact} phoneNumber={phoneNumber}
                   name={newName} onNameChange={(e) => setNewName(e.target.value)}
                   onNumberChange={(e) => setPhoneNumber(e.target.value)}/>
      <h2>Numbers</h2>
      <ContactList contacts={persons} filter={filter}/>
    </div>
  )
}

export default App