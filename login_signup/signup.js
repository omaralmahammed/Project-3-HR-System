/** @format */

const formData = document.getElementById("signupForm");

formData.addEventListener("submit", function (event) {
  event.preventDefault(); // to cancel the defulit functinalty for submit

  let formIsValid = true;

  //First Name Validation

  const firstName = document.getElementById("firstName");
  const firstNameError = document.getElementById("firstNameError");
  var firstNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  if (firstNamePattern.test(firstName.value.trim())) {
    firstNameError.innerHTML = "";
    firstName.style.border = "2px solid green";
  } else {
    firstNameError.innerHTML = "Please use only Letters (a-z)(A-Z) ";
    firstName.style.border = "1px solid red";
    formIsValid = false;
  }

  // //Last Name Validation

  const lastName = document.getElementById("lastName");
  const lastNameError = document.getElementById("lastNameError");
  var lastNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  if (lastNamePattern.test(lastName.value.trim())) {
    lastNameError.innerHTML = "";
    lastName.style.border = "2px solid green ";
  } else {
    lastNameError.innerHTML = "Please use only Letters (a-z)(A-Z) ";
    lastName.style.border = "1px solid red";
    formIsValid = false;
  }

  // //Email Validation

  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (emailPattern.test(email.value.trim())) {
    emailError.innerHTML = "";
    email.style.border = "2px solid green ";
  } else {
    emailError.innerHTML =
      "Please enter a valid email in the format: example@domain.com.";
    email.style.border = "1px solid red";
    formIsValid = false;
  }

  //Employee Number Validation

  const employeeID = document.getElementById("employeeID");
  const employeeIDError = document.getElementById("employeeIDError");
  var employeeIDPattern = /^[0-9]+$/;

  if (employeeIDPattern.test(employeeID.value.trim())) {
    employeeIDError.innerHTML = "";
    employeeID.style.border = "2px solid green";
  } else {
    employeeIDError.innerHTML = "Please use only Numbers ";
    employeeID.style.border = "1px solid red";
    formIsValid = false;
  }

  //Password Validation

  let password = document.getElementById("password");
  let passwordError = document.getElementById("passwordError");
  var passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (passwordPattern.test(password.value.trim())) {
    passwordError.innerHTML = "";
    password.style.border = "2px solid green";
  } else {
    passwordError.innerHTML =
      "Password must be at least 8 characters long ,and include uppercase letters, lowercase letters, numbers, and special characters. ";
    password.style.border = "1px solid red";
    formIsValid = false;
  }

  //Confirm Password Validation

  const ConfirmPassword = document.getElementById("ConfirmPassword");
  const ConfirmPasswordError = document.getElementById("ConfirmPasswordError");

  if (ConfirmPassword.value.trim() === password.value.trim()) {
    ConfirmPasswordError.innerHTML = "";
    ConfirmPassword.style.border = "2px solid green";
  } else {
    ConfirmPasswordError.innerHTML = "Password dose not match";
    ConfirmPassword.style.border = "1px solid red";
    formIsValid = false;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Store data in local storage as an object

  if (formIsValid) {
    let formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: `${firstName.value}.${lastName.value}`,
      email: email.value,
      employeeID: employeeID.value,
      phoneNumber: "Phone number",
      country: "Country",
      jobPosition: "Job Position",
      password: password.value,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };

    let regestersData = JSON.parse(localStorage.getItem("regestersData")) || [];
    regestersData.push(formData);

    localStorage.setItem("regestersData", JSON.stringify(regestersData));

    // Go to Home page
    window.location.href = "/home_about/home.html";
  }
});
