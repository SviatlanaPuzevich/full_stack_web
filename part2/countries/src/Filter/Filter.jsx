export const Filter=({filter, onChange})=>{
  return (<div>
    <label htmlFor="filter-input">Filter:</label>
    <input value={filter} onChange={onChange} id="filter-input"/>
  </div>)
}