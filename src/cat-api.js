const API_URL = "https://api.thecatapi.com/v1/";
const API_KEY = "live_5YP6rjv28UVqmyLmTkPzHdr09dR9MoYcVbJ8XlJPndNDs0drQqIEVhmjacrIjura";

const API_HEADERS = new Headers({
    'Content-Type': 'application/json',
    'x-api-key' : API_KEY,
});



export function fetchBreeds(){
    //    return fetch(`${API_URL}breeds`,{API_HEADERS})
       return fetch(`${API_URL}breeds`,{method:"GET", headers:API_HEADERS})
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
           return response.json()})
        .then(res => {
           return res.map(obj => ({
                id: obj.id,
                name: obj.name
            }))
        })
        .catch(e =>console.log(e)); 
    }

    export function fetchCatByBreed(breedId){
        // console.log(breedId);
        return fetch(`${API_URL}images/search?breed_ids=${breedId}`, {method:"GET",headers:API_HEADERS}).then(req => 
            {if(!req.ok){
                throw new Error(req.error);
            }
            return req.json();
        })
    }
