import React, { useState, useEffect } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Loader from '../Loader'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import { connect } from 'react-redux'
import { setLoaderNav, getConversationsReq } from '../../redux/actions/actions';

import './ConversationList.css';

const ConversationList = (props) => {
  const [conversations, setConversations] = useState([]);

  const { setLoaderNav, loader, isAuth, getConversationsReq, chats } = props;
  useEffect(() => {
    getConversations()
    getConversationsReq(isAuth);
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
          chats.map((chat, index) =>
            <ConversationListItem
              key={Date.now()}
              // data={conversations[index]}
              chat={chat}
            />
          )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  loader: state.chatEnvReducer.navLoader,
  isAuth: state.userReducer.isAuth,
  chats: state.chatReducer.chats
})


export default connect(mapStateToProps, { setLoaderNav, getConversationsReq })(ConversationList)
