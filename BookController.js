window.addEventListener('load', function(event){
  var div = document.getElementById("list")
  var textbar = document.getElementById("textbar")

  var Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?";

  var key;
  FetchKey();

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
          key = text.key
          console.log('key:', key)
        }
      })
      .catch(function(message){
        console.log('Error:', message)
      })
  }

  function CreateBook(event) {
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var i = 0;

    if(title.length > 0 && author.length > 0){
      do{
        i++;
        fetch(Endpoint+"op=insert"+"&key="+key+"&title="+title+"&author="+author)
        .then(function(response){
          console.log(response.status)
          if(response.status != 200){
            return;
          }
          return response.json();
        })
        .then(function(text){
          if(text.status == 'success'){
            console.log('CreateBook: ', text)
            GetAllBooks();
            return text;
          }
        })
        .catch(function(message){
          console.log(message.error)
        })
          GetAllBooks();
      }
      while(i <= 10 && text.status == 'success');
      document.getElementById('title').style.backgroundColor = "white";   
      document.getElementById('author').style.backgroundColor = "white";
    }
    else{
      document.getElementById('title').style.backgroundColor = "#f44242";   
      document.getElementById('author').style.backgroundColor = "#f44242";
    } 
  }

  function GetAllBooks(event) {
    var data = '';
    fetch(Endpoint + "op=select"+"&key="+key)
      .then(function(response){
        if(response.status != 200){
          return;
        }

        return response.json();
      })
      .then(function(text) { 
        if(text.status != "error"){
          console.log("GetAllBooks: ", text)
          if (text.data.length > 0) {
            for (i = 0; i < text.data.length; i++) {
              data += '<tr>';
              data += '<td>' + text.data[i].id + '</td>';
              data += '<td>' + text.data[i].title + '</td>';
              data += '<td>' + text.data[i].author + '</td>';
              data += '</tr>';
            }
          }
          return div.innerHTML = data;
        } 
      })
      .catch(function(message){
        console.log(message)
      })  
  }

  function UpdateBook(event){
    var id = document.getElementById('id').value
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var i = 0;
    if(title.length == 0 && author.length == 0){
      if(id.length > 0){
        do{
          i++;
          console.log(Endpoint+"op=update&"+key+"&id="+id+"&title="+title+"&author="+author);
          fetch(Endpoint+"op=update&"+key+"&id="+id+"&title="+title+"&author="+author)
            .then(function(response){
              if(response.status != 200){
                return;
              }
              return response.json();
            })
            .then(function(text){
              if(text.status === "success"){
                console.log("success")
                return;
              }
              else{
                console.log("failed")
              }
            })
            .catch(function(message){
              console.log(message)
            })
          }
          while(i <= 10);
          document.getElementById('id').style.backgroundColor = "white";
          document.getElementById('title').style.backgroundColor = "white";   
          document.getElementById('author').style.backgroundColor = "white";
      }
      else{
        document.getElementById('id').style.backgroundColor = "#f44242";
      }
    }
    else{
      document.getElementById('title').style.backgroundColor = '#f44242';   
      document.getElementById('author').style.backgroundColor = "#f44242";
    }
  }

  function DeleteBook(event){
    var id = document.getElementById('id').value
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var i = 0;

    if(title.length == 0 && author.length == 0){
      if(id.length > 0){
        do{
          GetAllBooks();
          i++;
          fetch(Endpoint+"op=delete"+"&key="+key+"&id="+id)
          .then(function(response){
              if(response.status != 200){
                return;
              }
              return response.json();
            })
          .then(function(text){
            if(text.status == "success"){
              console.log("success")
            }
            else{
              console.log("failed")
            }
          })
        }
        while(i <= 10);
        document.getElementById('id').style.backgroundColor = "white";
        document.getElementById('title').style.backgroundColor = "white";   
        document.getElementById('author').style.backgroundColor = "white";
      }
      else{
        document.getElementById('id').style.backgroundColor = "#f44242";
      }
    }
    else{
      document.getElementById('title').style.backgroundColor = '#f44242';   
      document.getElementById('author').style.backgroundColor = "#f44242";
    }
  }
  
  document.getElementById('CreateBtn').addEventListener('click', CreateBook)
  document.getElementById('ReadBtn').addEventListener('click', GetAllBooks)
  document.getElementById('UpdateBtn').addEventListener('click', UpdateBook)
  document.getElementById('DeleteBtn').addEventListener('click', DeleteBook)
})