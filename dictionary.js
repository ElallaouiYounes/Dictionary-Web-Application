const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");
const btn = document.querySelector('.search-btn');
const firstLine = document.querySelector('.search-word');
const secondLine = document.querySelector('.word-2');
const thirdLine = document.querySelector('.word-3');
const fourthLine = document.querySelector('.word-4');
const card = document.querySelector('.card');
const err = document.getElementById('err');
const details = document.querySelector('.details');

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        btn.click();
    }
});

btn.addEventListener("click", () => {
    let searchWord = document.querySelector('.search').value.trim();
    
    err.style.display = "none";
    details.style.display = "none";
    firstLine.innerHTML = "";
    secondLine.innerHTML = "";
    thirdLine.innerHTML = "";
    fourthLine.innerHTML = "";

    fetch(`${url}${searchWord}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (!data || data.length === 0 || !data[0].meanings || !data[0].meanings[0].definitions) {
                throw new Error("Word not found");
            }

            card.style.height = "500px";
            details.style.display = "block";
            firstLine.innerHTML = searchWord;
            secondLine.innerHTML = data[0].meanings[0].partOfSpeech + " " + data[0].phonetic;
            thirdLine.innerHTML = data[0].meanings[0].definitions[0].definition;
            fourthLine.innerHTML = data[0].meanings[0].definitions[0].example || "";

            if (fourthLine.innerHTML.length >= 90) {
                card.style.height = "600px";
            }
        })
        .catch((error) => {
            console.error(error);
            card.style.height = "140px";
            err.style.display = "block";
        });
});
