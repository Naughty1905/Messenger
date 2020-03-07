import React from 'react'
import './AddContact.css'
import { connect } from 'react-redux'
import { setModalAddContact } from '../../../redux/actions/actions'


const AddContact = (props) => {
  const { setModalAddContact } = props;


  return (
    <div className='modal-wrap-add-contact'>
      <form className="modal-form">
        <h3>New Contact</h3>
        <i className="ion-md-person-add icon-input-1" />
        <i className='ion-md-mail icon-input-2' />
        <i className='ion-md-call icon-input-3' />
        <input autoFocus className='input-name inp' placeholder='First Name' type='search' autoComplete="on" />
        <input className='input-email inp' placeholder='Email' type='search' autoComplete="on" />
        <input className='input-number inp' placeholder='Nubmer' type='search' autoComplete="on" />
        <div className='buttons'>
          <button onClick={() => setModalAddContact()} >Cancel</button>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default connect(null, { setModalAddContact })(AddContact)
