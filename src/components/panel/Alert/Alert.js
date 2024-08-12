import React from 'react';
import './Alert.css';

export default function Alert({ status, children }) {
  return <div className={`alert alert-${status}`}>{children}</div>;
}
