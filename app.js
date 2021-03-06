const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loader = document.getElementById('loader')

// show Loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}



let apiQuotes = [];

// show New Quote
function newQuote(){
    loading();

    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)]
    authorText.textContent = quote.author;
    // check quotelenght to determine styling
    if(quote.text.length> 50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // set Quote, Hide Loader

    quoteText.textContent = quote.text;
    complete();

}

// Get Quotes from API
async function getQuotes(){
    loading()
    const apiURL = "https://type.fit/api/quotes";
    try {

        const response = await fetch(apiURL)
        apiQuotes = await response.json();

        newQuote()
        
    } catch (error) {
        
        // catch error
        
    }

}

// tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load

getQuotes( );

