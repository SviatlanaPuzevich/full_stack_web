export const ContactForm = ({onAddContact, phoneNumber, name, onNumberChange, onNameChange}) => {
  return (<form>
    <div>
      name: <input onChange={onNameChange} value={name}/>
    </div>
    <div>
      number: <input onChange={onNumberChange} value={phoneNumber}/>
    </div>
    <div>
      <button type="submit" onClick={onAddContact}>add</button>
    </div>
  </form>)
}