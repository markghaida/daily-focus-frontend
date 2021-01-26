const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginForm = document.querySelector('#login');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const affirmationDiv = document.querySelector('.div5');
const topNav = document.querySelector('.div11');

const userArray = [];
const currentUserId = [];
// let allUserObj = [];

/* GET ALL USERS */

fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(renderUsername);


function renderUsername(names) {
  names.forEach(name => {
    let allUserObj = {
      username: name.username,
      id: name.id
    }
    userArray.push(allUserObj);
  })
};

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
    .then(deleteUser);
};

/* DELETE USER ACCOUNT */

function deleteUser(userId) {
  const deleteBtn = document.createElement('button');
  deleteBtn.className = "delete-user-btn"
  deleteBtn.textContent = "DELETE YOUR ACCOUNT";
  deleteBtn.dataset.id = userId.id;
  topNav.append(deleteBtn);

  const userDeleteBtn = document.querySelector('.delete-user-btn');
  userClickDelete(userDeleteBtn);
}

function userClickDelete(userDeleteBtn) {
  userDeleteBtn.addEventListener('click', event => {
    console.log(event.target.dataset.id);
    deleteUserFetch(event.target.dataset.id);
  })
}

function deleteUserFetch(id) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log('success');
};
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



