const headline = document.getElementById('headline');
const screenWidth = window.innerWidth;
const apiKey = '20c8e132bd86459c8a0abca3428ab282';
const formElement = document.querySelector('form');
const inputElement = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const showMoreButton = document.getElementById('show-more-button');
let inputData = '';
let page = 1;

document.addEventListener('DOMContentLoaded', function () {
    if (formElement) {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            performSearch();
        });
    }
});

async function performSearch() {
    inputData = inputElement.value;
    const url = `https://newsapi.org/v2/everything?q=${inputData}&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const articles = data.articles;
    updateResultCard(articles);
}

function getMoreResults() {
    page++;
    performSearch();
}

function updateResultCard(articles) {
    if (resultsContainer) {
        if (page === 1) {
            resultsContainer.innerHTML = '';
        }

        if (articles.length === 0) {
            showResultModal();
        } else {
            articles.forEach(article => {
                const card = createResult(article);
                resultsContainer.appendChild(card);
            });

            page++;
            showSeeMoreButton();
        }
    }
}

function createResult(article) {
    const card = document.createElement('div');
    card.className = 'col-sm g-5';
    card.innerHTML = `
        <div class="card mx-auto shadow" style="width: 18rem;">
            <div class="card-header text-center text-dark fw-bold">${article.title}</div>
            <div class="card-body">
                <p class="card-text">${article.description || 'No description available'}</p>
            </div>
            <img class="card-img-top img-fluid" src="${article.urlToImage || 'https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=6&m=1128826884&s=170667a&w=0&h=F6kUwTcsLXUojmGFxN2wApEKgjx63zcIshCSOmnfEFs='}" alt="${article.title}">
            <button class="btn btn-primary mt-2" onclick="readArticle('${article.url}')">Read Article</button>
        </div>
    `;
    return card;
}

function readArticle(articleUrl) {
    // Open the article page in a new tab/window
    window.open(articleUrl, '_blank');
}

function showSeeMoreButton() {
    if (showMoreButton) {
        showMoreButton.style.display = 'block';
    }
}

function showResultModal() {
    // Your modal code here
    // You can customize this function based on your requirements
}

 

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.style.display = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? 'block' : 'none';
};

// Additional code for modal event listeners and other functionalities
