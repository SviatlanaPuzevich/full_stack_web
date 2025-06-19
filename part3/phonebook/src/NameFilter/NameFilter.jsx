import styles from './nameFilter.module.css';

export const NameFilter = ({onChange, filter}) => {
  return (<div className={styles.nameFilterContainer}>
    <label htmlFor="name-filter-input-id">Filter shown with:</label>
    <input id="name-filter-input-id" onChange={(e) => onChange(e.target.value)} value={filter}/>
  </div>)
}