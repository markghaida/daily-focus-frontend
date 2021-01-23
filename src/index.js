const textBox = document.querySelector('#userContent');

fetch('')
  .then(response => response.json())
  .then(data => console.log(data));