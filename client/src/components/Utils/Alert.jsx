import React from 'react';

const Alert = ({ children }) => {
  return (
    <div className="alert alert-danger">
      { children }
    </div>
  );
};

export default Alert;
