import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import styles from "./Login.module.css";
import { CircularProgress } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitButtonDisabled(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="Enter email address"
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              sx: {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
                "& .MuiInputBase-input": { color: "white" },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            placeholder="Enter Password"
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              sx: {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
                "& .MuiInputBase-input": { color: "white" },
              },
            }}
          />
        </Box>

        <div className={styles.footer}>
          <b className={styles.error}></b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            {submitButtonDisabled ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
