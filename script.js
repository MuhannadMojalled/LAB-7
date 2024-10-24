const APP_ID = "668239";
const ACCESS_KEY = "7yTUtoMZCx0Ww9VtCSh7t1xKo9CJK4P02XBAcHqbZnA";

const xhrBtn = document.getElementById("xhr");
xhrBtn.addEventListener("click", searchUsingXHR);
const awaitBtn = document.getElementById("await");
awaitBtn.addEventListener("click", searchUsingFetchAwait);
const promiseBtn = document.getElementById("promise");
promiseBtn.addEventListener("click", searchUsingFetchPromises);
const keyword = document.getElementById("keyword");

const API_URL = "https://api.unsplash.com/search/photos";

function searchUsingXHR() {
    let word = keyword.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL + "?query=" + word)
    xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY)
    xhr.onreadystatechange = () => {
        console.log("Request created");
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            let responseText = xhr.responseText;
            let responseObj = JSON.parse(responseText);
            createImages(responseObj);

        }
    }
    console.log("Request sent");
    xhr.send();
    console.log("Request sent");
}

function createImages(data) {
    const results = document.getElementById("results");
    for (let item of data.results) {
        let imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.alt_description;
        results.appendChild(imgElement);

    }
}

async function searchUsingFetchAwait() {
    let word = keyword.value.trim();
    let response = await fetch(API_URL + "?query=" + word, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }
    });
    if (response.ok) {
        let data = await response.json();
        createImages(data);
    }
}

function searchUsingFetchPromises() {
    let word = keyword.value.trim();
    fetch(API_URL + "?query=" + word, {
        method: "GET",
        headers: {
            "authorization": "Client-ID " + ACCESS_KEY
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        createImages(data);
    })
}
