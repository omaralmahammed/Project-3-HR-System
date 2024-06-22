/** @format */

logInUser = JSON.parse(window.localStorage.getItem("logInUser"));

const profileImage = document.getElementById("profileImage");
const headerName = document.getElementById("headerName");
const titleName = document.getElementById("titleName");
const jobPosition = document.getElementById("jobPosition");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const employeeID = document.getElementById("employeeID");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const country = document.querySelectorAll(".country");

// // header
headerName.innerText = logInUser.firstName;
profileImage.src = logInUser.image;

// // Input field
firstName.value = logInUser.firstName;
lastName.value = logInUser.lastName;
userName.value = logInUser.userName;
employeeID.value = logInUser.employeeID;
email.value = logInUser.email;
phoneNumber.value = logInUser.phoneNumber;
country[1].value = logInUser.country;

// // titile
titleName.innerText = `${logInUser.firstName} ${logInUser.lastName}`;
jobPosition.innerText = logInUser.jobPosition;
country.value = logInUser.country;
country[0].innerHTML = logInUser.country;
