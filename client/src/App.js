import React, {useEffect, useState} from 'react';
import LoginForm from './components/LoginForm';
import {apiFetch} from './components/Utils/api';
import Site from './components/Site';

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    apiFetch('/me')
      .then(user => setUser(user))
      .catch(() => setUser(false));
  }, []);

  if (user === null) {
    return null;
  }

  return (
    user ? <Site/> : <LoginForm onConnect={setUser}/>
  );

};

export default App;
