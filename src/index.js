import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const catInfoDiv = document.querySelector(".cat-info");

selectEl.classList.add("visually-hidden");
loaderEl.classList.remove("visually-hidden");

fetchBreeds().then(createBreedsList);


function createBreedsList(data) {
    const result = data.map(({ id, name }) => {
        return { text: name, value: id };
    });

    const emptyObj = { text: " ", value: " " };

    result.unshift(emptyObj);

    new SlimSelect({
        select: '.breed-select',
        data: result,
        settings: {
            allowDeselect: true
        }
    });

    selectEl.classList.remove("visually-hidden");
    loaderEl.classList.add("visually-hidden");
}

function selectElHandler(event) {
    const breedId = selectEl.value;

    if (breedId === " ") {
        setTimeout(hideLoader, 2500);
        return breedId;
    }

    loaderEl.classList.remove("visually-hidden");

    fetchCatByBreed(breedId)
        .then(data => {
            const catImgURL = data[0].url;
            const catBreedInfo = data[0].breeds[0];
            const catInfoCode = `
                <div class="cat-info-box">
                    <img id="photo" class="breed-img" src="${catImgURL}" width="350" loading="lazy">
                    <div class="cat-text-box"> 
                        <h1 class="breed-name">${catBreedInfo.name}</h1>
                        <p class="breed-description">${catBreedInfo.description}</p>
                        <h2>Temperament:</h2>
                        <p class="breed-temperament">${catBreedInfo.temperament}</p>
                    </div>
                </div>
            `;
            catInfoDiv.innerHTML = catInfoCode;

            hideLoader();
        })
        .catch(error => {
            console.log(error);
            const e = error;
            Notiflix.Notify.failure(`Error: ${e}`);

            hideLoader();
        });
}

function hideLoader() {
    loaderEl.classList.add("visually-hidden");
}

selectEl.addEventListener("change", selectElHandler);