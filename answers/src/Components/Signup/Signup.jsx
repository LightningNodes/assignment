import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from "../../firebase";
import { toast } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "", // Added state for confirm password
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || values.pass !== values.confirmPass) {
      toast.error("Please fill all fields and make sure passwords match.");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        toast.success('Account created successfully!');
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '100%', marginBottom: "15px" }, // Uniform margin for all text fields
          }}
          noValidate
          autoComplete="off"
        >
          {/* Other input fields remain the same */}
          <TextField
        label="Name"
        variant="outlined"
        value={values.name}
        style={{marginBottom:"15px"}}
        onChange={handleChange('name')}
        placeholder="Enter your name"
        fullWidth
        InputLabelProps={{
          style: { color: 'black' },
        }}
        InputProps={{
          sx: {
            '& fieldset': {
              borderColor: 'black', // Normal border color
            },
            '&:hover fieldset': {
              borderColor: 'black', // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'red', // Border color when input is focused
            },
          },
        }}
        sx={{
          '& .MuiInputBase-input': { color: 'black' }, // Changes the input text color
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Enter email address"
        style={{marginBottom:"15px"}}

        fullWidth
        InputLabelProps={{
          style: { color: 'black' },
        }}
        InputProps={{
          sx: {
            '& fieldset': {
              borderColor: 'black', // Normal border color
            },
            '&:hover fieldset': {
              borderColor: 'black', // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'red', // Border color when input is focused
            },
          },
        }}
        sx={{
          '& .MuiInputBase-input': { color: 'black' }, // Changes the input text color
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={values.pass}
        onChange={handleChange('pass')}
        style={{marginBottom:"15px"}}

        placeholder="Enter Password"
        fullWidth
        InputLabelProps={{
          style: { color: 'black' },
        }}
        InputProps={{
          sx: {
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'red',
            },
          },
        }}
        sx={{
          '& .MuiInputBase-input': { color: 'black' },
        }}
      />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={values.confirmPass}
            onChange={handleChange('confirmPass')}
            placeholder="Confirm Password"
            fullWidth
            InputLabelProps={{
              style: { color: 'black' },
            }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'red',
                },
              },
            }}
            sx={{
              '& .MuiInputBase-input': { color: 'black' }, // Ensures text color consistency
            }}
          />
        </Box>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
          {submitButtonDisabled ? (
              <CircularProgress size={24} style={{ color: 'black' }} />
            ) : (
              "Signup"
            )}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
