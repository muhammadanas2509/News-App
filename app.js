const cardDiv = document.getElementById('news-container')
const input = document.getElementById('input')
const loader = document.getElementById('loader')

let search = async () => {
    loader.style.display = "flex"
    cardDiv.innerHTML = ""
    const API_KEY = `https://newsapi.org/v2/everything?q=${input.value || "karachi"}&from=2024-11-08&sortBy=publishedAt&apiKey=e0b3a0bcc6784380acad8903530357f1`
    fetch(API_KEY)
        .then(async (res) => await res.json())
        .then((data) => {
            data.articles.map((e, i) => {
                cardDiv.innerHTML +=
                    `<div class="news-card">
            <img src="${e.urlToImage}" alt="News 1">
            <h3>${e.title}</h3>
            <p>Author :</p>
            <p class="author">${e.author}</p>
            <p class="description">${e.description}</p>
            <p class="publishedAt">${e.publishedAt}</p>
        </div>`
            })
            loader.style.display = "none"
        })
        .catch((err) => {
            loader.style.display = "none"
            console.log(err)
        })
}

window.onload = search()
