export const Filter=({value, onChange})=>{
  return (<div>
    <label htmlFor="filter-input">Filter:</label>
    <input value={value} onChange={onChange} id="filter-input"/>
  </div>)
}