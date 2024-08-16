import React from 'react';
import './Alert.css';

export default function Alert({ status, className = '', children }) {
  return <div className={`alert alert-${status} ${className} ${status == 'warning' ? 'dark:bg-[#3a3b38]' : ''}`}>{children}</div>;
}
