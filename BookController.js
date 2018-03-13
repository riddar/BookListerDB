window.addEventListener('load', function(event){

  let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";

  var div = document.getElementById("list")

  function GetAllBooks(event) {
      fetch(Endpoint)
          .then(response => {
              console.log('Response: ', response)
              return response.text()
          })
          .then(text => {
              console.log('text: ', text)
          })
  }

  function CreateBook(event) {
    fetch(Endpoint)
      .then(response => {

      })
  }

  function TestFetch(event){
    console.log("test")
    fetch(Endpoint)
      .then(function(response) {
        console.log('Response: ', response)
        return response.json()
      })
      .then(function(response){
        console.log('Response: ', response)
        return response.text();
      })
      .then(function(text) { 
        console.log('text: ', text)
        return text.text()
      })
      .catch(function(message){
        console.log('Error: ', message)
        return text.text()
      })   
  }

  var ajaxBtn = document.getElementById('CreateBtn').addEventListener('click', TestFetch)
  div.innerText = ajaxBtn;
})