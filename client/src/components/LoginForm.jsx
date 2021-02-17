import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Alert from './Utils/Alert';

const LoginForm = ({ onConnect }) => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await fetch('http://127.0.0.1:3333/login', {
      method: 'post',
      body: data,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      onConnect(responseData)
    } else {
      setError(responseData.errors[0].message);
      setLoading(false)
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
      <button disabled={loading} type="submit" className="btn btn-primary">Se connecter</button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
