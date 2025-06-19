import styles from './contactForm.module.css'

export const ContactForm = ({onAddContact, contact, onNumberChange, onNameChange}) => {
  return (<form>
    <div className={styles.contactFormContainer}>
      <label htmlFor="name-input-id">Name:</label>
      <input id="name-input-id" onChange={(e) => onNameChange(e.target.value)} value={contact.name}/>
      <label htmlFor="number-input-id">Number:</label>
      <input id="number-input-id" onChange={(e) => onNumberChange(e.target.value)} value={contact.phoneNumber}/>
      <button type="submit" onClick={onAddContact}>Add</button>
    </div>
  </form>)
}