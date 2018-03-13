window.addEventListener('load', function(event){

  let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";

  var div = document.getElementById("list")

  function CreateBook(event) {
    fetch(Endpoint, )
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

  function TestFetch(event){
    fetch(Endpoint)
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

  var query = document.getElementById('CreateBtn').addEventListener('click', TestFetch)
  if(query != null){
    div.innerHTML += query;
  }
  
  

})