import React from 'react';
import './Alert.css';

export default function Alert({ status, className = '', children }) {
  return <div className={`alert alert-${status} ${className} `}>{children}</div>;
}
