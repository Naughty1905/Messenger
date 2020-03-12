import React, { useEffect, useCallback, useMemo } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Loader from '../Loader'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { connect } from 'react-redux'
import { database } from '../../Firebase';
import { keys, last } from 'lodash'
import { setLoaderNav, getConversationsReq, getConversationsRec } from '../../redux/actions/actions';

import './ConversationList.css';

const ConversationList = (props) => {
  const { loader, isAuth, getConversationsReq, chats, getConversationsRec } = props;

  useEffect(() => {
    if (chats.length === 0) {
      getConversationsReq(isAuth)
    }
  }, [])
  let sortedChat;
  useMemo(() => {
    const chatsRef = database.ref(`chats/`);
    chatsRef.on('value', snapshot => {
      const allChats = snapshot.val();
      const chatStructure = { ...chats }
      keys(chatStructure).map((chat) => {
        chatStructure[chat]["messages"] = allChats[chat]
      })
      getConversationsRec(chatStructure)
      sortedChat = keys(chats).sort((chat1, chat2) => {
        const message1 = last(keys(chats[chat1]['messages']));
        const message2 = last(keys(chats[chat2]['messages']));
        console.log(message1, message2)
      })
    })
  }, [chats.length])


  useCallback(() => getConversationsReq(isAuth), [chats.length]);


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
          Object.keys(chats).map((chat, index) =>
            keys(chats[chat]['messages']).length && <ConversationListItem
              key={performance.now()}
              chat={chats[chat]}
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


export default connect(mapStateToProps, { setLoaderNav, getConversationsReq, getConversationsRec })(ConversationList)
