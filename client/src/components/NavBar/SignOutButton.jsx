import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
/******this all need to be redone */



const SignOutButton = () => {

  const logout = async () => {
    axios.get('/logout');
  };

  return (
    <button onClick={logout}>logout </button>
  );


};




export default SignOutButton;
