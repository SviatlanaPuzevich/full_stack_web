export const CountryList = ({list, onShowCountry}) => {
  if (!list) {
    return null
  }
  if (list.length > 10) {
    return <p>too many countries, specify another filters</p>
  }
  return (<ul>{
    list.map((item) => <li key={item.name.common}>{item.name.common} <button data-country={item.name.common} onClick={onShowCountry}>Show</button></li>)
  }
  </ul>)
}