import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const loginForm = document.getElementById('loginForm');
const feedback = document.getElementById('feedback');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful login
      feedback.textContent = 'Login successful!';
      // Redirect to user dashboard or perform other actions
    })
    .catch((error) => {
      // Handle login errors
      feedback.textContent = error.message;
    });
});