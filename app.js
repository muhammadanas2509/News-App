const cards = document.getElementById('cards');
const input = document.getElementById('search');
const loader = document.getElementById('loader');
const hed = document.getElementById('hed');

let search = async () => {
    loader.style.display = "block"; // Show loader
    cards.innerHTML = ""; // Clear previous results
    const API_KEY = `https://newsapi.org/v2/everything?q=${input.value || "karachi"}&from=2024-11-09&sortBy=publishedAt&apiKey=e0b3a0bcc6784380acad8903530357f1`;

    try {
        const response = await fetch(API_KEY);
        const data = await response.json();

        // Check if articles exist and are non-empty
        if (data.articles && data.articles.length > 0) {
            if (input.value.trim()) {
                hed.innerHTML = `<h2>Did You Search for "${input.value}"</h2>`;
            } else {
                hed.innerHTML = "";
            }

            // Populate cards with news articles
            data.articles.forEach((e) => {
                cards.innerHTML += `
                    <div class="card">
                        <img src="${e.urlToImage || 'placeholder.jpg'}" alt="Card Image" class="card-img">
                        <h3>${e.title || 'No title available.'}</h3>
                        <p class="card-desc">${e.description || 'No description available.'}</p>
                        <div class="card-footer">
                            <p><strong>Author: </strong>${e.author || 'Unknown'}</p>
                            <p><strong>Publish At: </strong>${new Date(e.publishedAt).toLocaleString()}</p>
                        </div>
                    </div>`;
            });
        } else {
            // Show message if no articles found
            cards.innerHTML = `<h2 class="err" >${`"${input.value}"`} News not found.</h2>`;
            hed.innerHTML = ""; 
        }
    } catch (err) {
        console.error("Error fetching data:", err);
        cards.innerHTML = `<p style="text-align: center; font-size: 1.2em; color: red;">Error fetching news. Please try again later.</p>`;
    } finally {
        loader.style.display = "none"; // Hide loader
    }
};

const clearInput = () => {
    input.value = ''; // Clear the input
    input.focus();
    cards.innerHTML = ''; // Optionally, clear the news cards
};

search();
