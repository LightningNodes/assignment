"use strict";

const registrationSwitchBtn = document.getElementById(
  "active-registration-btn"
);
const loginCard = document.querySelector(".flip-card_login");
const registrationCard = document.querySelector(".flip-card_register");
const registrationNextBtn = document.querySelector(".btn-next");
const registrationForm = document.querySelector(".reg_form");
const loginForm = document.querySelector(".login_form");
const notification = document.querySelector(".notification");
const loginSuccessNotification = document.querySelector(".login-success");
const loginErrorNotification = document.querySelector(".login-error");
const regSuccessNotification = document.querySelector(".reg-success");
const regErrorNotification = document.querySelector(".reg-error");
const errorMessageContainer = document.getElementById("login-error-message");
const regErrorMessageContainer = document.querySelector(".reg-error-message");
const switchToLogin = document.querySelector(".switch_to_login");

const url = "https://roshan-database-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json"

let fromStep = 1;
const rollBackLoginHandler = () => {
  loginCard.classList.remove("rotate-login");
  registrationCard.classList.remove("rotate-register");
};

registrationSwitchBtn.addEventListener("click", (e) => {
  loginCard.classList.add("rotate-login");
  registrationCard.classList.add("rotate-register");
});

registrationNextBtn.addEventListener("click", (e) => {
  registrationForm.scrollTo(registrationForm.scrollWidth, 0);
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  notification.classList.add("notification-show");

  const formData = new FormData(loginForm);
  const formDataObject = Object.fromEntries(formData.entries());
  const response = await fetch(url);
  const data = await response.json();
  const userArray = Object.values(data);
  try {
    const user = userArray.filter(
      (user) => user.email === formDataObject.loginEmail
    )[0];
    if (user) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ name: user.name, email: user.email })
      );
      if (user.password === formDataObject.loginPassword) {
        loginSuccessNotification.classList.remove("hide");
        setTimeout(() => {
          notification.classList.remove("notification-show");
          loginSuccessNotification.classList.add("hide");
        }, 2000);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        loginForm.reset();
        location.replace("./home.html");
      } else {
        throw new Error("Incorrect Password!!");
      }
    } else {
      throw new Error("User Not Registered!!");
    }
  } catch (error) {
    errorMessageContainer.innerText = error.message;
    loginErrorNotification.classList.remove("hide");
    setTimeout(() => {
      notification.classList.remove("notification-show");
      loginErrorNotification.classList.add("hide");
    }, 2000);
  }
});

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  notification.classList.add("notification-show");

  const formData = new FormData(registrationForm);
  const formDataObject = Object.fromEntries(formData.entries());

  if (
    formDataObject.registerPassword === formDataObject.registerConfirmPassword
  ) {
    try {
      const url = "https://roshan-database-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json"

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formDataObject.registerName,
          email: formDataObject.registerEmail,
          password: formDataObject.registerPassword,
        }),
      });
      const dataRecived = await response.json();
      if ("name" in dataRecived) {
        regSuccessNotification.classList.remove("hide");
        setTimeout(() => {
          notification.classList.remove("notification-show");
          regSuccessNotification.classList.add("hide");
        }, 2000);
        registrationForm.reset();
        rollBackLoginHandler();
      } else {
        regErrorNotification.classList.remove("hide");
        setTimeout(() => {
          notification.classList.remove("notification-show");
          regSuccessNotification.classList.add("hide");
        }, 2000);
      }
    } catch (error) {
      regErrorMessageContainer.innerText = "Internal Server Error";
      regErrorNotification.classList.remove("hide");
      setTimeout(() => {
        notification.classList.remove("notification-show");
        regErrorNotification.classList.add("hide");
      }, 2000);
    }
  } else {
    regErrorMessageContainer.innerText = "Password Not Matched";
    regErrorNotification.classList.remove("hide");
    setTimeout(() => {
      notification.classList.remove("notification-show");
      regErrorNotification.classList.add("hide");
    }, 2000);
  }
});

switchToLogin.addEventListener("click", (e) => {
  rollBackLoginHandler();
});
