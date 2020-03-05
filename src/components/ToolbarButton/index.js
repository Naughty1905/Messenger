import React from 'react';
import './ToolbarButtonBlack.css';

export default function ToolbarButton(props) {
  const { icon } = props;
  return (
    <i className={`toolbar-button ${icon}`} />
  );
}
