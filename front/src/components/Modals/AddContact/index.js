import React from 'react'
import './AddContact.css'
import { connect } from 'react-redux'
import { setModalAddContact, addNewContactReq } from '../../../redux/actions/actions'


const AddContact = (props) => {
  const { setModalAddContact, addNewContactReq, isAuth } = props;

  const addNewContact = (event) => {
    event.preventDefault();
    const { target } = event;
    const fullName = target[0].value;
    const login = target[1].value;
    const number = target[2].value;
    addNewContactReq(fullName, login, number, isAuth);
  }

  return (
    <div className='modal-wrap-add-contact'>
      <form className="modal-form" onSubmit={addNewContact}>
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

const mapStateToProps = (state) => ({
  isAuth: state.isAuth
})

export default connect(mapStateToProps, { setModalAddContact, addNewContactReq })(AddContact)
