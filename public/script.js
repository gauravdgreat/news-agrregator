async function fetchNews(query) {
    // If query is not provided, just fetch the default news
    const response = await fetch(`http://localhost:5000/news?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
        alert("Error fetching news. Please try again later.");
        return;
    }
    
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous articles
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchNews(query); // Fetch news based on the query
    } else {
        alert("Please enter a keyword to search.");
    }
});

// Optional: Fetch default news on window load
window.onload = function() {
    fetchNews(""); // You can change this to a default query if needed
};
