import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

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
          <button onClick={toggleVisibility}>{props.hideLabel}</button>
          {props.children}
        </>
      ) : (
        <button onClick={toggleVisibility}>{props.showLabel}</button>
      )}
    </>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}
