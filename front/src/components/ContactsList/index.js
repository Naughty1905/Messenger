import React, { useState, useEffect, Suspense } from 'react';
import ConversationSearch from '../ConversationSearch';
// import ContactListItem from '../ContactListItem';
import Loader from '../Loader'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import { connect } from 'react-redux'
import { setLoaderNav, getContactsReq } from '../../redux/actions/actions';


import './Contacs.css';

const ContactListItem = React.lazy(() => import('../ContactListItem'))


const ContactList = (props) => {
  const [conversations, setConversations] = useState([]);

  const { setLoaderNav, loader, getContactsReq, isAuth, friends } = props;

  useEffect(() => {
    getContactsReq(isAuth)
  }, [])


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
            <Suspense fallback={<div>Loading...</div>}><ContactListItem
              key={performance.now()}
              friend={friend}
            /></Suspense>

          )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  loader: state.chatEnvReducer.navLoader,
  isAuth: state.userReducer.isAuth,
  friends: state.userReducer.friends
})


export default connect(mapStateToProps, { setLoaderNav, getContactsReq })(ContactList)
