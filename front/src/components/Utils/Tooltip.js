import React, { useEffect } from 'react'
import './Tooltip.css'
import { setAuthError } from '../../redux/actions/actions'
import { connect } from 'react-redux'

const Tooltip = (props) => {

  const { setAuthError } = props;

  useEffect(() => {
    setTimeout(() => {
      setAuthError()
    }, 1700)
  }, [])

  return (
    <div className='authError'>
      <p>Auth Error</p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthError: state.isAuthError
})


export default connect(mapStateToProps, { setAuthError })(Tooltip)
