const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginBtn = document.querySelector('#login');
const userArray = [];
const affirmationDiv =  document.querySelector(".div5") 


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

loginBtn.addEventListener('submit', event => {
  event.preventDefault();

  const userInput = event.target.uname.value;

  if (userArray.includes(userInput)) {
    console.log('success');
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
    .then(data => {
      console.log('Success:', data);
    })
}

/* DISPLAY AFFIRMATION */

function fetchAffirmation() {
  fetch('https://dulce-affirmations-api.herokuapp.com/affirmation')
    .then(res => res.json())
    .then(data => displayAffirmation(data[0].phrase));
}

fetchAffirmation()

function displayAffirmation(affirmation){
  affirmationDiv.textContent = affirmation;
}



