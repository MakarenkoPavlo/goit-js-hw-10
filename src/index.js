import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';


fetchBreeds().then(createBreedsList);

const selectEl = document.querySelector(".breed-select");
selectEl.addEventListener("change", selectElHandler);
const loaderEl = document.querySelector(".loader");

const catInfoDiv = document.querySelector(".cat-info");

function createBreedsList(data){
    const result = data.map(({id, name}) => {        
            // const option = document.createElement("option");
            // option.textContent = name;
            // option.value = id;
            // return option;
            return {text: name, value: id};
        });
        // selectEl.append(...result);
        const emptyObj = {text: " ", value: " "};
        
        result.unshift(emptyObj);

        new SlimSelect({
            select: '.breed-select',
            data: result,
            settings: {
                allowDeselect: true
              }
          })

    }

function selectElHandler(event){
    loaderEl.classList.remove("visually-hidden");
    const breedId = selectEl.value;
    
    if (breedId === " ") {
        setTimeout(hideLoader, 2500);
        return breedId;
    }
    fetchCatByBreed(breedId).then(data => {
        const catImgURL = data[0].url;
        const catBreedInfo = data[0].breeds[0];
        // console.log(data[0]);
    const catInfoCode = `
    <div class="cat-info-box">
    <img id="photo" class="breed-img" src="${catImgURL}" width="350" loading="lazy" >
    <div class="cat-text-box"> 
    <h1 class="breed-name">${catBreedInfo.name}</h1>
    <p class="breed-description">${catBreedInfo.description}</p>
    <h2>Temperament:</h2>
    <p class="breed-temperament"> ${catBreedInfo.temperament}</p></div>
    </div>
    `;
    catInfoDiv.innerHTML = catInfoCode;
    }).catch(error => {
        console.log(error);
        const e = error;
        Notiflix.Notify.failure(`Error: ${e}`);
    });
    setTimeout(hideLoader, 2500);
}

// window.onload = (event) => {
//     loaderEl.classList.add("visually-hidden");
//   };
// const catEl = document.getElementById("photo");
// console.dir(catEl);
// console.log(catEl.loading);
// catEl.onload = console.log("load");
// setInterval(()=>console.log(catEl.complite), 250) ;

// window.addEventListener("load", event => {
//     var image = document.querySelector('img');
//     var isLoadedSuccessfully = image.complete && image.naturalWidth !== 0;
//     alert(isLoadedSuccessfully);
// });

function hideLoader(){
    loaderEl.classList.add("visually-hidden");
}