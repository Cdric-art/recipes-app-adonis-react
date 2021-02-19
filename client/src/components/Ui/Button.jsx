import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

const Button = ({children, type = 'primary', loading = false, ...props}) => {

  let className = 'btn';
  let htmlType = null;

  if (type === 'submit') {
    htmlType = 'submit';
    className += ' btn-primary'
  } else {
    className += ` btn-${type}`
  }

  return (
    <button className={className} type={htmlType} disabled={loading} {...props}>
      {loading ? <>
        <Loader size="sm" /> Chargement...
      </> :
      children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
};
