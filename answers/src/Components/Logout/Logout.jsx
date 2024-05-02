import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      
      navigate('/');
      // toast.success('Logged out successfully');
    }).catch((error) => {
      console.error('Logout Error:', error);
      toast.error('Failed to log out');
    });
  }, []); 
  

  return (
    <div>
     <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <p>Logging out...</p>
      </div>
    </div>
  );  
}

export default Logout;
