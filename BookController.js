window.addEventListener('load', function(event){
  var div = document.getElementById("list")
  var Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?";

  var key;
  FetchKey();

  function FetchKey(){
    fetch(Endpoint + "requestKey")
      .then(function(response){
        if(response.status == 200){
          return response.json();
        }
        return;
      })
      .then(function(text) { 
        if(text.status != "error"){
          key = text.key;
          console.log('fetchkey: ', key)
        }
      })
      .catch(function(message){
        console.log('Error: ', message)
      })
  }

  function CreateBook(event) {
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    console.log(Endpoint + "op=insert&"+key+"&title="+title+"&author="+author);
    fetch(Endpoint + "op=insert&"+key+"&title="+title+"&author="+author)
      .then(function(response){
          if(response.status != 200){
            return;
          }
          return response.json();
      })
      .then(function(text){
        if(text.status === 'success'){
          console.log('GetAllBooks: ', text)
          div.innerHTML = text;
          return text;
        }
      })
      .catch(function(message){
        console.log(message)
      })
  }

  function GetAllBooks(event) {
    console.log(Endpoint + "op=select&" + key)
    fetch(Endpoint + "op=select&" + key)
      .then(function(response){
        if(response.status != 200){
          return;
        }

        return response.json();
      })
      .then(function(text) { 
        //if(text.status != "error"){
          console.log('GetAllBooks: ', text)
          div.innerHTML += text.data;
          return text;
        //} 
      })
      .catch(function(message){
        console.log(message)
      })  
  }

  function UpdateBook(event){
    fetch(Endpoint + "op=update&"+key+"&id="+id+"&title="+title+"&author="+author)
  }

  function DeleteBook(event){
    fetch(Endpoint + "op=delete&"+key+"&id="+id)
  }

  
  document.getElementById('CreateBtn').addEventListener('click', CreateBook)
  document.getElementById('ReadBtn').addEventListener('click', GetAllBooks)
  document.getElementById('UpdateBtn').addEventListener('click', UpdateBook)
  document.getElementById('DeleteBtn').addEventListener('click', DeleteBook)

})