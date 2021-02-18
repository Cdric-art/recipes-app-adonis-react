import React from 'react';

const Loader = ({ size }) => {
  return (
    <div className={`spinner-border spinner-border-${size}`} role="status">
      <span className="sr-only">Chargement...</span>
    </div>
  );
};

export default Loader;
