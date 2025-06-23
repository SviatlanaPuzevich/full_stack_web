export const Message = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div>{message}</div>
  )
}