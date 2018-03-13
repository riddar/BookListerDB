window.addEventListener('load', function(event){

  let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?";

  var div = document.getElementById("list")

  function CreateBooks(event) {

  }

  function GetAllBooks(event) {
    var key = ("key: ", FetchKey);
    console.log(FetchKey)
    fetch(Endpoint + "op=select&" + FetchKey)
      .then(function(response){
        console.log('Response: ', response.status)
        if(response.status == 200){
          return response.text();
        }
        return;
      })
      .then(function(text) { 
        console.log('text: ', text)
        div.innerHTML = text;
        return text;
      })
      .catch(function(message){
        console.log('Error: ', message)
      })  
  }

  function UpdateBook(event){

  }

  function DeleteBook(event){

  }

  function FetchKey(event){
    fetch(Endpoint + "requestKey")
      .then(function(response){
        if(response.status == 200){
          return response.json();
        }
        return;
      })
      .then(function(text) { 
        if(text.status != "error"){
          console.log('text: ', text.key)
          div.innerHTML = text;
          return text;
        }
        else{
          console.log()
        }
        
      })
      .catch(function(message){
        console.log('Error: ', message)
      })
  }

  
  document.getElementById('CreateBtn').addEventListener('click', GetAllBooks)
  document.getElementById('ReadBtn').addEventListener('click', FetchKey)
  //document.getElementByClass('UpdateBtn').addEventListener('click', UpdateBook)
  //document.getElementByClass('DeleteBtn').addEventListener('click', DeleteBook)

})