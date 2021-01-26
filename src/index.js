const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginForm = document.querySelector('#login');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const affirmationDiv = document.querySelector('.div5');
const dateBox = document.querySelector('.div10');
const topNav = document.querySelector('.div11');

const userArray = [];
const newUserArray = [];
let currentUserId; 
let currentDay;

dayOfTheWeek();
/* TODAY'S DATE */

let today = new Date().toLocaleDateString();

function dayOfTheWeek() {
  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  currentDay = weekday[d.getDay()];
}

dateBox.textContent = `Today is ${currentDay}, ${today}.`;

/* GET ALL USERS */
getUsers();
// this function is causing a constant loop fetch request..cant test anything w/o fixing
function getUsers(){
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(renderUsername)
};


function renderUsername(names) {
  names.forEach(name => {
    let allUserObj = {
      username: name.username,
      id: name.id
    }
    userArray.push(allUserObj);
  })

  names.forEach(name => {
    newUserArray.push(name.username)
  })
  console.log(newUserArray);
};

/* LOGIN INFORMATION */

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const userInput = event.target.uname.value;
  // console.log(userArray)
    if (newUserArray.includes(userInput)) {
      console.log(currentUserId);
      loginForm.style.display = "none";
      getJournals(1);
    } else{
      console.log("else")
      //   const newUserObj = {
    //     username: userInput,
    //     name: userInput
    //   }
    //   createUser(newUserObj);
    }
  })
  // event.target.reset();;

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

/* GET JOURNALS FROM USER */

function getJournals(id){
  fetch(`http://localhost:3000/users/${id}`)
  .then(response => response.json())
  .then(data => console.log(data.journals[0].affirmation));
};

function renderJournals(journals){
  console.log(journals)
  const ul = document.createElement("ul")
  journals.forEach(journalEntry => {
    const li = document.createElement("li")
    const journalObj = {
      date: journalEntry.created_at,
      entry: journalEntry.journal_entry,
      affirmation: journalEntry.affirmation,
      feeling: journalEntry.feeling
    }
    // console.log(journalObj["Date"])
    li.append(journalObj.entry)  
    li.id = journalEntry.id
    ul.append(li)
    journalEntries.append(ul);
    li.addEventListener("click", clickedEntry)
  })
  
};

/* EVENT LISTENER ON EACH JOURNAL ENTRY */

function clickedEntry(e){
  e.preventDefault();
};

function populateJournalArea(){
};


/* DELETE USER ACCOUNT */

function deleteUser(userId) {
  // console.log('check');
  const deleteBtn = document.createElement('button');
  deleteBtn.className = "delete-user-btn"
  deleteBtn.textContent = "DELETE YOUR ACCOUNT";
  deleteBtn.dataset.id = userId.id;
  currentUserId = userId.id;
  getJournals(currentUserId);
  topNav.append(deleteBtn);

  const userDeleteBtn = document.querySelector('.delete-user-btn');
  userClickDelete(userDeleteBtn);
};

function userClickDelete(userDeleteBtn) {
  userDeleteBtn.addEventListener('click', event => {
    console.log(event.target.dataset.id);
    deleteUserFetch(event.target.dataset.id);
  })
};

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
};
