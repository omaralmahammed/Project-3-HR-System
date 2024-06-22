/** @format */

// store data from json file into local storage

async function fetchData() {
  const response = await fetch("managerData.json");
  const userData = await response.json();
  localStorage.setItem("managerData", JSON.stringify(userData));
}

fetchData();

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const regestersData = JSON.parse(localStorage.getItem("regestersData"));
    const managerData = JSON.parse(localStorage.getItem("managerData"));

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    let formIsValid = true;
    let userFound = false;
    let logInUser = null;

    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // check email & password by localstorage
    for (var i = 0; i < regestersData.length; i++) {
      if (email.value.trim() === regestersData[i].email) {
        email.style.border = "2px solid green";
        emailError.innerHTML = "";

        userFound = true;
        if (password.value.trim() === regestersData[i].password) {
          // Login successful, create user object
          logInUser = regestersData[i];
          ifLogin = true;
          break;
        } else {
          passwordError.innerHTML = "Password is not valid.";
          password.style.border = "2px solid red";
          formIsValid = false;
        }
      }
    }

    if (!userFound) {
      if (email.value.trim() === managerData.email) {
        email.style.border = "2px solid green";
        emailError.innerHTML = "";

        userFound = true;
        if (password.value.trim() === managerData.password) {
          password.style.border = "0px";
          logInUser = managerData;
          ifLogin = true;
        } else {
          passwordError.innerHTML = "Password is not valid.";
          password.style.border = "2px solid red";
          formIsValid = false;
        }
      } else if (emailPattern.test(email.value.trim())) {
        emailError.innerHTML = "No registered email found.";
        email.style.border = "2px solid red";
        formIsValid = false;
      } else {
        emailError.innerHTML =
          "Please enter a valid email in the format: (example@domain.com)";
        email.style.border = "2px solid red";
        formIsValid = false;
      }
    }

    if (formIsValid && logInUser) {
      // Clear form fields
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      email.style.border = "0px";
      password.style.border = "0px";

      // Go to home page
      window.location.href = "/home_about/home.html";

      // store logInUser in localStorage
      localStorage.setItem("logInUser", JSON.stringify(logInUser));
      localStorage.setItem("ifLogin", JSON.stringify(ifLogin));
    }
  });
