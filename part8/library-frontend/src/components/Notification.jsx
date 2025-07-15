import { useEffect } from 'react'

export const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    console.log('USE_EFFECT')
    // if (message) {
    //   console.log('USE_EFFECT TIMEOUT')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
    // }
  }, [message, setMessage])

  if (!message) {
    return null
  }
  return <div>{message}</div>
}
