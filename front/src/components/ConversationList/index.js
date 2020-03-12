import React, { useEffect, useCallback, useMemo, useState } from 'react';
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

  const [sortedChats, setSortedChats] = useState([]);

  useEffect(() => {
    if (chats.length === 0) {
      getConversationsReq(isAuth)
    }
  }, [])

  const len = keys(chats).length;

  useEffect(() => {
    if (keys(chats).length) {
      const chatsRef = database.ref(`chats/`);
      chatsRef.on('value', snapshot => {
        const allChats = snapshot.val();
        const chatStructure = { ...chats }
        debugger
        keys(chatStructure).map((chat) => {
          chatStructure[chat]["messages"] = allChats[chat]
        })
        setSortedChats(keys(chatStructure).sort((chat1, chat2) => {
          debugger
          const message1 = last(keys(chatStructure[chat1]['messages']));
          const message2 = last(keys(chatStructure[chat2]['messages']));
          return chatStructure[chat2]['messages'][message2].date - chatStructure[chat1]['messages'][message1].date
        }))
        getConversationsRec(chatStructure)
      })
    }
  }, [len])

  // useCallback(() => getConversationsReq(isAuth), [chats.length]);


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
      <div style={{ color: 'transparent' }}>
        {
          loader ? <Loader /> :
            sortedChats.map((chat) =>
              keys(chats[chat]['messages']).length && <ConversationListItem
                key={performance.now()}
                chat={chats[chat]}
              />
            )
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loader: state.chatEnvReducer.navLoader,
  isAuth: state.userReducer.isAuth,
  chats: state.chatReducer.chats
})


export default connect(mapStateToProps, { setLoaderNav, getConversationsReq, getConversationsRec })(ConversationList)
