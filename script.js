//Get Quotes from API

// initializing ids from html - creating corresponding constants
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; //setting apiQuotes to empty array

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote 
function newQuote() {
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace with "unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    //set Quote, Hide loader
    complete();
    quoteText.textContent = quote.text;
}

// async fubction will run at anytime independently and it won't stop the browser from loading the page
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    // Try-Catch Statement: allow us to attempt a fetch request but if it doesn't work, we can catch the error information and do something with it
    try {
        const response = await fetch(apiUrl); //This constant will not be populated until it has some data fetched from our api
        apiQuotes = await response.json(); //getting json from api as a response and then we're turning response into json opbject and pass that into a global variable called apiQuotes
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

// Tweet Quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); //open twitter in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load - run the function
getQuotes();