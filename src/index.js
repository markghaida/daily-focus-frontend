const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginForm = document.querySelector('#login');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const affirmationDiv = document.querySelector('.div5');
const dateBox = document.querySelector('.div10');
const topNav = document.querySelector('.div11');
const submitBtn = document.querySelector("#submit-entry-button")
const hiddenId = document.querySelector("#user-id-hidden")
const entryInput = document.querySelector("#w3review")
const entryForm = document.querySelector("form")
const createEntryBtn = document.querySelector("#create-entry")
let currentDay;
submitBtn.disabled = true;

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

/* LOGIN INFORMATION */

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  // console.log("hello")
  //creates post request to create
  //returns a single user with all their data 

  const userInput = event.target.uname.value;
  renderUser(userInput);
  // console.log(userInput)
  function renderUser(userInput){
    fetch('http://localhost:3000/users', {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
    })
    .then(response => response.json())
    .then(data => {
      // newCurrentUserId.push(data.id);
      journalEntries.dataset.id = data.id;
      getJournals(data.id);
      hiddenId.dataset.id = data.id 
    })
    // console.log(newCurrentUserId);
      }
});

/* GET JOURNALS FROM USER */

function getJournals(id){
  fetch(`http://localhost:3000/users/${id}`)
  .then(response => response.json())
  .then(data => {
    // console.log(data.journals[0].affirmation)
    renderJournals(data)});
    // console.log(data)});
  };

function renderJournals(journalData){
  const allJournals = journalData.journals
  const ul = document.createElement("div")
  allJournals.forEach(journalEntry => {

    // CREATING LI & OTHER TAGS 
    const innerUl = document.createElement("ul")
    const dateLi = document.createElement("li");
    const entryLi = document.createElement("li");
    const affirmationLi = document.createElement("li");
    const feelingLi = document.createElement("li");
    const br = document.createElement("br")
    const entryPreview = journalEntry.journal_entry.substr(0,25) + "..."
    const affirmationPreview = journalEntry.affirmation.substr(0,25) + "..."

    //APPENDING ITEMS TO CORRESPONDING LI
    dateLi.textContent = `Date: ${journalEntry.created_at}`
    dateLi.id = "date-li"
    entryLi.textContent =  `Journal Entry: ${entryPreview}`
    entryLi.id = "entry-li"
    entryLi.alt = journalEntry.journal_entry
    affirmationLi.textContent = `Affirmation: ${affirmationPreview}`
    affirmationLi.id = "affirmation-li"
    affirmationLi.alt = journalEntry.affirmation
    feelingLi.textContent = `Feeling: ${journalEntry.feeling}`
    feelingLi.id = "feeling-li"

    //FINAL APPENDING 
    innerUl.id = journalEntry.id;
    innerUl.append(dateLi, entryLi, affirmationLi, feelingLi);
    ul.append(innerUl);
    ul.append(br);
    journalEntries.append(ul);

    // ADDING EVENT LISTENER TO EACH INNER UL
    innerUl.addEventListener("click", selectedEntry)
  })
};


/* EVENT LISTENER ON EACH JOURNAL ENTRY */

function selectedEntry(e){
  e.preventDefault();
  console.log(e.target.parentNode.children);
  const date = e.target.parentNode.children[0].textContent
  const entry = e.target.parentNode.children[1].alt
  const affirmation = e.target.parentNode.children[2].alt
  const feeling = e.target.parentNode.children[3].textContent
  
  entryInput.readOnly = true; 
  entryInput.value = entry;
  
  const editBtn = document.querySelector("#edit-btn")
  
  editBtn.addEventListener("click", function(e){  
    
//why is it that I can edit the first entry I click on, but not any after?
    if(entryInput.readOnly === !false){
      console.log(e)
      entryInput.readOnly = false; 
      editBtn.textContent = "Disable Edit"
      submitBtn.value = "Update"
      
    }else{
      
      entryInput.readOnly = true; 
      editBtn.textContent = "Edit Entry"
      submitBtn.value = "Submit"
    }
  })

  affirmationDiv.textContent = affirmation;
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


/* EVENT LISTENER ON SUBMIT ENTRY FORM */
entryForm.addEventListener("submit", function(e){
  e.preventDefault()
  
  newJournalObj = {
    user_id: hiddenId.dataset.id,
    affirmation: affirmationDiv.textContent,
    journal_entry: entryInput.value,
    feeling: "happy"
  }
  
  fetch('http://localhost:3000/journals',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newJournalObj),
  })
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  
  })



/* CREATE A NEW JOURNAL ENTRY*/

createEntryBtn.addEventListener("click",function(e){
  e.preventDefault();  
  submitBtn.disabled = false;
  entryInput.value = "Create a Journal Entry";
  fetchAffirmation();
})