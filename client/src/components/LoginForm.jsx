import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Alert from './Utils/Alert';
import {ApiErrors, apiFetch} from './Utils/api';
import Button from './Utils/Button';

const LoginForm = ({onConnect}) => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const user = await apiFetch('/login', {
        method: 'post',
        body: data,
      });
      onConnect(user);
    } catch (e) {
      if (e instanceof ApiErrors) {
        setError(e.errors[0].message);
      } else {
        console.log(e);
      }
      setLoading(false);
    }

  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      {error && <Alert>{error}</Alert>}
      <div className="form-group">
        <label htmlFor="email">Nom d'utilisateur</label>
        <input type="text" name="email" id="email" className="form-control" required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" className="form-control" required/>
      </div>
      <Button loading={loading} type="submit">Se connecter</Button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
