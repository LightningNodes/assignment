import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmission = async () => {
    const { name, email, password, confirmPassword } = values;

    if (!name || !email || !password || password !== confirmPassword) {
      toast.error("Please fill all fields and ensure passwords match.");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%", marginBottom: "15px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange("name")}
            placeholder="Enter your name"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              sx: { "& fieldset, & .MuiInputBase-input": { color: "white" } },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="Enter email address"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              sx: { "& fieldset, & .MuiInputBase-input": { color: "white" } },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            placeholder="Enter password"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              sx: { "& fieldset, & .MuiInputBase-input": { color: "white" } },
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Confirm password"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              sx: { "& fieldset, & .MuiInputBase-input": { color: "white" } },
            }}
          />
        </Box>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            {submitButtonDisabled ? (
              <CircularProgress size={24} style={{ color: "white" }} />
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
