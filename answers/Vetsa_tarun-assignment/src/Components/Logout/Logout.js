import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut().then(() => {

      navigate('/');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  }, []); 


  return (
    <div>
     <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Logging out...</p>
      </div>
    </div>
  );  
}

export default Logout;