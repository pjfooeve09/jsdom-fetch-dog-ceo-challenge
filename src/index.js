
console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function () {
    fetchImages();
    fetchBreeds();
})

var breedNames = []

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => renderImages(json));
}
 

function renderImages(json) { 
    const main = document.getElementById('dog-image-container')
    for (const element of json.message) {
        const image = document.createElement('img') 
        image.src = element
        main.appendChild(image)
    }
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    return fetch(breedUrl)
      .then(resp => resp.json())
      .then(json => {
        for (const key in json.message) {
            breedNames.push(key);
        }
        breedName(breedNames);
    });
}

function breedName(breedNames){
    const breeds = document.getElementById('dog-breeds');
    for (const breedName of breedNames) {
        const breedLi = document.createElement('li');
        breedLi.innerHTML = breedName;
        breeds.appendChild(breedLi);
    }
    changeColor()
    selectBreeds()
}

function changeColor(){
    const listItems = document.getElementsByTagName('li');
    for (const li of listItems){
        li.addEventListener('click', function(){
            li.style.color = 'blue'});
        }
}

function selectBreeds (){
    subBreeds = document.getElementById('breed-dropdown');
    subBreeds.addEventListener('change', function(){
        newSubBreedsValue = subBreeds.value;
        editBreeds(newSubBreedsValue)
    })
}

function editBreeds(newSubBreedsValue){
    emptyList = document.getElementById('dog-breeds')
    while (emptyList.hasChildNodes()) {  
        emptyList.removeChild(emptyList.firstChild);
      }
    breedSubset = breedNames.filter(breedname => breedname.charAt(0) == newSubBreedsValue)
    breedName(breedSubset);
    
}