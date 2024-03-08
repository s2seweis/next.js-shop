import React, { useContext } from 'react';
// import { AuthContext } from '../../context/AuthProvider.js';

const AuthController = ({ login, isAuth }) => {

  // const { isLoggedIn, logout } = useContext(AuthContext);
  
  console.log("line:40", login);
  console.log("line:42", isAuth);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          padding: '10px',
          marginLeft: '0px',
          fontSize: 'larger',
          background: '#EFECEC',
          borderRadius: '10px',
          border: '1px solid #E3E1D9',
          color: 'black',
          cursor: 'pointer', // Add cursor pointer for better user experience
        }}
        onClick={() => login()}
      >
        {!isAuth ? 'Logout' : 'Login'}
      </div>
    </div>
  );
};

export default AuthController;
