import styles from './nameFilter.module.css';

export const NameFilter = ({onChangeFilter, filter}) => {
  return (<div className={styles.nameFilterContainer}>
    <label htmlFor="name-filter-input-id">Filter shown with:</label>
    <input id="name-filter-input-id" onChange={onChangeFilter} value={filter}/>
  </div>)
}