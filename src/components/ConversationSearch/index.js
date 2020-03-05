import React from 'react';
import './ConversationSearchBlack.css';

export default function ConversationSearch() {
  return (
    <div className="conversation-search">
      <input
        type="search"
        className="conversation-search-input"
        placeholder="Search"
      />
    </div>
  );
}
