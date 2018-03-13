let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
var bookArray = new Array();

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
	fetch(Endpoint)
  	.then(function(response) {
    	return response.json()
    })
  	.then(function(text) { 
  		return text.json()
  	})
  	.catch(function(message){ 
  		return message.json()
  	})
}


//ajaxBtn.addEventListener('click', TestFetch)
var div = document.getElementById("list");
div.innerText += 'test';