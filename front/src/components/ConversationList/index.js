import React, { useState, useEffect, useCallback } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Loader from '../Loader'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { connect } from 'react-redux'
import { setLoaderNav, getConversationsReq } from '../../redux/actions/actions';

import './ConversationList.css';

const ConversationList = (props) => {

  const { setLoaderNav, loader, isAuth, getConversationsReq, chats } = props;

  useEffect(() => {
    if (chats.length == 0) {
      getConversationsReq(isAuth)
    }
  }, [])

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
          chats.map((chat, index) =>
            <ConversationListItem
              key={performance.now()}
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
