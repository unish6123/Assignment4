// Selecting elements
const resultDiv = document.getElementById('results');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    let searched_breed = searchBox.value.trim().toLowerCase();
   

    
    // resultDiv.innerHTML = "";
    if (searched_breed.length < 1){
      fetch(`http://localhost:2000/breeds`)
      .then (res=>{
        if(!res.ok){
          throw new Error("Unable to fetch images.")
        }
        return res.json()
      })
      .then(data =>{
        console.log(data)
        displayImage(data.imageUrl);
      })
      .catch(error =>{
        displayErrorMessage(error.message)
      })
    }
    else{

      fetch(`http://localhost:2000/image/${searched_breed}`)
        .then(res => {
          if (!res.ok) {  
            throw new Error("The breed not found");  
          }
          return res.json();
        })
        .then(data => {
          console.log(data)
        
          displayImage(data.imageUrl);  
        })
        .catch(error => {
          displayErrorMessage(error.message);  
        });
    }


      

    
    searchBox.value = "";
});

// Function to display images
function displayImage(images) {
    resultDiv.innerHTML = "";  

    const img = document.createElement('img');
    img.classList.add('dog-image');
    img.src = images;
    resultDiv.appendChild(img);



}


function displayErrorMessage(message) {
    resultDiv.innerHTML = `<p class="error-message">${message}</p>`;  // Showing error instead of image
}
