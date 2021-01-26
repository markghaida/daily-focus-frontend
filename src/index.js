const textBox = document.querySelector('#userContent');
const journalEntries = document.querySelector('.div6');
const loginBtn = document.querySelector('#login');
const userArray = [];

/* GET ALL USERS */
getUsers();
// this function is causing a constant loop fetch request..cant test anything w/o fixing
function getUsers(){
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(renderUsername);
}

function renderUsername(usersArray) {
  usersArray.forEach(userObj => {
    // console.log(userObj.username)
    userArray.push(userObj.username);
    // console.log(userObj.name)
    // console.log(usersArray)
    })
  }
  
  /* LOGIN INFORMATION */
  
  loginBtn.addEventListener('submit', event => {
    event.preventDefault();
    
    const userInput = event.target.uname.value;
    
    if (userArray.includes(userInput)) {
      console.log('success');
      getJournals();
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
      .then(console.log);
  }
    
    /* GET JOURNALS FETCH REQUEST */
    
    function getJournals(){
      // console.log("inside of getJournals")
      //do we want to do a get request to Journal index or show?
      // the challenge with getting the show, is that we do not
      //have access to the id of that user when logging in.
      // a work around is if line 26 is true, then do a get request 
      // to the index, compare the user input with all the users,
      // find the correct user and their corresponding Id. 
      // this will allow us to then render the proper journals
      // for that particular user
      
      fetch('http://localhost:3000/journals')
      .then(response => response.json())
      .then(console.log);
      // .then(data => console.log(data));
    }
    
    
    /* GET JOURNALS FETCH REQUEST */
    
    function renderJournals(journals){
      console.log(journals)
      const ul = document.createElement("ul")
      journals.forEach(journalEntry => {
        const li = document.createElement("li")
        //may need and if condition to check the user id
        //and get the corresponding journals
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
      
    }
    
    /* EVENT LISTENER ON EACH JOURNAL ENTRY */
    
    function clickedEntry(e){
      e.preventDefault();
      
    }
    
    function populateJournalArea(){
      
    }
