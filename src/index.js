const textBox = document.querySelector('#userContent');

const journalEntries = document.querySelector('.div6')

fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(renderUsername);


  function renderUsername(names) {
    names.forEach(name => {
      journalEntries.textContent = name.username;
    })
  }

