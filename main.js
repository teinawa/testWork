const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const male = document.getElementById("male");
const female = document.getElementById("female");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const asteriskPassword = document.querySelector("#asterisk-password");
const inputPassword = document.querySelector("#password");
const asteriskConfirm = document.querySelector("#asterisk-confirm");
const inputConfirm = document.querySelector("#confirm");
const userInfo = document.querySelector("#user-info");
const userList = document.querySelector(".users-list")
const closeForm = document.querySelector(".user-info__close");

closeForm.onclick = function () {
    userInfo.style.display = "none";
    firstName.value = ''
    lastName.value = ''
    age.value = ''
    email.value = ''
    male.checked = true
    password.value = ''
    confirm.value = ''
    asteriskPassword.innerHTML = ''
    asteriskConfirm.innerHTML = ''
    form.style.display = "block"
    userList.style.display = "none"
};



inputPassword.addEventListener("keyup", () => {
    let asteriskChangePassword = Array(password.value.length).fill("*").join("");
    asteriskPassword.innerHTML = asteriskChangePassword;
});
inputConfirm.addEventListener("keyup", () => {
    let asteriskChangeConfirm = Array(confirm.value.length).fill("*").join("");
    asteriskConfirm.innerHTML = asteriskChangeConfirm;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    if (count === 7){
        userInfo.style.display = "block";
        userList.style.display = "block"
        form.style.display = "none"
        createUser(e)

    }
    renderUsers()
    count = 0
});


function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const ageValue = age.value;
    const lastNameValue = lastName.value.trim();
    const maleValue = male.checked;
    const femaleValue = female.checked;
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmValue = confirm.value.trim();
    if (firstNameValue.length === 0) {
        setErrorFor(firstName, "First name cannot be blank");
    } else if (firstNameValue.length > 15 || firstNameValue.length < 2) {
        setErrorFor(
            firstName,
            "First name must be longer than 15 characters and less than 2"
        );
    } else {
        document.getElementById(
            "userInfoFirstName"
        ).innerHTML = document.getElementById("firstName").value;
        setSuccessFor(firstName);
    }
    if (lastNameValue.length === 0) {
        setErrorFor(lastName, "Last name cannot be blank");
    } else if (lastNameValue.length > 15 || lastNameValue.length < 2) {
        setErrorFor(
            lastName,
            "Last name must be longer than 15 characters and less than 2"
        );
    } else {
        document.getElementById(
            "userInfoLastName"
        ).innerHTML = document.getElementById("lastName").value;
        setSuccessFor(lastName);
    }
    if (ageValue.length === 0) {
        setErrorFor(age, "Please select age");
    } else {
        document.getElementById("userInfoAge").innerHTML = document.getElementById(
            "age"
        ).value;
        setSuccessFor(age);
    }
    if (!maleValue && !femaleValue) {
        setErrorFor(male, "Please select gender")
    } else if(maleValue) {
        document.getElementById(
            "userInfoGender"
        ).innerHTML = document.getElementById("male").value;
        setSuccessFor(male);
    } else{
        document.getElementById(
            "userInfoGender"
        ).innerHTML = document.getElementById("female").value;
        setSuccessFor(female);
    }
    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        document.getElementById(
            "userInfoEmail"
        ).innerHTML = document.getElementById("email").value;
        setSuccessFor(email);
    }
    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
    } else {
        setSuccessFor(password);
    }

    if (confirmValue === "") {
        setErrorFor(confirm, "Confirm password cannot be blank");
    } else if (passwordValue !== confirmValue) {
        setErrorFor(confirm, "Passwords does not match");
    } else {
        document.getElementById(
            "userInfoPassword"
        ).innerHTML = document.getElementById("password").value;
        setSuccessFor(confirm);
    }
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    count -= 1
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = '';
    count += 1
}
let count = 0

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}


const list = document.querySelector('.users-list')
const renderUsers = async () => {
    let uri = 'http://localhost:3000/users'
    const res = await fetch(uri)
    const users = await res.json()
    console.log(users)
    let template = ''
    users.forEach(user => {
        template +=  `
        <div class="user">
            <p>First name:</p>
            <p>${user.first_name}</p>
            <p>Last name:</p>
            <p>${user.last_name}</p>
            <p>Gender:</p>
            <p>${user.gender}</p>
            <p>Age:</p>
            <p>${user.age}</p>
            <p>Email:</p>
            <p>${user.email}</p>
            <p>Password:</p>
            <p>${user.password}</p>
        </div>
    `
    })
    list.innerHTML = template
}


window.addEventListener('DOMContentLoaded', () => renderUsers())