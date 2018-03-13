let Endpoint = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";

function GetAllBooks(event) {
    fetch(Endpoint)
        .then(response => {
            console.log('Response: ', response);
            return response.text()
        })
        .then(text => {
            console.log('text: ', text);
        })
}