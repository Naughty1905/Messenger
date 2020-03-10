import React, { useState, useEffect } from 'react';
import ConversationSearch from '../ConversationSearch';
import ContactListItem from '../ContactListItem';
import Loader from '../Loader'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import { connect } from 'react-redux'
import { setLoaderNav, getContactsReq } from '../../redux/actions/actions';

import './Contacs.css';

const ContactList = (props) => {
  const [conversations, setConversations] = useState([]);

  const { setLoaderNav, loader, getContactsReq, isAuth, friends } = props;

  useEffect(() => {
    getConversations()
    getContactsReq(isAuth)
  }, [])

  const getConversations = () => {
    setLoaderNav()
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: 'Hello world! This is a long message that needs to be truncated.'
        };
      });
      setConversations([...conversations, ...newConversations])
      setLoaderNav()
    });
  }

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ConversationSearch />
      {
        loader ? <Loader /> :
          friends.map((friend, index) =>
            <ContactListItem
              key={conversations[index].name}
              data={conversations[index]}
              friend={friend}
            />
          )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  loader: state.navLoader,
  isAuth: state.isAuth,
  friends: state.friends
})


export default connect(mapStateToProps, { setLoaderNav, getContactsReq })(ContactList)
