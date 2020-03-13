import React, { useEffect } from 'react'
import './Tooltip.css'
import { setAuthError } from '../../redux/actions/users-actions'
import { connect } from 'react-redux'

const Tooltip = (props) => {

  const { setAuthError, authErrorText } = props;

  useEffect(() => {
    setTimeout(() => {
      setAuthError()
    }, 1700)
  }, [])

  return (
    <div className='authError'>
      <p>{authErrorText}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthError: state.userReducer.isAuthError,
  authErrorText: state.userReducer.authErrorText
})


export default connect(mapStateToProps, { setAuthError })(Tooltip)
