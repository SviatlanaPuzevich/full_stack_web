export const NameFilter = ({onChangeFilter, filter}) => {
  return (<div>
    filter shown with: <input onChange={onChangeFilter} value={filter}/>
  </div>)
}