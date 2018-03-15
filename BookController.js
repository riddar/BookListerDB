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
    var i = 0;
    var valid = false;
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    if(title.length > 0 && author.length > 0){
      do{
        i++;
          if(valid == false){
              valid = CreateData();
          }
          GetAllBooks();
      }


      while(i <= 10 || valid == true);
      document.getElementById('title').style.backgroundColor = "white";   
      document.getElementById('author').style.backgroundColor = "white";
    }
    else{
      document.getElementById('title').style.backgroundColor = "#f44242";   
      document.getElementById('author').style.backgroundColor = "#f44242";
    } 
  }

  function CreateData(event){
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    fetch(Endpoint+"op=insert"+"&key="+key+"&title="+title+"&author="+author)
        .then(function(response){
          console.log(response.status)
          if(response.status == 200){
            return response.json();
          }
          return;
        })
        .then(function(text){
          if(text.status == 'success'){
            console.log('CreateBook: ', text)
            return true;
          }
          else{
            return false;
          }
        })
        .catch(function(message){
          console.log(message.error)
        })
  }

  function GetAllBooks(event) {
     var i = 0;
     var valid = false;
     var query = null;
     do{
      i++;
      if(valid == false){
        query = GetAllData();     
      }
      if(query != null){
          valid = true;
        }
     }
     while(i <= 10 || valid == true);
  }

  function GetAllData(event){
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
    var valid = false;
    if(title.length > 0 && author.length > 0){
      if(id.length > 0){
        do{
          i++;
          if(valid == false){
              valid = UpdateData();
            }
          }
          while(i <= 10 || valid == true);
          document.getElementById('id').style.backgroundColor = "white";
          document.getElementById('title').style.backgroundColor = "white";   
          document.getElementById('author').style.backgroundColor = "white";
          GetAllBooks();
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

  function UpdateData(event){
    var id = document.getElementById('id').value
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    fetch(Endpoint+"op=update"+"&key="+key+"&id="+id+"&title="+title+"&author="+author)
      .then(function(response){
        if(response.status != 200){
          return;
        }
        return response.json();
      })
      .then(function(text){
        if(text.status == "success"){
          console.log("success")
          return true;
        }
        else{
          console.log("failed")
          return false;
        }
      })
      .catch(function(message){
        console.log(message)
      })
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