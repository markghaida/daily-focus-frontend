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
const emotionButton = document.querySelector('#emotion');
const deleteJournalBtn = document.querySelector('#delete-btn');
const navBar = document.querySelector('.nav-bar');
const journalForm = document.querySelector('#journalForm');

let lastClickedElement;
let currentDay;
submitBtn.disabled = true;

journalEntries.style.display = "none";
createEntryBtn.style.display = "none";
navBar.style.display = "none";
journalForm.style.display = "none";

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
  const userInput = event.target.uname.value;
  renderUser(userInput);
});

function renderUser(userInput) {
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  })
    .then(response => response.json())
    .then(processUser)
};

function processUser(user) {
  getJournals(user.id);
  journalEntries.dataset.id = user.id;
  loginForm.style.display = "none";
  journalEntries.dataset.id = user.id;
  hiddenId.dataset.id = user.id
  journalEntries.style.display = "initial";
  createEntryBtn.style.display = "initial";
  navBar.style.display = "initial";
  deleteUser(user.id);
}

function getJournals(id) {
  fetch(`http://localhost:3000/users/${id}`)
  .then(response => response.json())
  .then(data =>
    renderJournals(data));
  };
  
  function renderJournals(journalData) {
    journalForm.style.display = "initial";
    const allJournals = journalData.journals
    // console.log(allJournals)
    
    
      const div = document.createElement("div")
      div.id = "div6-inner-div"
      const headerDiv = document.createElement("div")
      headerDiv.id = "header-div6"
    
      const stickyHeader = document.createElement("ul")
      stickyHeader.textContent = "Past Journal Entries"
      stickyHeader.id = "sticky"
      
      allJournals.forEach(journalEntry => {
        
        // CREATING LI & OTHER TAGS 
        const innerUl = document.createElement("ul")
        const dateLi = document.createElement("li");
        const entryLi = document.createElement("li");
        const affirmationLi = document.createElement("li");
        const feelingLi = document.createElement("li");
        const br = document.createElement("br")
        const entryPreview = journalEntry.journal_entry.substr(0, 20) + "..."
        // const affirmationPreview = journalEntry.affirmation.substr(0, 25) + "..."
        console.log(journalEntry.created_at)
        const currentDate = new Date(`${journalEntry.created_at}`)
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        const dateString = ("0" + (currentMonth + 1)) + "-" + currentDayOfMonth + "-" + currentYear;
        
        const img = document.createElement("img")
        const hr = document.createElement("hr")
        console.log(dateString)
        //APPENDING ITEMS TO CORRESPONDING LI
        
        img.src = 'https://cdn.iconscout.com/icon/free/png-256/diary-1835758-1556317.png'
        img.id = "journal-image"
        dateLi.textContent = `Date: ${dateString}`
        dateLi.id = "date-li"
        // entryLi.textContent = `Entry: ${entryPreview}`
        entryLi.id = "entry-li"
        entryLi.alt = journalEntry.journal_entry
        // affirmationLi.textContent = `Affirmation: ${affirmationPreview}`
        // affirmationLi.id = "affirmation-li"
        // affirmationLi.alt = journalEntry.affirmation
        // affirmationLi.style.visibility = "hidden";
        feelingLi.textContent = `Feeling: ${journalEntry.feeling}`
        feelingLi.id = "feeling-li"
        
        //FINAL APPENDING 
        innerUl.alt = journalEntry.affirmation
        innerUl.id = journalEntry.id;
        innerUl.append(img, dateLi, entryLi, feelingLi, hr);
        div.prepend(innerUl);
        div.prepend(br);
        journalEntries.append(div);
        
        // ADDING EVENT LISTENER TO EACH INNER UL
        
        innerUl.addEventListener("click", selectedEntry)
      })
      
      // headerDiv.prepend(stickyHeader)
      div.prepend(stickyHeader)
    };
    
    /* EVENT LISTENER ON EACH JOURNAL ENTRY */
    
    function selectedEntry(e) {
      e.preventDefault();
      lastClickedElement = e.target.parentNode;
      console.log(lastClickedElement);
      const date = e.target.parentNode.children[1].textContent
      const entry = e.target.parentNode.children[2].alt
      const affirmation = e.target.parentNode.alt
      const feeling = e.target.parentNode.children[3].textContent

      entryInput.readOnly = true;
      entryInput.value = entry;

  // const editBtn = document.querySelector("#edit-btn")

  // editBtn.addEventListener("click", function (e) {

  //   //why is it that I can edit the first entry I click on, but not any after?

  //   if (entryInput.readOnly === !false) {
  //     console.log(e)
  //     entryInput.readOnly = false;
  //     editBtn.textContent = "Disable Edit"
  //     submitBtn.value = "Update"

  //   } else {

  //     entryInput.readOnly = true;
  //     editBtn.textContent = "Edit Entry"
  //     submitBtn.value = "Submit"
  //   }
  // })

  affirmationDiv.textContent = affirmation;
};

/* DELETE USER ACCOUNT */

function deleteUser(userId) {
  const deleteBtn = document.createElement('button');
  deleteBtn.className = "delete-user-btn"
  deleteBtn.textContent = "DELETE YOUR ACCOUNT";
  deleteBtn.dataset.id = userId;
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


function displayAffirmation(affirmation) {
  affirmationDiv.textContent = affirmation;
};


/* EVENT LISTENER ON SUBMIT ENTRY FORM */

let emojiValue;

emotionButton.addEventListener('click', event => {
  emojiValue = event.target.id;
});

  entryForm.addEventListener("submit", function (e) {
    e.preventDefault()

    newJournalObj = {
      user_id: hiddenId.dataset.id,
      affirmation: affirmationDiv.textContent,
      journal_entry: entryInput.value,
      feeling: emojiValue
    }

    fetch('http://localhost:3000/journals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJournalObj),
    })
      .then(response => response.json())
      .then(data => {
        journalEntries.innerHTML = "";
        getJournals(data.user_id);
      })
  });


/* CREATE A NEW JOURNAL ENTRY*/

createEntryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  submitBtn.disabled = false;
  entryInput.value = "Create a Journal Entry";
  journalForm.style.display = "initial";
  fetchAffirmation();
})

/* DELETE JOURNAL ENTRY */

deleteJournalBtn.addEventListener('click', event => {
  console.log('success');
  console.log(lastClickedElement.id)
  deleteJournalEntry(lastClickedElement.id);
  lastClickedElement.remove();
})

function deleteJournalEntry(id){
  fetch(`http://localhost:3000/journals/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log('success');
}