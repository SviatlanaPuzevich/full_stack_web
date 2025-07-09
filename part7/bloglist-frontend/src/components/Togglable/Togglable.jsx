import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      {visible ? (
        <>
          <Button type="button" variant="outline-primary" onClick={toggleVisibility}>{props.hideLabel}</Button>
          {props.children}
        </>
      ) : (
        <Button type="button" variant="outline-primary" onClick={toggleVisibility}>{props.showLabel}</Button>
      )}
    </>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}
