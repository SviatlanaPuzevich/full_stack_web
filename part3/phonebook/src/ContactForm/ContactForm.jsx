import styles from './contactForm.module.css'

export const ContactForm = ({onAddContact, phoneNumber, name, onNumberChange, onNameChange}) => {
  return (<form>
    <div className={styles.contactFormContainer}>
      <label htmlFor="name-input-id">Name:</label>
      <input id="name-input-id" onChange={onNameChange} value={name}/>
      <label htmlFor="number-input-id">Number:</label>
      <input id="number-input-id" onChange={onNumberChange} value={phoneNumber}/>
      <button type="submit" onClick={onAddContact}>Add</button>
    </div>
  </form>)
}