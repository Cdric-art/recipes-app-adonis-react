import React from 'react';
import PropTypes from 'prop-types'

const Field = ({name, children, type = 'text', className, error, ...props}) => {
  return (
    <div className={`form-group ${className}`}>
      {children && <label htmlFor={name}>{children}</label>}
      <input type={type} name={name} id={name} className={`form-control${error ? ' is-invalid' : ''}`} {...props}/>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Field;

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string
}
