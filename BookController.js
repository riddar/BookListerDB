window.addEventListener('load', function(event){

  var Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?";
  var key;
  var div = document.getElementById("list")



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
          key = text.key;
          console.log('fetchkey: ', key)
          return text.key;
        }
      })
      .catch(function(message){
        console.log('Error: ', message)
      })
  }

  function GetAllBooks(event) {
    FetchKey();
    console.log(Endpoint + "op=select&" + key);
    fetch(Endpoint + "op=select&" + key)
      .then(function(response){
        if(response.status != 200){
          return;
        }

        response.json();
      })
      .then(function(text) { 
        console.log('GetAllBooks: ', text)
        div.innerHTML = key;
        div.innerHTML += text.json();
        return text;
      })
      .catch(function(message){
        console.log(message)
      })  
  }

  function CreateBook(event) {
    FetchKey();
    fetch(Endpoint + "op=insert&"+key+"&"+title+"&"+author)
  }

  function UpdateBook(event){
    FetchKey();
    fetch(Endpoint + "op=update&"+key+"&"+id+"&"+title+"&"+author)
  }

  function DeleteBook(event){
    FetchKey();
    fetch(Endpoint + "op=delete&"+key+"&"+id)
  }

  
  document.getElementById('CreateBtn').addEventListener('click', CreateBook)
  document.getElementById('ReadBtn').addEventListener('click', GetAllBooks)
  document.getElementById('UpdateBtn').addEventListener('click', UpdateBook)
  document.getElementById('DeleteBtn').addEventListener('click', DeleteBook)

})