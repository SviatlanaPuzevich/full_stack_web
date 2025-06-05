import {useEffect, useState} from 'react'
import shortid from 'shortid';
import {ContactForm} from "./ContactForm/ContactForm.jsx";
import {ContactList} from "./ContactList/ContactList.jsx";
import {NameFilter} from "./NameFilter/NameFilter.jsx";
import axios from "axios";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);
  const handleCreateNewContact = (e) => {
    e.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in use`);
    } else {
      setPersons([...persons, {name: newName, id: shortid.generate(), number: phoneNumber}]);
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