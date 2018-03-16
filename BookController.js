window.addEventListener('load', function(event){

  let div = document.getElementById("list")
  let textbar = document.getElementById("textbar")
  let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?";
  var counter = 1;

  let key;
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
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let count = 0;
    if(title.length > 0 && author.length > 0){
      if(count == 0){
          CreateData();
          document.getElementById('textbar').innerHTML = "success on try: " + counter;
          counter = 1;
      }
      else{
        return count;
      }
      GetAllBooks();
      document.getElementById('id').style.backgroundColor = "white";   
      document.getElementById('title').style.backgroundColor = "white";   
      document.getElementById('author').style.backgroundColor = "white";
    }
    else{
      document.getElementById('title').style.backgroundColor = "#f44242";   
      document.getElementById('author').style.backgroundColor = "#f44242";
    } 
  }

  function CreateData(event){
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let valid = false;
    
    fetch(Endpoint+"op=insert"+"&key="+key+"&title="+title+"&author="+author)
        .then(function(response){
          if(response.status == 200){
            return response.json();
          }
          return;
        })
        .then(function(text){
          if(text.status == 'success'){
            console.log('CreateBook: ', text)
            valid = true;
          }
          else if(text.status == 'error'){ 
            if(counter >= 10){
              return;
            }
            else{
              counter++;
              CreateData();
            }
          }
        })
        .catch(function(message){
          console.log(message.error)
        })


    if(valid == true){
      return counter;
    }
  }

  function GetAllBooks(event) {
     let i = 0;
     let valid = false;
     let query = null;
     do{
      i++;
      if(valid == false){
        query = GetAllData();     
      }
      if(query != null){
          valid = true;
        }
     }
     while(i <= 9);
  }

  function GetAllData(event){
     let data = '';
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
        }

        div.innerHTML = data;
      })
      .catch(function(message){
        console.log(message)
      })
      
      return data;
  }

  function UpdateBook(event){
    let id = document.getElementById('id').value
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    if(title.length > 0 && author.length > 0){
      if(id.length > 0){
          UpdateData();
          document.getElementById('textbar').innerHTML = "success on try: " + counter;
          counter = 1;
          GetAllBooks();
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

  function UpdateData(event){
    let id = document.getElementById('id').value
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let valid = false;
    fetch(Endpoint+"op=update"+"&key="+key+"&id="+id+"&title="+title+"&author="+author)
      .then(function(response){
        if(response.status != 200){
          return;
        }
        return response.json();
      })
      .then(function(text){
        if(text.status == 'success'){
          console.log('UpdateBook: ', text)
          valid = true;
        }
        else if(text.status == 'error'){ 
          if(counter >= 10){
            return;
          }
          else{
            counter++;
            UpdateData();
          }
        }
      })
      .catch(function(message){
        console.log(message.error)
      })

      if(valid == true){
        return counter;
      }
  }

  function DeleteBook(event){
    let id = document.getElementById('id').value
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value

    if(title.length == 0 && author.length == 0){
      if(id.length > 0){
        DeleteData();
        document.getElementById('textbar').innerHTML = "success on try: " + counter;
        counter = 1;
        GetAllBooks();
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

  function DeleteData(event){
    let id = document.getElementById('id').value
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    valid = false;
    fetch(Endpoint+"op=delete"+"&key="+key+"&id="+id)
      .then(function(response){
          if(response.status != 200){
            return;
          }
          return response.json();
      })
      .then(function(text){
        if(text.status == 'success'){
          console.log('DeleteBook: ', text)
          valid = true;
        }
        else if(text.status == 'error'){ 
          if(counter >= 10){
            return;
          }
          else{
            counter++;
            DeleteData();
          }
        }
      })
      .catch(function(message){
        console.log(message.error)
      })

      if(valid == true){
        return counter;
      }
    
  }
  
  document.getElementById('CreateBtn').addEventListener('click', CreateBook)
  document.getElementById('ReadBtn').addEventListener('click', GetAllBooks)
  document.getElementById('UpdateBtn').addEventListener('click', UpdateBook)
  document.getElementById('DeleteBtn').addEventListener('click', DeleteBook)
})

function ChangeDivsCreateRow()
{   
    document.getElementById('id').value = ''
    document.getElementById('author').value = ''
    document.getElementById('title').value = ''
    
    document.getElementById('id').style.backgroundColor = "white";
    document.getElementById('title').style.backgroundColor = "white";   
    document.getElementById('author').style.backgroundColor = "white";
    
    document.getElementById("row-menu").style.visibility = "hidden";
    document.getElementById("row2").style.visibility = "hidden";
    document.getElementById("row3").style.visibility = "visible";
    document.getElementById("row4").style.visibility = "visible";
    
    document.getElementById("CreateBtn").style.visibility = "visible";
    document.getElementById("UpdateBtn").style.visibility = "hidden";
    document.getElementById("DeleteBtn").style.visibility = "hidden";
        
    document.getElementById("ReadBtn").style.order = "1";
    document.getElementById("b2").style.order = "2";
    document.getElementById("row-menu").style.order = "3";
    document.getElementById("b3").style.order = "4";
    document.getElementById("b4").style.order = "5";
}
function ChangeDivsChangeRow()
{
    document.getElementById('id').value = ''
    document.getElementById('author').value = ''
    document.getElementById('title').value = ''
    
    document.getElementById('id').style.backgroundColor = "white";
    document.getElementById('title').style.backgroundColor = "white";   
    document.getElementById('author').style.backgroundColor = "white";
    
    document.getElementById("row-menu").style.visibility = "visible";
    document.getElementById("row2").style.visibility = "visible";
    document.getElementById("row3").style.visibility = "visible";
    document.getElementById("row4").style.visibility = "visible";
    
    document.getElementById("CreateBtn").style.visibility = "hidden";
    document.getElementById("UpdateBtn").style.visibility = "visible";
    document.getElementById("DeleteBtn").style.visibility = "hidden";
    
    
    document.getElementById("ReadBtn").style.order = "1";
    document.getElementById("b2").style.order = "2";
    document.getElementById("b3").style.order = "3";
    document.getElementById("row-menu").style.order = "4";
    document.getElementById("b4").style.order = "5";
}
function ChangeDivsRemoveRow()
{   
    document.getElementById('id').value = ''
    document.getElementById('author').value = ''
    document.getElementById('title').value = ''
    
    document.getElementById('id').style.backgroundColor = "white";
    document.getElementById('title').style.backgroundColor = "white";   
    document.getElementById('author').style.backgroundColor = "white";
    
    document.getElementById("row-menu").style.visibility = "visible";
    document.getElementById("row2").style.visibility = "visible";
    document.getElementById("row3").style.visibility = "hidden";
    document.getElementById("row4").style.visibility = "hidden";
    
    document.getElementById("CreateBtn").style.visibility = "hidden";
    document.getElementById("UpdateBtn").style.visibility = "hidden";
    document.getElementById("DeleteBtn").style.visibility = "visible";
    
    
    document.getElementById("ReadBtn").style.order = "1";   
    document.getElementById("b2").style.order = "2";
    document.getElementById("b3").style.order = "3";
    document.getElementById("b4").style.order = "4";
    document.getElementById("row-menu").style.order = "5";
}
