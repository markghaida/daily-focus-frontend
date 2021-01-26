const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginForm = document.querySelector('#login');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const userArray = [];
const affirmationDiv = document.querySelector('.div5');
const topNav = document.querySelector('.div11');

console.log(createBtn)


/* GET ALL USERS */

fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(renderUsername);


function renderUsername(names) {
  names.forEach(name => {
    userArray.push(name.username);
  })
}

/* LOGIN INFORMATION */

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const userInput = event.target.uname.value;

  if (userArray.includes(userInput)) {
    console.log('success');
    loginForm.style.display = "none";
  } else {
    const newUserObj = {
      username: userInput,
      name: userInput
    }
    createUser(newUserObj);

  }
  deleteUser();
});

function createUser(newUserObj) {
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserObj),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
}

/* DELETE USER ACCOUNT */

function deleteUser() {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "DELETE YOUR ACCOUNT";
  topNav.append(deleteBtn);
}

// function deleteUserFetch(id) {
//   fetch(`http://localhost:3000/users/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

/* DISPLAY AFFIRMATION */

function fetchAffirmation() {
  fetch('https://dulce-affirmations-api.herokuapp.com/affirmation')
    .then(res => res.json())
    .then(data => displayAffirmation(data[0].phrase));
}

fetchAffirmation()

function displayAffirmation(affirmation) {
  affirmationDiv.textContent = affirmation;
}



