function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    let input = document.getElementById("wikiInput").value;
    // remove whitespace from the input
    let termResultat = input.trim();
    // call `fetchResults` and pass it the `termResultat`
    fetchResults(termResultat);
}

function fetchResults(termResultat) {
    let URL = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=URL&utf8=&format=json&origin=*&srlimit=20&srsearch=${termResultat}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            let results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log('An error occurred'));
}

function displayResults(results) {
    // Store a reference to `wikiResultat`
    let searchResults = document.getElementById('wikiResultat');
    // Remove all child elements
    searchResults.innerHTML = '';
    // Loop over results array
    results.forEach(result => {
        let URL = encodeURI(`https://fr.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h4 class="resultItem-title">
          <a href="${URL}" target="_blank" rel="noopener">${result.title}</a>
        </h4>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${URL}" class="resultItem-link" target="_blank" rel="noopener">${URL}</a>
      </div>`
        );
    });
}

let form = document.getElementById('searchForm');
form.addEventListener('submit', handleSubmit);