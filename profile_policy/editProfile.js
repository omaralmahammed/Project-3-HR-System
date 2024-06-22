/* @format */
////////////////////////////////////////////////////////////////////////////
// get object data from local storage
// ///////////////////////////////////////////////////////////////////////

logInUser = JSON.parse(window.localStorage.getItem("logInUser"));
regestersData = JSON.parse(window.localStorage.getItem("regestersData"));
managerData = JSON.parse(window.localStorage.getItem("managerData"));

//////////////////////////////////////////////////////////////////////////
// Get Value for all input field from the local storage
//////////////////////////////////////////////////////////////////////////

const profilePic = document.getElementById("profilePic");
profilePic.src = logInUser.image;

const jobPosition = document.getElementById("jobPosition");
jobPosition.value = logInUser.jobPosition;

const firstName = document.getElementById("firstName");
firstName.value = logInUser.firstName;

const lastName = document.getElementById("lastName");
lastName.value = logInUser.lastName;

const userName = document.getElementById("userName");
userName.value = logInUser.userName;

const employeeID = document.getElementById("employeeID");
employeeID.value = logInUser.employeeID;

const email = document.getElementById("email");
email.value = logInUser.email;

const phoneNumber = document.getElementById("phoneNumber");
phoneNumber.value = logInUser.phoneNumber;

const country = document.getElementById("country");
country.value = logInUser.country;

//////////////////////////////////////////////////////////////////////////
// change image
/////////////////////////////////////////////////////////////////////

// let profilePic = document.getElementById("profilePic");
// let inputFile = document.getElementById("fileInput");

// window.addEventListener("load", () => {
//   let storedImage = localStorage.getItem("profilePic");
//   if (storedImage) {
//     profilePic.src = storedImage;
//   }
// });

// profilePic.addEventListener("click", () => {
//   inputFile.click();
// });

// inputFile.addEventListener("change", function () {
//   let file = inputFile.files[0];

//   if (file) {
//     let reader = new FileReader();

//     reader.onload = function (e) {
//       profilePic.src = e.target.result;
//       localStorage.setItem("profilePic", e.target.result);
//     };

//     reader.readAsDataURL(file);
//   } else {
//     alert("Use another imag, This image is big size.");
//   }
// });
// const formData = document.getElementById("formData");

formData.addEventListener("submit", function (event) {
  event.preventDefault();

  let formIsValid = true;

  ////////////////////////////////////////////////////////////////////////////////////////////
  //Job Position Validation
  ////////////////////////////////////////////////////////////////////////////////////////////

  const jobPositionError = document.getElementById("jobPositionError");
  var jobPositionPattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  // validation of the job position
  if (jobPositionPattern.test(jobPosition.value.trim())) {
    jobPositionError.innerHTML = "";
    jobPosition.style.border = "0px ";
  } else {
    jobPositionError.innerHTML =
      "Invalid job position. Please use only Letters (a-z)(A-Z) ";
    jobPosition.style.border = "1px solid red";
    formIsValid = false;
  }

  //First Name
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const firstName = document.getElementById("firstName");
  const firstNameError = document.getElementById("firstNameError");
  var firstNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  if (firstNamePattern.test(firstName.value.trim())) {
    firstNameError.innerHTML = "";
    firstName.style.border = "0px ";
  } else {
    firstNameError.innerHTML =
      "Invalid name. Please use only Letters (a-z)(A-Z) ";
    firstName.style.border = "1px solid red";
    formIsValid = false;
  }

  //Last Name Validation

  const lastName = document.getElementById("lastName");
  const lastNameError = document.getElementById("lastNameError");
  var lastNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  if (lastNamePattern.test(lastName.value.trim())) {
    lastNameError.innerHTML = "";
    lastName.style.border = "0px ";
  } else {
    lastNameError.innerHTML =
      "Invalid name. Please use only Letters (a-z)(A-Z) ";
    lastName.style.border = "1px solid red";
    formIsValid = false;
  }

  //Email Validation

  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (emailPattern.test(email.value.trim())) {
    emailError.innerHTML = "";
    email.style.border = "0px ";
  } else {
    emailError.innerHTML =
      "Invalid email address. Please enter a valid email in the format: example@domain.com.";
    email.style.border = "1px solid red";
    formIsValid = false;
  }

  // Phone Number Validation

  const phoneNumber = document.getElementById("phoneNumber");
  const phoneNumberError = document.getElementById("phoneNumberError");
  var phoneNumberPattern =
    /^\+?[0-9]{1,3}[ -]?\(?[0-9]{1,3}\)?[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[0-9]*$/;

  if (phoneNumberPattern.test(phoneNumber.value.trim())) {
    phoneNumberError.innerHTML = "";
    phoneNumber.style.border = "0px ";
  } else {
    phoneNumberError.innerHTML =
      "Invalid phone number. Please enter a valid phone number.";
    phoneNumber.style.border = "1px solid red";
    formIsValid = false;
  }

  // Country Validation

  const country = document.getElementById("country");
  const countryError = document.getElementById("countryError");
  var countryPattern = /[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  if (countryPattern.test(country.value.trim())) {
    countryError.innerHTML = "";
    country.style.border = "0px";
  } else {
    countryError.innerHTML =
      "Invalid country name. Please enter a valid country name using only letters.";
    country.style.border = "1px solid red";
    formIsValid = false;
  }

  // Retrieve existing form data from local storage

  editInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    country: country.value,
    jobPosition: jobPosition.value,
    password: logInUser.password,
    employeeID: logInUser.employeeID,
    image: profilePic.src,
  };

  // Check if current password matches the password in local storage
  let currentPassword = document.getElementById("currentPassword");
  let currentPasswordError = document.getElementById("currentPasswordError");

  let newPassword = document.getElementById("newPassword");
  let newPasswordError = document.getElementById("newPasswordError");

  let confirmPassword = document.getElementById("confirmPassword");
  let confirmPasswordError = document.getElementById("confirmPasswordError");

  if (newPassword.value.trim() !== "" || confirmPassword.value.trim() !== "") {
    // If any password field is filled, validate the current password
    if (currentPassword.value.trim() === "") {
      currentPasswordError.innerText =
        "Current password is required to change the password.";
      currentPasswordError.style.border = "1px solid red";
      formIsValid = false;
    } else if (currentPassword.value.trim() !== logInUser.password) {
      currentPasswordError.innerText = "Incorrect current password.";
      currentPasswordError.style.border = "1px solid red";
      formIsValid = false;
    } else {
      currentPasswordError.innerText = "";
      currentPasswordError.style.border = "0px";

      // Validate new password length
      var passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (passwordPattern.test(newPassword.value.trim())) {
        newPasswordError.innerHTML = "";
        newPasswordError.style.border = "0px";
      } else {
        newPasswordError.innerHTML =
          "Password must be at least 8 characters long ,and include uppercase letters, lowercase letters, numbers, and special characters. ";
        newPassword.style.border = "1px solid red";
        formIsValid = false;
      }

      // Validate confirm password
      if (confirmPassword.value.trim() !== newPassword.value.trim()) {
        confirmPasswordError.innerHTML = "Passwords do not match";
        confirmPassword.style.border = "1px solid red";
        formIsValid = false;
      } else {
        confirmPasswordError.innerHTML = "";
        confirmPasswordError.style.border = "0px";
      }

      // If all password validations, update the password
      if (formIsValid) {
        editInfo.password = newPassword.value;
      }
    }
  }

  if (formIsValid) {
    console.log(editInfo.employeeID);
    console.log(managerData.employeeID);

    if (managerData.employeeID === editInfo.employeeID) {
      managerData = editInfo;
      logInUser = editInfo;
      localStorage.setItem("managerData", JSON.stringify(managerData));
      localStorage.setItem("logInUser", JSON.stringify(logInUser));
    } else {
      for (var i = 0; i < regestersData.length; i++) {
        if (regestersData[i].employeeID === editInfo.employeeID) {
          regestersData[i] = editInfo;
          logInUser = editInfo;
          localStorage.setItem("regestersData", JSON.stringify(regestersData));
          localStorage.setItem("logInUser", JSON.stringify(logInUser));
          break;
        }
      }
    }

    // Redirect to another page after storing data
    window.location.href = "/profile_policy/profile.html";
  }
});

// make cancel button redirect to profile page

document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "/profile_policy/profile.html";
});
